import { NextRequest, NextResponse } from 'next/server';
import {
  _isPolicyAccepted,
  _isUserRole,
  _projectToken,
} from './configs/keys.constants';
import { projectRoutes } from './routes';
import { AllProjectRoles, UserRoles } from './typescripts/enums';

const cookiesToDelete = [_projectToken, _isPolicyAccepted, _isUserRole];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(_projectToken)?.value;
  const role = request.cookies.get(_isUserRole)?.value;
  const policy = request.cookies.get(_isPolicyAccepted)?.value;
  const { pathname, search } = request.nextUrl;

  const hasToken = Boolean(token);
  const hasValidRole =
    Boolean(role) &&
    AllProjectRoles.includes(role as (typeof AllProjectRoles)[number]);
  const policyAccepted = policy === 'true';

  const isDoctorLogin = pathname === `${projectRoutes.doctorLogin}/`;
  const isDoctorRegister = pathname === `${projectRoutes.doctorRegister}/`;
  const isPatientLogin = pathname === `${projectRoutes.patientLogin}/`;
  const isAuthEntry = isDoctorLogin || isDoctorRegister || isPatientLogin;

  const isDoctorPolicy = pathname === `${projectRoutes.policyAcceptance}/`;
  const isPatientPolicy =
    pathname === `${projectRoutes.patientPolicyAcceptance}/`;
  const isPolicyPage = isDoctorPolicy || isPatientPolicy;
  const isDashboard = pathname.startsWith(projectRoutes.dashboard);
  const isProtected = isDashboard || isPolicyPage;

  const clearCookiesAndRedirectToLanding = (redirectPath: string) => {
    const url = new URL(projectRoutes.home, request.url);
    url.searchParams.set('redirect', redirectPath);
    const response = NextResponse.redirect(url);
    cookiesToDelete.forEach((cookieName) => {
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
      });
    });
    return response;
  };

  // No token → protected routes go to landing; auth entry stays open
  if (!hasToken) {
    if (isProtected) {
      return clearCookiesAndRedirectToLanding(pathname + search);
    }
    return NextResponse.next();
  }

  // Token but bad/missing role → landing
  if (!hasValidRole) {
    if (isProtected || isAuthEntry) {
      return clearCookiesAndRedirectToLanding(pathname + search);
    }
    return NextResponse.next();
  }

  const rolePolicyPath =
    role === UserRoles.PATIENT
      ? `${projectRoutes.patientPolicyAcceptance}/`
      : `${projectRoutes.policyAcceptance}/`;

  // Token + policy false → force correct role policy page
  if (!policyAccepted) {
    if (pathname !== rolePolicyPath) {
      return NextResponse.redirect(new URL(rolePolicyPath, request.url));
    }
    return NextResponse.next();
  }

  // Token + policy true → dashboard (block auth + policy pages)
  if (isAuthEntry || isPolicyPage) {
    return NextResponse.redirect(new URL(projectRoutes.dashboard, request.url));
  }

  // Token + policy true + dashboard → allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
