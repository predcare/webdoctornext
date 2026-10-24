'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { projectRoutes } from '@/routes';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

const headList = [
  'INVOICE #',
  'PATIENT',
  'DATE',
  'CONSULTING FEE',
  'PLATFORM FEE',
  'DISCOUNT',
  'GRAND TOTAL',
  'RECEIVED AMOUNT',
  'PRED CARE FEE',
  'ACTIONS',
];

const staticPredCareRows = [
  {
    invoiceNumber: 'PSCR2627-000032',
    avatar: 'S',
    patientName: 'Sahil Mallick',
    phone: '8918030206',
    date: '23 Oct 2026',
    consultingFee: '₹1,100.00',
    platformFee: '₹0.00',
    discount: '—',
    grandTotal: '₹1,100.00',
    receivedAmount: '₹1,000.00',
    predCareFee: '₹100.00',
  },
  {
    invoiceNumber: 'PSCR2627-000031',
    avatar: 'P',
    patientName: 'Pred Patient',
    phone: '9880200001',
    date: '22 Oct 2026',
    consultingFee: '₹1,100.00',
    platformFee: '₹0.00',
    discount: '—',
    grandTotal: '₹1,100.00',
    receivedAmount: '₹1,000.00',
    predCareFee: '₹100.00',
  },
];

function PredCareInvoicesTable() {
  const router = useRouter();

  const handleView = (invoiceNumber: string) => {
    router.push(projectRoutes.invoiceDetails(invoiceNumber));
  };

  return (
    <Box className="table-card">
      <CustomTable
        headList={headList}
        page={1}
        totalPages={1}
        zebraStriping={false}
      >
        {staticPredCareRows.map((row) => (
          <TableRow key={row.invoiceNumber}>
            <TableCell>
              <Typography
                component="span"
                sx={{ fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                onClick={() => handleView(row.invoiceNumber)}
              >
                {row.invoiceNumber}
              </Typography>
            </TableCell>
            <TableCell>
              <Box className="patient-cell">
                <Box className="patient-avatar">{row.avatar}</Box>
                <Box className="patient-info">
                  <Typography component="span" className="patient-name">
                    {row.patientName}
                  </Typography>
                  <Typography component="span" className="patient-phone">
                    {row.phone}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.consultingFee}</TableCell>
            <TableCell>{row.platformFee}</TableCell>
            <TableCell>{row.discount}</TableCell>
            <TableCell>
              <Typography component="span" className="grand-total-text">
                {row.grandTotal}
              </Typography>
            </TableCell>
            <TableCell>{row.receivedAmount}</TableCell>
            <TableCell>{row.predCareFee}</TableCell>
            <TableCell>
              <Box className="table-actions">
                <Tooltip title="View Invoice">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => handleView(row.invoiceNumber)}
                  >
                    <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                  </button>
                </Tooltip>
                <Tooltip title="Download PDF">
                  <button type="button" className="action-btn">
                    <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
                  </button>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </Box>
  );
}

export default memo(PredCareInvoicesTable);
