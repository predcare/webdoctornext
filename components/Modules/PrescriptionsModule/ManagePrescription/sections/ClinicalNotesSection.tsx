'use client';

import {
  clinicalNoteFields,
  type ClinicalNoteField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type ClinicalNotesSectionProps = {
  fields?: readonly ClinicalNoteField[];
};

export default function ClinicalNotesSection({
  fields = clinicalNoteFields,
}: ClinicalNotesSectionProps) {
  const { register } = useFormContext<TCreatePrescriptionFormValues>();

  const show = (field: ClinicalNoteField) => fields.includes(field);
  const cardSize = fields.length === 1 ? { xs: 12 } : { xs: 12, md: 6 };

  return (
    <Grid container spacing={2.5}>
      {show('symptoms') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <AssignmentOutlinedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Symptoms & Chief Complaints
                </Typography>
              </Box>
            </Box>
            <CustomInput
              placeholder="Enter symptoms and chief complaints..."
              multiline
              minRows={3}
              {...register('chief_complaints')}
            />
          </Box>
        </Grid>
      ) : null}

      {show('examination') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <HealingOutlinedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Examination Notes
                </Typography>
              </Box>
            </Box>
            <CustomInput
              placeholder="Examination findings..."
              multiline
              minRows={3}
              {...register('examination_notes')}
            />
          </Box>
        </Grid>
      ) : null}

      {show('diagnosis') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <ContentPasteOutlinedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Diagnosis
                </Typography>
              </Box>
            </Box>
            <CustomInput
              placeholder="Enter diagnosis..."
              multiline
              minRows={3}
              {...register('diagnosis')}
            />
          </Box>
        </Grid>
      ) : null}

      {show('treatment') ? (
        <Grid size={cardSize}>
          <Box className="section-card">
            <Box className="card-head">
              <Box className="card-title-wrap">
                <Box component="span" className="card-icon">
                  <FormatListBulletedIcon />
                </Box>
                <Typography component="h3" className="card-title">
                  Treatment Plan
                </Typography>
              </Box>
            </Box>
            <CustomInput
              placeholder="Enter treatment plan..."
              multiline
              minRows={3}
              {...register('treatment_plan')}
            />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
