'use client';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function PredCareInvoicesStats() {
  return (
    <Box className="invoices-stats-grid">
      <Box className="stat-card-box">
        <Box className="stat-icon-wrapper info">
          <DescriptionOutlinedIcon fontSize="small" />
        </Box>
        <Box className="stat-content">
          <Typography component="span" className="stat-label">
            TOTAL INVOICES
          </Typography>
          <Typography component="span" className="stat-value">
            21
          </Typography>
          <Typography component="span" className="stat-subtext">
            PRED Care Invoices
          </Typography>
        </Box>
      </Box>

      <Box className="stat-card-box">
        <Box className="stat-icon-wrapper teal">
          <CurrencyRupeeIcon fontSize="small" />
        </Box>
        <Box className="stat-content">
          <Typography component="span" className="stat-label">
            TOTAL BILLED
          </Typography>
          <Typography component="span" className="stat-value">
            ₹23,100.00
          </Typography>
        </Box>
      </Box>

      <Box className="stat-card-box">
        <Box className="stat-icon-wrapper success">
          <CheckCircleOutlineOutlinedIcon fontSize="small" />
        </Box>
        <Box className="stat-content">
          <Typography component="span" className="stat-label">
            AMOUNT RECEIVED
          </Typography>
          <Typography component="span" className="stat-value">
            ₹21,000.00
          </Typography>
        </Box>
      </Box>

      <Box className="stat-card-box">
        <Box className="stat-icon-wrapper warning">
          <AccessTimeOutlinedIcon fontSize="small" />
        </Box>
        <Box className="stat-content">
          <Typography component="span" className="stat-label">
            PRED CARE FEE
          </Typography>
          <Typography component="span" className="stat-value">
            ₹2,100.00
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PredCareInvoicesStats);
