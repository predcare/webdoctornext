'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useGetInvoicesByPatientId } from '@/hooks/react-query/invoices/invoices.hooks';
import {
  _formatShortNum,
  _toTitleCase,
  formatDate,
  openInNewTab,
} from '@/lib/commons/common.utils';
import { showErrorToast } from '@/lib/commons/toast';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';

const headList = [
  'Invoice No.',
  'Type',
  'Date',
  'Payment Mode',
  'Amount',
  'Actions',
];

interface IBillingProps {
  patientId: string;
}

function BillingTab({ patientId }: IBillingProps) {
  const [filterStates, setFilterStates] = useState({
    page: 1,
    limit: 5,
  });
  const { data: invoiceList, isPending: invoiceListLoading } =
    useGetInvoicesByPatientId({
      patient_id: patientId,
      limit: filterStates.limit,
      page: filterStates.page,
    });

  const handleViewInvoice = (url: string) => {
    if (!url?.trim()) return showErrorToast("Invoice PDF is not available.")
    openInNewTab(url)
  }
  return (
    <PatientTabContentWrapper>
      <TabSectionCard
        title="Billing"
        icon={<ReceiptLongOutlinedIcon />}
        actionLabel="New Invoice"
      >
        <CustomTable
          className="tab-table"
          headList={headList}
          page={filterStates.page}
          totalPages={invoiceList?.meta?.totalPages || 1}
          zebraStriping={false}
          isLoading={invoiceListLoading}
          isEmpty={invoiceList?.meta?.total === 0}
          emptyText="No Invoices Found"
          emptyDescription="Generate invoices for services provided to patients."
          onPageChange={(page) =>
            setFilterStates((prev) => ({ ...prev, page }))
          }
        >
          {invoiceList?.data?.map((invoiceItem) => {
            return (
              <TableRow key={invoiceItem?.invoice_number}>
                <TableCell>
                  <Typography component="a" href="#" className="cell-link">
                    {invoiceItem?.invoice_number}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box component="span" className="tag info">
                    {invoiceItem?.category === 'auto_appointment'
                      ? 'Automatic'
                      : 'Manual'}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography component="p" className="cell-note">
                    {formatDate(invoiceItem?.created_at)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    className={`tag ${['cash'].includes((invoiceItem?.payment_mode || '').toLowerCase().trim())
                      ? 'success'
                      : ['card', 'pos', 'credit_card', 'debit_card'].includes(
                        (invoiceItem?.payment_mode || '').toLowerCase().trim(),
                      )
                        ? 'warning'
                        : ['razorpay', 'online', 'upi', 'netbanking'].includes(
                          (invoiceItem?.payment_mode || '').toLowerCase().trim(),
                        )
                          ? 'teal'
                          : 'neutral'
                      }`}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      textTransform: 'capitalize',
                      letterSpacing: '0.2px',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: 'currentColor',
                        opacity: 0.85,
                      }}
                    />
                    {_toTitleCase(invoiceItem?.payment_mode || 'N/A')}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography component="p" className="amount-cell">
                    ₹{_formatShortNum(invoiceItem?.grand_total)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box className="row-icons">
                    <IconButton
                      className="icon-action"
                      aria-label="View invoice"
                      type='button'
                      onClick={() => handleViewInvoice(invoiceItem.pdf_url || "")}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton
                      className="icon-action"
                      aria-label="Download invoice"
                      type='button'
                      onClick={() => handleViewInvoice(invoiceItem.pdf_url || "")}
                    >
                      <FileDownloadOutlinedIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </CustomTable>
      </TabSectionCard>
    </PatientTabContentWrapper>
  );
}

export default memo(BillingTab);
