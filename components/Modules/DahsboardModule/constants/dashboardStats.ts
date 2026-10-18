export type DashboardStatIcon =
  'patients' | 'appointments' | 'consultations' | 'billing';

export type DashboardStatTone = 'info' | 'teal' | 'warning' | 'success';

export type DashboardStat = {
  id: string;
  title: string;
  value: string;
  period?: string;
  icon: DashboardStatIcon;
  tone: DashboardStatTone;
};
