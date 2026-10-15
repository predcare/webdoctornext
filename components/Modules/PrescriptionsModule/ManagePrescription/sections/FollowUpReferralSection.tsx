import {
  followUpReferralFields,
  type FollowUpReferralField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, Grid, Typography } from '@mui/material';

type FollowUpReferralSectionProps = {
  fields?: readonly FollowUpReferralField[];
};

export default function FollowUpReferralSection({
  fields = followUpReferralFields,
}: FollowUpReferralSectionProps) {
  const show = (field: FollowUpReferralField) => fields.includes(field);
  const cardSize = fields.length === 1 ? { xs: 12 } : { xs: 12, md: 6 };

  return (
    <Grid container spacing={2.5}>
      {show('follow-up') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <EventOutlinedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Follow-up Appointment
                </Typography>
              </Box>
            </Box>
            <CustomInput
              name="follow_up_date"
              type="date"
              inputLabelName="Schedule Date"
            />
            <CustomInput
              name="general_advice"
              inputLabelName="General Advice"
              placeholder="General advice for the patient..."
              multiline
              minRows={3}
            />
          </Box>
        </Grid>
      ) : null}

      {show('referral') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <SendOutlinedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Referral Information
                </Typography>
              </Box>
            </Box>
            <CustomInput
              name="referral_doctor_name"
              inputLabelName="Doctor Name"
              placeholder="Referred doctor name"
            />
            <CustomInput
              name="referral_specialist"
              inputLabelName="Specialist"
              placeholder="e.g., Cardiologist"
            />
            <CustomInput
              name="referral_doctor_hospital"
              inputLabelName="Clinic/Hospital"
              placeholder="Referred to"
            />
            <CustomInput
              name="referral_reason"
              inputLabelName="Reason for Referral"
              placeholder="Reason for referral"
            />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
