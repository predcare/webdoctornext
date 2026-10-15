import CustomInput from '@/components/ui/CustomInput/CustomInput';
import AddIcon from '@mui/icons-material/Add';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';

export default function LabTestsSection() {
  return (
    <Box className="section-card">
      <Box className="card-head">
        <Box className="card-title-wrap">
          <Box component="span" className="card-icon">
            <ScienceOutlinedIcon />
          </Box>
          <Typography component="h3" className="card-title">
            Lab Tests
          </Typography>
        </Box>
      </Box>

      <Box className="nested-card">
        <Box className="card-head">
          <Box className="card-title-wrap">
            <Box component="span" className="card-icon">
              <ScienceOutlinedIcon />
            </Box>
            <Typography component="h3" className="card-title">
              Add New Lab Test
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }} className="is-required">
            <CustomInput
              name="labTestName"
              inputLabelName="Lab Test Name"
              placeholder="Enter lab test name (e.g., Blood Test, X-Ray, ECG)"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomInput
              name="labTestInstructions"
              inputLabelName="Instructions"
              placeholder="e.g., Fasting"
            />
          </Grid>
        </Grid>

        <Box>
          <Button
            type="button"
            className="add-btn"
            variant="contained"
            disableElevation
            startIcon={<AddIcon fontSize="small" />}
          >
            Add Lab Test
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
