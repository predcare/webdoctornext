'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

const headList = ['#', 'Item', 'Qty', 'Price', 'Total'];

function EditInvoiceItemsTable() {
  return (
    <Box className="form-section-card">
      <Typography component="h2" className="section-title">
        Items
      </Typography>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '10px', overflow: 'hidden' }}>
        <CustomTable headList={headList}>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>—</TableCell>
            <TableCell>1</TableCell>
            <TableCell>₹0.00</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>₹0.00</TableCell>
          </TableRow>
        </CustomTable>
      </Box>

      <Typography component="p" className="locked-note">
        <InfoOutlinedIcon sx={{ fontSize: 15 }} />
        Line items and amounts cannot be changed on this page
      </Typography>
    </Box>
  );
}

export default memo(EditInvoiceItemsTable);
