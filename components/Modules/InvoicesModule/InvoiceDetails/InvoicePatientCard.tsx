'use client';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function InvoicePatientCard() {
  return (
    <Box className="details-card patient-card">
      <Box>
        <Typography component="p" className="patient-section-label">
          PATIENT
        </Typography>
        <Box className="patient-main-info">
          <Box className="patient-name-row">
            <Typography component="span" className="patient-name">
              Sahil Mallick
            </Typography>
            <Box component="span" className="patient-code-tag">
              PT0002
            </Box>
          </Box>
          <Typography component="p" className="patient-contacts">
            8918030206 | iamsahilmallick@gmail.com
          </Typography>
          <Typography component="p" className="patient-demographics">
            28 yrs | Male
          </Typography>
          <Typography component="p" className="patient-address">
            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
            Street address goes here., Gyalshing, Sikkim
          </Typography>
        </Box>
      </Box>

      <Box className="status-section">
        <Typography component="p" className="patient-section-label">
          PAYMENT STATUS
        </Typography>
        <Box component="span" className="tag-unpaid">
          Unpaid
        </Box>
      </Box>
    </Box>
  );
}

export default memo(InvoicePatientCard);
