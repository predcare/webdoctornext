import CustomInput from '@/components/ui/CustomInput/CustomInput';
import type { PrescriptionWorkspaceVitals } from '@/resources/mock';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';

type PatientVitalsSectionProps = {
  vitals: PrescriptionWorkspaceVitals;
};

const unit = (label: string) => (
  <Typography component="span" className="unit-adornment">
    {label}
  </Typography>
);

export default function PatientVitalsSection({
  vitals,
}: PatientVitalsSectionProps) {
  return (
    <Box className="section-card">
      <Box className="card-head">
        <Box className="card-title-wrap">
          <Box component="span" className="card-icon">
            <MonitorHeartOutlinedIcon />
          </Box>
          <Typography component="h3" className="card-title">
            Patient Vitals
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            name="blood_pressure"
            inputLabelName="Blood Pressure (mmHg)"
            defaultValue={vitals.blood_pressure}
            endAdornment={unit('SYS/DIA')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            name="pulse"
            inputLabelName="Heart Rate (bpm)"
            defaultValue={vitals.pulse}
            endAdornment={unit('bpm')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            name="temperature"
            inputLabelName="Temperature (°C)"
            defaultValue={vitals.temperature}
            endAdornment={unit('°C')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            name="spo2"
            inputLabelName="SpO2 (%)"
            defaultValue={vitals.spo2}
            endAdornment={unit('%')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            name="weight"
            inputLabelName="Weight (kg)"
            defaultValue={vitals.weight}
            endAdornment={unit('kg')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            name="height"
            inputLabelName="Height (cm)"
            defaultValue={vitals.height}
            endAdornment={unit('cm')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            name="bmi"
            inputLabelName="BMI (kg/m²)"
            defaultValue={vitals.bmi}
            disabled
          />
        </Grid>
      </Grid>

      <Box className="custom-vital-block">
        <Typography component="p" className="custom-vital-label">
          Add Custom Vital
        </Typography>
        <Box className="vital-add-row">
          <CustomInput
            name="customVitalName"
            placeholder="Vital name (e.g. Weight)"
          />
          <CustomInput
            name="customVitalValue"
            placeholder="Value (e.g. 70 kg)"
          />
          <Button
            type="button"
            className="add-btn"
            variant="contained"
            disableElevation
          >
            Add Vital
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
