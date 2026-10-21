import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import { projectRoutes } from '@/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meeting | PredCare',
};

export default function MeetingRoute() {
  return (
    <DashboardInvalidParamView
      title="Invalid Meeting Link"
      message="Please open this consultation from the appointments list."
      seconds={5}
      fallbackHref={projectRoutes.appointments}
    />
  );
}
