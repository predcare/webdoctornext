'use client';

import AppointmentsTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/AppointmentsTab';
import BillingTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/BillingTab';
import ConsultationsTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/ConsultationsTab';
import FamilyTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/FamilyTab';
import MedicalRecordsTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/MedicalRecordsTab';
import PrescriptionsTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/PrescriptionsTab';
import ProfileTab from '@/components/Modules/PatientsModule/PatientDetails/Tabs/ProfileTab';
import type { PatientDetails } from '@/resources/mock';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Box, Tab, Tabs } from '@mui/material';
import { memo, useState, type ReactElement, type ReactNode, type SyntheticEvent } from 'react';

type PatientTab = {
  id: string;
  label: string;
  icon: ReactElement;
  render: (details: PatientDetails) => ReactNode;
};

const patientTabs: PatientTab[] = [
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <EventNoteOutlinedIcon />,
    render: (details) => <AppointmentsTab details={details} />,
  },
  {
    id: 'consultations',
    label: 'Consultations',
    icon: <VideoCallOutlinedIcon />,
    render: (details) => <ConsultationsTab details={details} />,
  },
  {
    id: 'prescriptions',
    label: 'Prescriptions',
    icon: <MedicationOutlinedIcon />,
    render: () => <PrescriptionsTab />,
  },
  {
    id: 'medical-records',
    label: 'Medical Records',
    icon: <FolderOutlinedIcon />,
    render: (details) => <MedicalRecordsTab details={details} />,
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <ReceiptLongOutlinedIcon />,
    render: () => <BillingTab />,
  },
  {
    id: 'family',
    label: 'Family',
    icon: <FamilyRestroomOutlinedIcon />,
    render: () => <FamilyTab />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <PersonOutlineOutlinedIcon />,
    render: (details) => <ProfileTab details={details} />,
  },
];

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
    >
      {value === index ? <Box className="tab-panel">{children}</Box> : null}
    </div>
  );
}

const a11yProps = (index: number) => ({
  id: `patient-tab-${index}`,
  'aria-controls': `patient-tabpanel-${index}`,
});

type PatientDetailTabsProps = {
  details: PatientDetails;
};

function PatientDetailTabs({ details }: PatientDetailTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="detail-card">
      <Box className="tabs-head">
        <Tabs
          className="detail-tabs"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Patient details tabs"
        >
          {patientTabs.map((tab, index) => (
            <Tab
              key={tab.id}
              className="detail-tab"
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      {patientTabs.map((tab, index) => (
        <TabPanel key={tab.id} value={value} index={index}>
          {tab.render(details)}
        </TabPanel>
      ))}
    </Box>
  );
}

export default memo(PatientDetailTabs);
