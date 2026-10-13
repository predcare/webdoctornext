export type DashboardStatIcon = 'patients' | 'appointments' | 'consultations' | 'billing';

export type DashboardStatTone = 'info' | 'teal' | 'warning' | 'success';

export type DashboardStat = {
  id: string;
  title: string;
  value: string;
  period?: string;
  icon: DashboardStatIcon;
  tone: DashboardStatTone;
};

export const dashboardStats: DashboardStat[] = [
  {
    id: 'patients',
    title: 'Total Patients',
    value: '3',
    icon: 'patients',
    tone: 'info',
  },
  {
    id: 'appointments',
    title: 'Total Appointments',
    value: '2',
    period: 'Today',
    icon: 'appointments',
    tone: 'teal',
  },
  {
    id: 'consultations',
    title: 'Total Consultations',
    value: '3',
    period: 'This month',
    icon: 'consultations',
    tone: 'warning',
  },
  {
    id: 'billed',
    title: 'Billed Amount',
    value: '₹0',
    period: 'Monthly',
    icon: 'billing',
    tone: 'success',
  },
];
