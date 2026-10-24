'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { Box, TableCell, TableRow } from '@mui/material';
import { memo } from 'react';

const headList = [
  '#',
  'Item & HSN/SAC',
  'Qty',
  'Price',
  'Discount',
  'Disc. Amt',
  'Tax %',
  'Tax Amt',
  'Total',
];

function InvoiceItemsViewTable() {
  return (
    <Box className="table-card">
      <CustomTable headList={headList} zebraStriping={false}>
        <TableRow>
          <TableCell sx={{ width: 48, fontWeight: 500 }}>1</TableCell>
          <TableCell>—</TableCell>
          <TableCell>1</TableCell>
          <TableCell>₹0.00</TableCell>
          <TableCell sx={{ color: 'error.main' }}>—</TableCell>
          <TableCell>—</TableCell>
          <TableCell>—</TableCell>
          <TableCell>—</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>₹0.00</TableCell>
        </TableRow>
      </CustomTable>
    </Box>
  );
}

export default memo(InvoiceItemsViewTable);
