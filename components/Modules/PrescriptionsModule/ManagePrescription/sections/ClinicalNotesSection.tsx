import {
  clinicalNoteFields,
  type ClinicalNoteField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import AddIcon from '@mui/icons-material/Add';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, Typography } from '@mui/material';

type ClinicalNotesSectionProps = {
  fields?: readonly ClinicalNoteField[];
};

export default function ClinicalNotesSection({
  fields = clinicalNoteFields,
}: ClinicalNotesSectionProps) {
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
              name="chief_complaints"
              placeholder="Enter symptoms and chief complaints..."
              multiline
              minRows={3}
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
              name="examination_notes"
              placeholder="Examination findings..."
              multiline
              minRows={3}
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
            <Box className="chip-add-row">
              <CustomInput
                name="diagnosis"
                placeholder="Type diagnosis and press Add..."
                startAdornment={<SearchIcon />}
              />
              <Button
                type="button"
                className="ghost-btn"
                variant="outlined"
                disableElevation
                startIcon={<AddIcon fontSize="small" />}
              >
                Add
              </Button>
            </Box>
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
              name="treatment_plan"
              placeholder="Enter treatment plan..."
              multiline
              minRows={3}
            />
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
