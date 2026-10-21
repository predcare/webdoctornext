import { getInitials } from '@/lib/commons/common.utils';
import { avatarTone } from '@/utils/avatarTone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Grid, Typography } from '@mui/material';

type ConsultationPatientHeaderProps = {
  ptName: string
  patientCode: string;
  ptPhone: string
  ptEmail: string
  ptGender: string
  ptAge: string
  ptCity: string
  ptBloodGroup: string
  ptLastVisit: string
  ptRegisteredDate: string
};

export default function ConsultationPatientHeader({
  ptName,
  ptPhone,
  ptEmail,
  ptGender,
  ptAge,
  ptCity,
  ptBloodGroup,
  ptLastVisit,
  ptRegisteredDate,
  patientCode,
}: ConsultationPatientHeaderProps) {
  const stats = [
    { label: 'Blood Type', value: ptBloodGroup },
    { label: 'Last Visit', value: ptLastVisit },
    { label: 'Registered', value: ptRegisteredDate },
    { label: 'City', value: ptCity },
  ];

  return (
    <Box className="patient-head">
      <Box className="patient-identity">
        <Box className={`patient-avatar ${avatarTone(getInitials(ptName))}`}>
          {getInitials(ptName)}
        </Box>
        <Box className="patient-copy">
          <Box className="patient-title-row">
            <Typography component="h2" className="patient-name">
              {ptName}
            </Typography>
            <Typography component="span" className="code-chip">
              #{patientCode}
            </Typography>
          </Box>
          <Box className="patient-meta">
            <Typography component="span" className="meta-item">
              <PersonOutlineOutlinedIcon />
              {ptGender}, {ptAge}
            </Typography>
            <Typography component="span" className="meta-item">
              <PhoneOutlinedIcon />
              {ptPhone}
            </Typography>
            <Typography component="span" className="meta-item">
              <MailOutlinedIcon />
              {ptEmail}
            </Typography>
            <Typography component="span" className="meta-item">
              <LocationOnOutlinedIcon />
              {ptCity}
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
