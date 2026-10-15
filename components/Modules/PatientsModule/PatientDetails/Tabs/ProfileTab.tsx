'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import type { PatientDetails } from '@/resources/mock';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
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
import { memo, type ReactNode } from 'react';

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
  details: PatientDetails;
};

function ProfileTab({ details }: ProfileTabProps) {
  const personalFields: ProfileField[] = [
    { label: 'Full Name', value: details.name, icon: <PersonOutlineOutlinedIcon />, full: true },
    { label: 'Gender', value: details.gender, icon: <WcOutlinedIcon /> },
    {
      label: 'Date of Birth',
      icon: <CakeOutlinedIcon />,
      value: (
        <>
          {details.dateOfBirth}
          <Box component="span" className="field-hint">
            {details.age} yrs
          </Box>
        </>
      ),
    },
    {
      label: 'Blood Type',
      icon: <BloodtypeOutlinedIcon />,
      value: (
        <Box component="span" className="tag danger">
          {details.bloodType}
        </Box>
      ),
    },
    { label: 'Status', value: <StatusChip status={details.userStatus} />, icon: <ToggleOnOutlinedIcon /> },
    { label: 'Patient ID', value: `#${details.patientCode}`, icon: <BadgeOutlinedIcon />, full: true },
  ];

  const contactFields: ProfileField[] = [
    { label: 'Primary Phone', value: details.phone, icon: <PhoneOutlinedIcon /> },
    { label: 'Alternate Number', value: details.phone, icon: <PhoneAndroidOutlinedIcon /> },
    {
      label: 'WhatsApp',
      value: <Box component="span" className="field-empty">Not added</Box>,
      icon: <WhatsAppIcon />,
    },
    { label: 'Emergency Contact', value: details.emergencyContact, icon: <ContactPhoneOutlinedIcon /> },
    { label: 'Email', value: details.email, icon: <MailOutlinedIcon />, full: true },
  ];

  const addressFields: ProfileField[] = [
    { label: 'Address', value: 'MG Marg, Near Titanic Park', icon: <HomeOutlinedIcon />, full: true },
    { label: 'City', value: details.city, icon: <LocationCityOutlinedIcon /> },
    { label: 'State', value: 'Sikkim', icon: <MapOutlinedIcon /> },
    { label: 'Postal Code', value: '737101', icon: <MarkunreadMailboxOutlinedIcon /> },
    { label: 'Country', value: 'India', icon: <FlagOutlinedIcon /> },
  ];

  return (
    <PatientTabContentWrapper>
      <Grid container spacing={{ xs: 2, md: 2.5 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TabSectionCard
            className="fill"
            title="Personal Information"
            subtitle="Basic identity details"
            icon={<PersonOutlineOutlinedIcon />}
            editable
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
            editable
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
            editable
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
            editable
          >
            <Box className="medical-block">
              <Typography component="p" className="field-label">
                Known Allergies
              </Typography>
              <Box className="chip-row">
                {details.allergies.length ? (
                  details.allergies.map((item) => (
                    <Box key={item} component="span" className="tag danger">
                      {item}
                    </Box>
                  ))
                ) : (
                  <Box component="span" className="tag neutral">
                    None reported
                  </Box>
                )}
              </Box>
            </Box>

            <Box className="medical-block">
              <Typography component="p" className="field-label">
                Chronic Conditions
              </Typography>
              <Box className="chip-row">
                {details.conditions.map((item) => (
                  <Box key={item} component="span" className="tag warning">
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="medical-block">
              <Typography component="p" className="field-label">
                Medical History
              </Typography>
              <Typography component="p" className="history-box">
                Patient is lactose intolerant and has a history of mild asthma since childhood.
                Currently managing anxiety with regular counselling sessions. No previous surgeries
                reported.
              </Typography>
            </Box>
          </TabSectionCard>
        </Grid>
      </Grid>
    </PatientTabContentWrapper>
  );
}

export default memo(ProfileTab);
