'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

const headList = ['Invoice No.', 'Type', 'Date', 'Payment Mode', 'Amount', 'Actions'];

function BillingTab() {
  return (
    <PatientTabContentWrapper>
      <TabSectionCard title="Billing" icon={<ReceiptLongOutlinedIcon />} actionLabel="New Invoice">
        <CustomTable className="tab-table" headList={headList} zebraStriping={false}>
          <TableRow>
            <TableCell>
              <Typography component="a" href="#" className="cell-link">
                PSCR2627-000014
              </Typography>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag info">
                Automatic
              </Box>
            </TableCell>
            <TableCell>
              <Typography component="p" className="cell-note">
                13 Oct 2026
              </Typography>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag neutral">
                Razorpay
              </Box>
            </TableCell>
            <TableCell>
              <Typography component="p" className="amount-cell">
                ₹1,118.00
              </Typography>
            </TableCell>
            <TableCell>
              <Box className="row-icons">
                <IconButton className="icon-action" aria-label="View invoice">
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton className="icon-action" aria-label="Download invoice">
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </CustomTable>
      </TabSectionCard>
    </PatientTabContentWrapper>
  );
}

export default memo(BillingTab);
