'use client';

import {
  followUpReferralFields,
  type FollowUpReferralField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type FollowUpReferralSectionProps = {
  fields?: readonly FollowUpReferralField[];
};

export default function FollowUpReferralSection({
  fields = followUpReferralFields,
}: FollowUpReferralSectionProps) {
  const { register } = useFormContext<TCreatePrescriptionFormValues>();

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
                  Follow-up Appointment & Advice
                </Typography>
              </Box>
            </Box>
            <CustomInput
              type="date"
              inputLabelName="Schedule Follow-up Date"
              {...register('follow_up_date')}
            />
            <CustomInput
              inputLabelName="General Advice"
              placeholder="Advice for diet, hydration, rest, or warning symptoms..."
              multiline
              minRows={3}
              {...register('general_advice')}
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
              inputLabelName="Doctor Name"
              placeholder="e.g. Dr. John Smith"
              {...register('referral_doctor_name')}
            />
            <CustomInput
              inputLabelName="Specialist"
              placeholder="e.g. Cardiologist, Neurologist"
              {...register('referral_specialist')}
            />
            <CustomInput
              inputLabelName="Clinic / Hospital"
              placeholder="e.g. City General Hospital"
              {...register('referral_doctor_hospital')}
            />
            <CustomInput
              inputLabelName="Reason for Referral"
              placeholder="e.g. Further cardiac evaluation"
              {...register('referral_reason')}
            />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
