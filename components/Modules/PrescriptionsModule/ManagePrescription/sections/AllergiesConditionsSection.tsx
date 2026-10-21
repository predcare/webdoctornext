'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function AllergiesConditionsSection() {
  const { watch, setValue } = useFormContext<TCreatePrescriptionFormValues>();

  const drugAllergiesStr = watch('drug_allergies') || '';
  const chronicConditionsStr = watch('chronic_conditions') || '';

  const allergiesList = drugAllergiesStr
    ? drugAllergiesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    : [];

  const conditionsList = chronicConditionsStr
    ? chronicConditionsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    : [];

  const [allergyInput, setAllergyInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');

  const handleAddAllergy = () => {
    const trimmed = allergyInput.trim();
    if (!trimmed) return;
    if (!allergiesList.includes(trimmed)) {
      const updated = [...allergiesList, trimmed].join(', ');
      setValue('drug_allergies', updated, { shouldDirty: true });
    }
    setAllergyInput('');
  };

  const handleRemoveAllergy = (itemToRemove: string) => {
    const updated = allergiesList
      .filter((item) => item !== itemToRemove)
      .join(', ');
    setValue('drug_allergies', updated, { shouldDirty: true });
  };

  const handleAddCondition = () => {
    const trimmed = conditionInput.trim();
    if (!trimmed) return;
    if (!conditionsList.includes(trimmed)) {
      const updated = [...conditionsList, trimmed].join(', ');
      setValue('chronic_conditions', updated, { shouldDirty: true });
    }
    setConditionInput('');
  };

  const handleRemoveCondition = (itemToRemove: string) => {
    const updated = conditionsList
      .filter((item) => item !== itemToRemove)
      .join(', ');
    setValue('chronic_conditions', updated, { shouldDirty: true });
  };

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box className="section-card">
          <Box className="card-head">
            <Box className="card-title-wrap">
              <Box component="span" className="card-icon">
                <WarningAmberOutlinedIcon />
              </Box>
              <Typography component="h3" className="card-title">
                Known Allergies
              </Typography>
            </Box>
          </Box>
          <Box className="chip-add-row">
            <CustomInput
              name="allergy"
              placeholder="Type allergy and press Add..."
              startAdornment={<SearchIcon />}
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddAllergy();
                }
              }}
            />
            <Button
              type="button"
              className="add-btn"
              variant="contained"
              disableElevation
              onClick={handleAddAllergy}
            >
              Add
            </Button>
          </Box>
          {allergiesList.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
              {allergiesList.map((allergy) => (
                <Chip
                  key={allergy}
                  label={allergy}
                  size="small"
                  onDelete={() => handleRemoveAllergy(allergy)}
                  deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                  sx={{
                    borderRadius: '8px',
                    bgcolor: (theme) => `${theme.palette.customColors.error}15`,
                    color: (theme) => theme.palette.customColors.error,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box className="section-card">
          <Box className="card-head">
            <Box className="card-title-wrap">
              <Box component="span" className="card-icon">
                <AddCircleOutlinedIcon />
              </Box>
              <Typography component="h3" className="card-title">
                Chronic Conditions
              </Typography>
            </Box>
          </Box>
          <Box className="chip-add-row">
            <CustomInput
              name="condition"
              placeholder="Type condition and press Add..."
              startAdornment={<SearchIcon />}
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCondition();
                }
              }}
            />
            <Button
              type="button"
              className="add-btn"
              variant="contained"
              disableElevation
              onClick={handleAddCondition}
            >
              Add
            </Button>
          </Box>
          {conditionsList.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
              {conditionsList.map((condition) => (
                <Chip
                  key={condition}
                  label={condition}
                  size="small"
                  onDelete={() => handleRemoveCondition(condition)}
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
      </Grid>
    </Grid>
  );
}
