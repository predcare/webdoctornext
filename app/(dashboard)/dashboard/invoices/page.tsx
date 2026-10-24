import ClinicInvoicesPage from '@/components/Modules/InvoicesModule/ClinicInvoices/ClinicInvoicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinic Invoices | PredCare Doctor Portal',
};

export default function ClinicInvoicesRoute() {
  return <ClinicInvoicesPage />;
}
