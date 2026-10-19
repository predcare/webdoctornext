'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import { _toTitleCase, formatDate, getAge } from '@/lib/commons/common.utils';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import type { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Grid, Typography } from '@mui/material';
import { memo, useMemo, type ReactNode } from 'react';

type ProfileField = {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  full?: boolean;
};

function FieldTiles({ fields }: { fields: ProfileField[] }) {
  return (
    <Grid container spacing={1.5}>
      {fields.map((field) => (
        <Grid key={field.label} size={field.full ? 12 : { xs: 12, sm: 6 }}>
          <Box className="field-tile">
            <Box component="span" className="field-tile-icon">
              {field.icon}
            </Box>
            <Box className="field-tile-copy">
              <Typography component="p" className="field-label">
                {field.label}
              </Typography>
              <Box className="field-value">{field.value}</Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

type ProfileTabProps = {
  patientInfo?: IMyPatientDoc | null;
};

function ProfileTab({ patientInfo }: ProfileTabProps) {
  const formattedDob = useMemo(() => {
    if (!patientInfo?.date_of_birth) return '-';
    return formatDate(patientInfo.date_of_birth);
  }, [patientInfo?.date_of_birth]);

  const ageText = useMemo(() => {
    if (!patientInfo?.date_of_birth) return '';
    return getAge(patientInfo.date_of_birth) || '';
  }, [patientInfo?.date_of_birth]);

  const allergiesList = useMemo(() => {
    if (!patientInfo?.drug_allergies) return [];
    if (Array.isArray(patientInfo.drug_allergies)) {
      return patientInfo.drug_allergies.map(String).filter(Boolean);
    }
    if (typeof patientInfo.drug_allergies === 'string') {
      try {
        const parsed = JSON.parse(patientInfo.drug_allergies);
        if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
      } catch {
        return patientInfo.drug_allergies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [patientInfo.drug_allergies];
    }
    return [];
  }, [patientInfo?.drug_allergies]);

  const personalFields: ProfileField[] = [
    {
      label: 'Full Name',
      value: patientInfo?.name || '-',
      icon: <PersonOutlineOutlinedIcon />,
      full: true,
    },
    {
      label: 'Gender',
      value: _toTitleCase(patientInfo?.gender_display || patientInfo?.gender || '') || '-',
      icon: <WcOutlinedIcon />,
    },
    {
      label: 'Date of Birth',
      icon: <CakeOutlinedIcon />,
      value: (
        <>
          {formattedDob}
          {ageText ? (
            <Box component="span" className="field-hint">
              {ageText}
            </Box>
          ) : null}
        </>
      ),
    },
    {
      label: 'Blood Type',
      icon: <BloodtypeOutlinedIcon />,
      value: patientInfo?.blood_type ? (
        <Box component="span" className="tag danger">
          {patientInfo.blood_type}
        </Box>
      ) : (
        <Box component="span" className="field-empty">
          Not specified
        </Box>
      ),
    },
    {
      label: 'Status',
      value: patientInfo?.status ? (
        <StatusChip status={patientInfo.status} />
      ) : (
        <Box component="span" className="field-empty">
          -
        </Box>
      ),
      icon: <ToggleOnOutlinedIcon />,
    },
    {
      label: 'Patient ID',
      value: patientInfo?.patient_id ? `#${patientInfo.patient_id}` : '-',
      icon: <BadgeOutlinedIcon />,
      full: true,
    },
  ];

  const contactFields: ProfileField[] = [
    {
      label: 'Primary Phone',
      value: patientInfo?.phone_number || (
        <Box component="span" className="field-empty">
          Not added
        </Box>
      ),
      icon: <PhoneOutlinedIcon />,
    },
    {
      label: 'Alternate Number',
      value: patientInfo?.alternate_phone || (
        <Box component="span" className="field-empty">
          Not added
        </Box>
      ),
      icon: <PhoneAndroidOutlinedIcon />,
    },
    {
      label: 'WhatsApp',
      value: patientInfo?.whatsapp_number || (
        <Box component="span" className="field-empty">
          Not added
        </Box>
      ),
      icon: <WhatsAppIcon />,
    },
    {
      label: 'Emergency Contact',
      value: patientInfo?.alternate_phone || patientInfo?.phone_number || (
        <Box component="span" className="field-empty">
          Not added
        </Box>
      ),
      icon: <ContactPhoneOutlinedIcon />,
    },
    {
      label: 'Email',
      value: patientInfo?.email || (
        <Box component="span" className="field-empty">
          Not added
        </Box>
      ),
      icon: <MailOutlinedIcon />,
      full: true,
    },
  ];

  const addressFields: ProfileField[] = [
    {
      label: 'Address',
      value: patientInfo?.address || (
        <Box component="span" className="field-empty">
          Not provided
        </Box>
      ),
      icon: <HomeOutlinedIcon />,
      full: true,
    },
    {
      label: 'City',
      value: patientInfo?.city || '-',
      icon: <LocationCityOutlinedIcon />,
    },
    {
      label: 'State',
      value: patientInfo?.state || '-',
      icon: <MapOutlinedIcon />,
    },
    {
      label: 'Postal Code',
      value: patientInfo?.postal_code || '-',
      icon: <MarkunreadMailboxOutlinedIcon />,
    },
    {
      label: 'Country',
      value: patientInfo?.country || 'India',
      icon: <FlagOutlinedIcon />,
    },
  ];

  const hasVitals = Boolean(
    patientInfo?.blood_pressure ||
    patientInfo?.pulse ||
    patientInfo?.temperature ||
    patientInfo?.spo2 ||
    patientInfo?.weight ||
    patientInfo?.height ||
    patientInfo?.bmi
  );

  return (
    <PatientTabContentWrapper>
      <Grid container spacing={{ xs: 2, md: 2.5 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TabSectionCard
            className="fill"
            title="Personal Information"
            subtitle="Basic identity details"
            icon={<PersonOutlineOutlinedIcon />}
          >
            <FieldTiles fields={personalFields} />
          </TabSectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TabSectionCard
            className="fill"
            title="Contact Information"
            subtitle="How to reach the patient"
            icon={<PhoneOutlinedIcon />}
          >
            <FieldTiles fields={contactFields} />
          </TabSectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TabSectionCard
            className="fill"
            title="Address"
            subtitle="Residential address"
            icon={<LocationOnOutlinedIcon />}
          >
            <FieldTiles fields={addressFields} />
          </TabSectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TabSectionCard
            className="fill"
            title="Medical Information"
            subtitle="Allergies, conditions and history"
            icon={<HealingOutlinedIcon />}
          >
            <Box className="medical-block">
              <Typography component="p" className="field-label">
                Known Allergies
              </Typography>
              <Box className="chip-row">
                {allergiesList.length > 0 ? (
                  allergiesList.map((item) => (
                    <Box key={item} component="span" className="tag danger">
                      {item}
                    </Box>
                  ))
                ) : (
                  <Typography
                    component="span"
                    className="field-hint"
                    sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '13px' }}
                  >
                    No known drug allergies reported
                  </Typography>
                )}
              </Box>
            </Box>

            {hasVitals ? (
              <Box className="medical-block">
                <Typography component="p" className="field-label">
                  Latest Vitals
                </Typography>
                <Box className="chip-row" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {patientInfo?.blood_pressure ? (
                    <Box component="span" className="tag info">
                      BP: {patientInfo.blood_pressure}
                    </Box>
                  ) : null}
                  {patientInfo?.pulse ? (
                    <Box component="span" className="tag info">
                      Pulse: {patientInfo.pulse} bpm
                    </Box>
                  ) : null}
                  {patientInfo?.temperature ? (
                    <Box component="span" className="tag info">
                      Temp: {patientInfo.temperature} °F
                    </Box>
                  ) : null}
                  {patientInfo?.spo2 ? (
                    <Box component="span" className="tag info">
                      SpO2: {patientInfo.spo2}%
                    </Box>
                  ) : null}
                  {patientInfo?.bmi ? (
                    <Box component="span" className="tag warning">
                      BMI: {patientInfo.bmi}
                    </Box>
                  ) : null}
                </Box>
              </Box>
            ) : null}

            <Box className="medical-block">
              <Typography component="p" className="field-label">
                Medical History
              </Typography>
              <Typography component="p" className="history-box">
                {patientInfo?.medical_history ||
                  'No past medical conditions or surgical history reported.'}
              </Typography>
            </Box>
          </TabSectionCard>
        </Grid>
      </Grid>
    </PatientTabContentWrapper>
  );
}

export default memo(ProfileTab);
