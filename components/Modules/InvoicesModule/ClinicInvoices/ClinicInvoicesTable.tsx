'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { projectRoutes } from '@/routes';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

const headList = [
  'INVOICE #',
  'PATIENT',
  'DATE',
  'SUBTOTAL',
  'DISCOUNT',
  'GRAND TOTAL',
  'RECEIVED AMOUNT',
  'METHOD',
  'STATUS',
  'ACTIONS',
];

function ClinicInvoicesTable() {
  const router = useRouter();

  const handleView = (invoiceId: string) => {
    router.push(projectRoutes.invoiceDetails(invoiceId));
  };

  const handleEdit = (invoiceId: string) => {
    router.push(projectRoutes.editInvoice(invoiceId));
  };

  return (
    <Box className="table-card">
      <CustomTable
        headList={headList}
        page={1}
        totalPages={3}
        zebraStriping={false}
        onPageChange={() => { }}
      >
        <TableRow>
          <TableCell>
            <Typography
              component="span"
              sx={{ fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              onClick={() => handleView('INV-2627-02')}
            >
              INV-2627-02
            </Typography>
          </TableCell>
          <TableCell>
            <Box className="patient-cell">
              <Box className="patient-avatar">T</Box>
              <Box className="patient-info">
                <Typography component="span" className="patient-name">
                  Test Patient
                </Typography>
                <Typography component="span" className="patient-phone">
                  9999999999
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>24 Oct 2026</TableCell>
          <TableCell>₹100.00</TableCell>
          <TableCell>
            <Typography component="span" className="discount-text">
              -₹5.00
            </Typography>
          </TableCell>
          <TableCell>
            <Typography component="span" className="grand-total-text">
              ₹95.00
            </Typography>
          </TableCell>
          <TableCell>₹0.00</TableCell>
          <TableCell>
            <Box component="span" className="tag-cash">
              Cash
            </Box>
          </TableCell>
          <TableCell>
            <Box component="span" className="tag-unpaid">
              Unpaid
            </Box>
          </TableCell>
          <TableCell>
            <Box className="table-actions">
              <Tooltip title="View Invoice">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleView('INV-2627-02')}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Edit Invoice">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleEdit('INV-2627-02')}
                >
                  <EditOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Download PDF">
                <button type="button" className="action-btn">
                  <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Void / Cancel">
                <button type="button" className="action-btn void-btn">
                  <BlockOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <Typography
              component="span"
              sx={{ fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              onClick={() => handleView('INV-2627-01')}
            >
              INV-2627-01
            </Typography>
          </TableCell>
          <TableCell>
            <Box className="patient-cell">
              <Box className="patient-avatar">S</Box>
              <Box className="patient-info">
                <Typography component="span" className="patient-name">
                  Sahil Mallick
                </Typography>
                <Typography component="span" className="patient-phone">
                  8918030206
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>24 Oct 2026</TableCell>
          <TableCell>₹100.00</TableCell>
          <TableCell>—</TableCell>
          <TableCell>
            <Typography component="span" className="grand-total-text">
              ₹100.00
            </Typography>
          </TableCell>
          <TableCell>₹0.00</TableCell>
          <TableCell>
            <Box component="span" className="tag-cash">
              Cash
            </Box>
          </TableCell>
          <TableCell>
            <Box component="span" className="tag-unpaid">
              Unpaid
            </Box>
          </TableCell>
          <TableCell>
            <Box className="table-actions">
              <Tooltip title="View Invoice">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleView('INV-2627-01')}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Edit Invoice">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleEdit('INV-2627-01')}
                >
                  <EditOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Download PDF">
                <button type="button" className="action-btn">
                  <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
              <Tooltip title="Void / Cancel">
                <button type="button" className="action-btn void-btn">
                  <BlockOutlinedIcon sx={{ fontSize: 16 }} />
                </button>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      </CustomTable>
    </Box>
  );
}

export default memo(ClinicInvoicesTable);
