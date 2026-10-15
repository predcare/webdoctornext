import type { PrescriptionWorkspacePatient } from '@/resources/mock';
import { avatarTone } from '@/utils/avatarTone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Grid, Typography } from '@mui/material';

type ConsultationPatientHeaderProps = {
  patient: PrescriptionWorkspacePatient;
};

export default function ConsultationPatientHeader({
  patient,
}: ConsultationPatientHeaderProps) {
  const stats = [
    { label: 'Blood Type', value: patient.bloodType },
    { label: 'Last Visit', value: patient.lastVisit },
    { label: 'Registered', value: patient.registered },
    { label: 'City', value: patient.city },
  ];

  return (
    <Box className="patient-head">
      <Box className="patient-identity">
        <Box className={`patient-avatar ${avatarTone(patient.initial)}`}>
          {patient.initial}
        </Box>
        <Box className="patient-copy">
          <Box className="patient-title-row">
            <Typography component="h2" className="patient-name">
              {patient.name}
            </Typography>
            <Typography component="span" className="code-chip">
              #{patient.patientCode}
            </Typography>
          </Box>
          <Box className="patient-meta">
            <Typography component="span" className="meta-item">
              <PersonOutlineOutlinedIcon />
              {patient.gender}, {patient.age}y
            </Typography>
            <Typography component="span" className="meta-item">
              <PhoneOutlinedIcon />
              {patient.phone}
            </Typography>
            <Typography component="span" className="meta-item">
              <MailOutlinedIcon />
              {patient.email}
            </Typography>
            <Typography component="span" className="meta-item">
              <LocationOnOutlinedIcon />
              {patient.city}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={0} className="patient-stats">
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }} className="stat-cell">
            <Typography component="p" className="stat-label">
              {stat.label}
            </Typography>
            <Typography component="p" className="stat-value">
              {stat.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
