import PredCareInvoicesPage from '@/components/Modules/InvoicesModule/PredCareInvoices/PredCareInvoicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PRED Care Invoices | PredCare Doctor Portal',
};

export default function PredCareInvoicesRoute() {
  return <PredCareInvoicesPage />;
}
