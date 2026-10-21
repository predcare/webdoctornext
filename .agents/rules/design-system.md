# PredCare Doctor Portal — Design System Rules

These guidelines MUST be followed whenever implementing screens, components, or UI in this codebase.

This is a Next.js 16 App Router web app (React 19, TypeScript, MUI v9). It is not a React Native app. Do not introduce `SafeAreaWrapper`, `ScrollView`, `react-native-svg`, or mobile-only layout primitives.

---

## 1. Screen Layout Rules

Dashboard routes already sit inside the authenticated shell in `app/(dashboard)/layout.tsx`: `AuthGate`, permanent sidebar, mobile drawer, and `DashboardHeader`. Feature screens render inside `.dashboard-content`. Do not rebuild the sidebar, header, or auth gate on a page.

**Route files stay thin.** `app/**/page.tsx` exports metadata and renders the feature screen. Interactive UI lives in `components/Modules/<Feature>Module/`.

```tsx
import PatientListPage from '@/components/Modules/PatientsModule/PatientListPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Patients | PredCare',
};

export default function PatientsPage() {
  return (
    <Suspense fallback={null}>
      <PatientListPage />
    </Suspense>
  );
}
```

**Feature screen shape:**

- Start with `PageBreadcrumb` from `components/commons/PageBreadcrumb/PageBreadcrumb`.
- Wrap the page in a feature styled component from `styles/CustomStyled/<Feature>Wrapper.tsx`.
- Navigate with `projectRoutes` from `routes/index.ts`. Never hardcode portal paths in components.
- Breadcrumb items are `{ label, href? }`. The current page has a label and no `href`.

```tsx
'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import { projectRoutes } from '@/routes';
import { PatientListWrapper } from '@/styles/CustomStyled/PatientListWrapper';

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Patients List' },
];

export default function PatientListPage() {
  return (
    <PatientListWrapper>
      <PageBreadcrumb items={breadcrumbItems} />
      {/* page content */}
    </PatientListWrapper>
  );
}
```

**Which shell to use:**

| Area | Route group | Shell | Screen owner |
| --- | --- | --- | --- |
| Doctor portal | `app/(dashboard)/` | Sidebar + header + `AuthGate` | `components/Modules/*Module` |
| Login / register | `app/(auth)/` | `app/(auth)/layout.tsx` | `components/Modules/AuthModule` |
| Public CMS | `app/(cms)/` | `layouts/Wrapper` | `components/Modules/CmsModule` |

**Loading, empty, and error states** belong on the feature screen:

- Tables use `CustomTable` `isLoading`, `isEmpty`, `emptyText`, and `emptyDescription`.
- Standalone empty or error panels use `components/commons/EmptyState`.
- Full-screen blocking work uses the existing global backdrop (`useLoadingStore` / `GlobalBackdropLoader`). Do not add a second loader system.

---

## 2. Shared Component Locations

Place reusable UI in the folder that already owns that kind of component. Import the component file directly. This project does not use a barrel `index.ts` for `commons` or `ui` controls.

**`components/ui/` — design-system controls.** Reuse these before building a new input, table, modal, or tab:

- `CustomInput` — text, password, and validated fields
- `CustomSelect`, `CustomAutocomplete`, `CustomRadio`, `CustomCheckbox`, `CustomSwitch`
- `CustomTable` — search header, sort, pagination, loading, empty
- `CustomModal`, `CustomCalendarModal`, `CustomActionMenu`
- `CustomTabsGroup`, `StatCard`, `InfoTooltip`
- `Icons/` — product SVG icons

**`components/commons/` — app-level pieces used across modules:**

- `PageBreadcrumb`, `EmptyState`, `CommonErrorText`, `CommonOtpInput`
- `StatusChip`, `AppointmentStatusBadge`, `DetailField`
- `PopupAlert`, `BackdropLoader`, `PredDatePickerModal`

**`components/Modules/<Feature>Module/` — screen-specific UI only.** A patient row stays in `PatientsModule`. A control needed by two features moves to `components/ui/` or `components/commons/`.

Module-local pieces (sections, skeletons, constants) stay inside that module folder. Do not add an `index.ts` barrel inside a module.

One-off action icons may use `@mui/icons-material`. New product icons that appear in the sidebar, stats, or status filters go in `components/ui/Icons/`.

---

## 3. SVG Icons

- **Location:** `components/ui/Icons/`, grouped by domain (`dashboard/`, `appointments/`) or at the Icons root for shared glyphs.
- **Implementation:** inline `<svg>`. Use `currentColor` for stroke or fill so the parent sets the color. Do not use `react-native-svg`.
- **Sizing:** accept `size?: number` (default `20`) and set both `width` and `height` from it. Decorative icons set `aria-hidden="true"`.
- **Export:** add every icon to the `index.ts` of its folder and import from that barrel (`@/components/ui/Icons/dashboard`, `@/components/ui/Icons/appointments`).

```tsx
type IconProps = {
  size?: number;
};

const PatientsIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
};

export default PatientsIcon;
```

---

## 4. Theme and Design Tokens

Colors, type, and shape come from the MUI theme. Read them with `useTheme()` or the `theme` argument inside `styled()`. Do not hardcode a hex that already exists on `theme.palette.customColors`.

**Source files:**

- `themes/_colorPalette.ts` — light and dark token values
- `themes/_themeTypes.ts` — `customColors` and custom typography variants
- `themes/_projectTheme.ts` — palette, typography, component overrides
- `themes/ProjectThemeProvider.tsx` — applies `useThemeStore` mode
- `themes/themeConstant.ts` — `SidebarWidth` (276), `SidebarWidthSm` (70), `TopbarHeight` (64), `borderRadius` (8)

**Brand and surfaces** (light values; dark mode overrides the same keys):

| Token | Light value | Use |
| --- | --- | --- |
| `brandTeal` | `#0F7C73` | Primary actions, active nav, focus |
| `brandTealDark` | `#0B645D` | Pressed / dark teal |
| `brandTealLight` | `rgba(15, 124, 115, 0.1)` | Teal tint, focus ring |
| `pageBg` | `#F5F6F8` | App canvas |
| `cardBg` | `#FFFFFF` | Cards, inputs, header |
| `sidebarBg` | `#FFFFFF` | Sidebar |
| `sidebarActiveBg` | `rgba(15, 124, 115, 0.08)` | Active nav item |
| `heading` | `#0A1B39` | Headings and field labels |
| `textPrimary` | `#0F172A` | Body text |
| `textSecondary` | `#6c81a1` | Supporting text |
| `textMuted` | `#858D9C` | Captions, disabled |
| `border` / `cardBorder` | `#E7E8EB` / `#E2E8F0` | Dividers and card edges |
| `inputBg` / `inputBorder` / `inputFocusBorder` | white / `#E2E8F0` / teal | Fields |
| `success` / `warning` / `error` / `info` | plus matching `*Bg` | Status chips and alerts |

`palette.primary.main` is `brandTeal`. `background.default` is `pageBg`. `background.paper` is `cardBg`.

**Typography** uses Inter (`var(--font-inter)`). Prefer theme variants (`h1`–`h4`, `body1`, `body2`, `caption`, `button`) and the custom variants `topbarGreeting`, `metricValue`, and `metricLabel`. Buttons stay `textTransform: 'none'`.

**Spacing:** theme spacing is 8. Page stacks use a `24px` column gap. Cards use `16px` radius and `24px` padding. Inputs use `10px` radius and `44px` min height.

When a new color is required in both themes, add the key to `ICustomColors`, then set light and dark values in `defaultPalette`. Do not add a one-off hex in a feature wrapper.

---

## 5. Surfaces, Cards, and Controls

Style feature layout in `styles/CustomStyled/<Feature>Wrapper.tsx` with MUI `styled`. The file starts with `'use client'`. Reach tokens through `theme.palette.customColors`.

**Cards** use a single surface, not a stacked 3D bevel:

- `background: theme.palette.customColors.cardBg`
- `border: 1px solid theme.palette.customColors.border`
- `borderRadius: 16px`
- `boxShadow: 0 1px 2px rgba(15, 23, 42, 0.04)`
- `minWidth: 0` on grid children so content can shrink

**Inputs** go through `CustomInput`, `CustomSelect`, `CustomAutocomplete`, `CustomRadio`, `CustomCheckbox`, or `CustomSwitch`. Do not restyle a raw MUI `TextField` for a standard form field. Field errors render with `CommonErrorText`.

**Focus:** teal border plus a `3px` ring of `brandTealLight`, matching `CustomInput`. Error focus uses `error` and `errorBg`.

**Hover on page actions:** border and text shift to `brandTeal`, background to `hoverBg`.

**Tables** use `CustomTable`. Row components stay in the feature module and receive data as props.

**Modals** use `CustomModal`. Destructive or logout choices use the existing alert and modal patterns (`PopupAlert`, `LogoutOptionsModal`), not `window.confirm`.

**Responsive shell:** sidebar is permanent from the `lg` breakpoint up and a `Drawer` below it. Do not add a second navigation drawer inside a feature page.

---

## 6. Project Directory Structure

```
app/
├── layout.tsx                         # Root providers: theme, React Query, toasts
├── (auth)/                            # Login, register, policy acceptance
├── (cms)/                             # Public pages inside layouts/Wrapper
└── (dashboard)/dashboard/             # Authenticated portal routes
    └── <feature>/page.tsx             # Metadata + Suspense + module screen
components/
├── Modules/<Feature>Module/           # Screen orchestrators and feature-only UI
├── commons/                           # Breadcrumb, empty state, errors, badges
├── ui/                                # CustomInput, CustomTable, CustomModal, …
│   └── Icons/                         # SVG icons + domain barrels
├── Providers/
layouts/                               # Header, Footer, Wrapper, Dashboard shell
styles/CustomStyled/<Feature>Wrapper.tsx
themes/                                # Palette, theme, provider, layout constants
routes/index.ts                        # projectRoutes
hooks/
├── commons/                           # useDebounce, useActionMenu, …
└── react-query/<domain>/              # *.hooks.ts, *.funcs.ts, payload interfaces
services/api/                          # axios client + endpoints.ts
lib/schemas/                           # Yup schemas and InferType exports
typescripts/                           # interfaces, enums, types
zustand/stores/                        # auth, theme, clinic, loading, alert
configs/                               # constants, storage keys, nav items
```

Preserve existing folder spellings (`DahsboardModule`, `AppointmentsModule/contants`, `availablity.*`). Do not rename them as part of a feature change.
