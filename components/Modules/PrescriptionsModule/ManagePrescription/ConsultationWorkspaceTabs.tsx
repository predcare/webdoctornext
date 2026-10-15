import {
  primaryTabLabels,
  secondaryTabLabels,
  type ConsultationTabId,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Box, Tab, Tabs } from '@mui/material';
import type { ReactElement, SyntheticEvent } from 'react';

const primaryIcons: Record<string, ReactElement> = {
  appointments: <EventNoteOutlinedIcon />,
  consultations: <VideoCallOutlinedIcon />,
  prescriptions: <MedicationOutlinedIcon />,
  'medical-records': <FolderOutlinedIcon />,
  billing: <ReceiptLongOutlinedIcon />,
  family: <FamilyRestroomOutlinedIcon />,
  profile: <PersonOutlineOutlinedIcon />,
};

const secondaryIcons: Record<ConsultationTabId, ReactElement> = {
  'clinical-notes': <NotesOutlinedIcon />,
  diagnosis: <LocalHospitalOutlinedIcon />,
  prescription: <MedicationOutlinedIcon />,
  referrals: <ShortcutOutlinedIcon />,
};

type ConsultationWorkspaceTabsProps = {
  tab: ConsultationTabId;
  onChange: (tab: ConsultationTabId) => void;
};

export default function ConsultationWorkspaceTabs({
  tab,
  onChange,
}: ConsultationWorkspaceTabsProps) {
  const selectedIndex = Math.max(
    secondaryTabLabels.findIndex((item) => item.id === tab),
    0,
  );

  const handleChange = (_event: SyntheticEvent, value: number) => {
    const nextTab = secondaryTabLabels[value]?.id;
    if (nextTab) {
      onChange(nextTab);
    }
  };

  return (
    <Box className="workspace-nav">
      <Box className="tabs-head">
        <Tabs
          className="workspace-tabs"
          value={2}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Consultation workspace tabs"
        >
          {primaryTabLabels.map((item) => (
            <Tab
              key={item.id}
              className="workspace-tab"
              label={item.label}
              icon={primaryIcons[item.id]}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
      <Box className="sub-tabs-row">
        <Tabs
          className="sub-tabs"
          value={selectedIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Consultation section tabs"
        >
          {secondaryTabLabels.map((item) => (
            <Tab
              key={item.id}
              className="sub-tab"
              disableRipple
              label={item.label}
              icon={secondaryIcons[item.id]}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
