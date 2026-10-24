'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, InputAdornment } from '@mui/material';
import { memo } from 'react';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
];

function PredCareInvoicesFilters() {
  return (
    <Box className="invoices-toolbar">
      <Box className="search-input">
        <CustomInput
          placeholder="Invoice #, patient..."
          value=""
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          }
        />
      </Box>

      <Box className="date-field">
        <CustomInput
          placeholder="dd----yyyy"
          value=""
          endAdornment={
            <InputAdornment position="end">
              <CalendarTodayOutlinedIcon
                fontSize="small"
                sx={{ color: 'text.secondary', fontSize: 16 }}
              />
            </InputAdornment>
          }
        />
      </Box>

      <Box className="date-field">
        <CustomInput
          placeholder="dd----yyyy"
          value=""
          endAdornment={
            <InputAdornment position="end">
              <CalendarTodayOutlinedIcon
                fontSize="small"
                sx={{ color: 'text.secondary', fontSize: 16 }}
              />
            </InputAdornment>
          }
        />
      </Box>

      <Box className="select-field">
        <CustomSelect
          options={sortOptions}
          value="newest"
          placeholder="Sort"
        />
      </Box>

      <Button
        variant="outlined"
        className="reset-btn"
        startIcon={<RestartAltOutlinedIcon fontSize="small" />}
      >
        Reset
      </Button>
    </Box>
  );
}

export default memo(PredCareInvoicesFilters);
