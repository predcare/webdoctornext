'use client';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CheckIcon from '@mui/icons-material/Check';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type SummaryRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  verified?: string;
  wide?: boolean;
};

function SummaryRow({
  icon,
  label,
  value,
  verified,
  wide = false,
}: SummaryRowProps) {
  return (
    <Box className={wide ? 'summary-row is-wide' : 'summary-row'}>
      <span className="summary-icon">{icon}</span>
      <Box className="summary-copy">
        <Typography component="p" className="summary-label">
          {label}
        </Typography>
        <Box className="summary-meta">
          <Typography component="p" className="summary-value">
            {value}
          </Typography>
          {verified ? (
            <span className="verified-pill">
              <CheckIcon />
              Verified {verified}
            </span>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default function AboutSummaryCard() {
  return (
    <Box className="summary-card">
      <Typography component="h2" className="card-title">
        Contact & credentials
      </Typography>
      <Box className="summary-list">
        <SummaryRow
          icon={<BadgeOutlinedIcon />}
          label="Medical License Number"
          value="k112"
        />
        <SummaryRow
          icon={<PhoneOutlinedIcon />}
          label="Phone Number"
          value="6283385429"
          verified="Oct 15, 2026"
        />
        <SummaryRow
          icon={<PhoneAndroidOutlinedIcon />}
          label="Alternate Number"
          value="6283385429"
        />
        <SummaryRow
          icon={<ChatOutlinedIcon />}
          label="WhatsApp Number"
          value="6283385429"
        />
        <SummaryRow
          icon={<EmailOutlinedIcon />}
          label="Email Address"
          value="anusri@predsolutions.com"
          verified="Oct 15, 2026"
        />
        <SummaryRow
          icon={<WorkOutlineOutlinedIcon />}
          label="Years of Experience"
          value="0 Years"
        />
        <SummaryRow
          icon={<LocationOnOutlinedIcon />}
          label="Address"
          value="street, Howrah, West Bengal, India, 123456"
          wide
        />
        <SummaryRow
          icon={<FingerprintOutlinedIcon />}
          label="Doctor ID"
          value="DBD6CDB"
        />
      </Box>
    </Box>
  );
}
