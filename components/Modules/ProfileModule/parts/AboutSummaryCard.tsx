'use client';

import { formatDate, formatSpecialization } from '@/lib/commons/common.utils';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CheckIcon from '@mui/icons-material/Check';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
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

const displayValue = (value: unknown) => {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object' && 'name' in item) {
          return String(item.name || '').trim();
        }
        return '';
      })
      .filter(Boolean);

    return items.length ? items.join(', ') : 'N/A';
  }

  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number') return String(value);
  return 'N/A';
};

export default function AboutSummaryCard() {
  const { userData } = useAuthStore((state) => state);
  const dateOfBirth = formatDate(userData?.date_of_birth) || 'N/A';

  return (
    <Box className="summary-card">
      <Typography component="h2" className="card-title">
        Contact & credentials
      </Typography>
      <Box className="summary-list">
        <SummaryRow
          icon={<CakeOutlinedIcon />}
          label="Date of Birth"
          value={dateOfBirth}
        />
        <SummaryRow
          icon={<SchoolOutlinedIcon />}
          label="Qualifications"
          value={displayValue(userData?.qualifications)}
        />
        <SummaryRow
          icon={<LocalHospitalOutlinedIcon />}
          label="Sub Specialization"
          value={formatSpecialization({ specialization: userData?.specialization, sub_specializations: userData?.sub_specializations || {} })}
          wide
        />
        <SummaryRow
          icon={<TranslateOutlinedIcon />}
          label="Languages Spoken"
          value={displayValue(userData?.languages_spoken)}
          wide
        />
        <SummaryRow
          icon={<NotesOutlinedIcon />}
          label="Bio"
          value={displayValue(userData?.bio)}
          wide
        />
        <SummaryRow
          icon={<BadgeOutlinedIcon />}
          label="Medical License Number"
          value={userData?.license_number || 'N/A'}
        />
        <SummaryRow
          icon={<PhoneOutlinedIcon />}
          label="Phone Number"
          value={userData?.phone_number || 'N/A'}
        />
        <SummaryRow
          icon={<PhoneAndroidOutlinedIcon />}
          label="Alternate Number"
          value={userData?.alternate_number || 'N/A'}
        />
        <SummaryRow
          icon={<ChatOutlinedIcon />}
          label="WhatsApp Number"
          value={userData?.whatsapp_number || 'N/A'}
        />
        <SummaryRow
          icon={<EmailOutlinedIcon />}
          label="Email Address"
          value={userData?.email || 'N/A'}
          verified={
            userData?.email_verified_at
              ? formatDate(userData?.email_verified_at)
              : undefined
          }
        />
        <SummaryRow
          icon={<WorkOutlineOutlinedIcon />}
          label="Years of Experience"
          value={`${userData?.experience_years || 0} Years`}
        />
        <SummaryRow
          icon={<LocationOnOutlinedIcon />}
          label="Address"
          value={userData?.full_address || 'N/A'}
        />
        <SummaryRow
          icon={<FingerprintOutlinedIcon />}
          label="Doctor ID"
          value={String(userData?.doctor_id || 'N/A')}
        />
      </Box>
    </Box>
  );
}
