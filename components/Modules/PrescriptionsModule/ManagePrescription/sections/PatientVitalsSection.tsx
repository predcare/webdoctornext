'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import CloseIcon from '@mui/icons-material/Close';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const unit = (label: string) => (
  <Typography component="span" className="unit-adornment">
    {label}
  </Typography>
);

export default function PatientVitalsSection() {
  const { register, watch, setValue } =
    useFormContext<TCreatePrescriptionFormValues>();

  const weight = watch('weight');
  const height = watch('height');
  const customVitals = watch('custom_vitals') || [];

  const [customName, setCustomName] = useState('');
  const [customVal, setCustomVal] = useState('');

  // Auto-calculate BMI
  useEffect(() => {
    const w = parseFloat(String(weight || ''));
    const h = parseFloat(String(height || '')) / 100;
    if (w > 0 && h > 0) {
      const calculatedBmi = (w / (h * h)).toFixed(1);
      setValue('bmi', calculatedBmi, { shouldDirty: true });
    }
  }, [weight, height, setValue]);

  const handleAddCustomVital = () => {
    const nameTrimmed = customName.trim();
    const valTrimmed = customVal.trim();
    if (!nameTrimmed || !valTrimmed) return;

    const updated = [...customVitals, { name: nameTrimmed, value: valTrimmed }];
    setValue('custom_vitals', updated, { shouldDirty: true });
    setCustomName('');
    setCustomVal('');
  };

  const handleRemoveCustomVital = (index: number) => {
    const updated = customVitals.filter((_, i) => i !== index);
    setValue('custom_vitals', updated, { shouldDirty: true });
  };

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
            inputLabelName="Blood Pressure (mmHg)"
            placeholder="120/80"
            endAdornment={unit('SYS/DIA')}
            {...register('blood_pressure')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            inputLabelName="Heart Rate (bpm)"
            placeholder="72"
            endAdornment={unit('bpm')}
            {...register('pulse')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            inputLabelName="Temperature (°C)"
            placeholder="37"
            endAdornment={unit('°C')}
            {...register('temperature')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CustomInput
            inputLabelName="SpO2 (%)"
            placeholder="98"
            endAdornment={unit('%')}
            {...register('spo2')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            inputLabelName="Weight (kg)"
            placeholder="70"
            endAdornment={unit('kg')}
            {...register('weight')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            inputLabelName="Height (cm)"
            placeholder="175"
            endAdornment={unit('cm')}
            {...register('height')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomInput
            inputLabelName="BMI (kg/m²)"
            placeholder="Auto-calculated"
            disabled
            value={watch('bmi') || ''}
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
            placeholder="Vital name (e.g. Blood Sugar)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <CustomInput
            name="customVitalValue"
            placeholder="Value (e.g. 110 mg/dL)"
            value={customVal}
            onChange={(e) => setCustomVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomVital();
              }
            }}
          />
          <Button
            type="button"
            className="add-btn"
            variant="contained"
            disableElevation
            onClick={handleAddCustomVital}
          >
            Add Vital
          </Button>
        </Box>

        {customVitals.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {customVitals.map((vital, idx) => (
              <Chip
                key={idx}
                label={`${vital?.name}: ${vital?.value}`}
                size="small"
                onDelete={() => handleRemoveCustomVital(idx)}
                deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                sx={{
                  borderRadius: '8px',
                  bgcolor: (theme) =>
                    `${theme.palette.customColors.brandTeal}15`,
                  color: (theme) => theme.palette.customColors.brandTeal,
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
