'use client';

import {
  dosageOptions,
  durationUnits,
  prescriptionTableHeads,
  strengthUnits,
  timingOptions,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import { selectSlotProps } from '@/components/Modules/PrescriptionsModule/ManagePrescription/selectSlotProps';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { showErrorToast } from '@/lib/commons/toast';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function PrescriptionSection() {
  const { control } = useFormContext<TCreatePrescriptionFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const [medName, setMedName] = useState('');
  const [strength, setStrength] = useState('500');
  const [strengthUnit, setStrengthUnit] = useState('mg');
  const [dosage, setDosage] = useState('1-0-1');
  const [durationNum, setDurationNum] = useState('5');
  const [durationUnit, setDurationUnit] = useState('days');
  const [timing, setTiming] = useState('After food');
  const [instructions, setInstructions] = useState('');

  const handleAddMedication = () => {
    const trimmedName = medName.trim();
    if (!trimmedName) {
      showErrorToast('Please enter a medicine name');
      return;
    }

    append({
      name: trimmedName,
      strength: strength.trim(),
      strengthUnit,
      dosage,
      durationNum: durationNum.trim(),
      durationUnit,
      timing,
      instructions: instructions.trim(),
    });

    setMedName('');
    setStrength('500');
    setStrengthUnit('mg');
    setDosage('1-0-1');
    setDurationNum('5');
    setDurationUnit('days');
    setTiming('After food');
    setInstructions('');
  };

  return (
    <Box className="section-card">
      <Box className="card-head">
        <Box className="card-title-wrap">
          <Box component="span" className="card-icon">
            <MedicationOutlinedIcon />
          </Box>
          <Typography component="h3" className="card-title">
            Prescription
          </Typography>
        </Box>
      </Box>

      <CustomTable
        className="prescription-table"
        headList={prescriptionTableHeads}
        zebraStriping={false}
        isEmpty={fields.length === 0}
        emptyText="No medications added yet"
        emptyDescription="Add medications for this consultation using the form below."
      >
        {fields.map((field, index) => {
          const med = field as any;
          return (
            <TableRow key={field.id}>
              <TableCell>
                <Typography component="p" sx={{ fontWeight: 600, fontSize: 13 }}>
                  {med.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component="p" sx={{ fontSize: 13 }}>
                  {med.strength ? `${med.strength} ${med.strengthUnit || ''}` : '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  component="span"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: '6px',
                    fontSize: 12,
                    fontWeight: 600,
                    bgcolor: (theme) => `${theme.palette.customColors.brandTeal}15`,
                    color: (theme) => theme.palette.customColors.brandTeal,
                  }}
                >
                  {med.dosage || '—'}
                </Box>
              </TableCell>
              <TableCell>
                <Typography component="p" sx={{ fontSize: 13 }}>
                  {med.durationNum
                    ? `${med.durationNum} ${med.durationUnit || ''}`
                    : '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component="p" sx={{ fontSize: 13 }}>
                  {med.timing || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  component="p"
                  sx={{ fontSize: 13, color: 'text.secondary' }}
                >
                  {med.instructions || '—'}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  aria-label={`Remove medication ${med.name}`}
                  onClick={() => remove(index)}
                  sx={{
                    color: 'error.main',
                    '&:hover': { bgcolor: 'error.lighter' },
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </CustomTable>

      <Box className="nested-card">
        <Box className="card-head">
          <Box className="card-title-wrap">
            <Box component="span" className="card-icon">
              <MedicationOutlinedIcon />
            </Box>
            <Typography component="h3" className="card-title">
              Add New Medication
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }} className="is-required">
            <CustomInput
              name="medName"
              inputLabelName="Medicine Name"
              placeholder="e.g. Paracetamol, Amoxicillin..."
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddMedication();
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box className="split-field">
              <Box>
                <CustomInput
                  name="strength"
                  inputLabelName="Strength"
                  placeholder="500"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  select
                  name="strengthUnit"
                  value={strengthUnit}
                  onChange={(e) => setStrengthUnit(e.target.value)}
                  slotProps={selectSlotProps('Unit')}
                >
                  {strengthUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </CustomInput>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} className="is-required">
            <CustomInput
              select
              name="dosage"
              inputLabelName="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              slotProps={selectSlotProps('Select dosage')}
            >
              {dosageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box className="split-field">
              <Box>
                <CustomInput
                  name="durationNum"
                  inputLabelName="Duration"
                  placeholder="5"
                  value={durationNum}
                  onChange={(e) => setDurationNum(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  select
                  name="durationUnit"
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  slotProps={selectSlotProps('Unit')}
                >
                  {durationUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </CustomInput>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CustomInput
              select
              name="timing"
              inputLabelName="Timing"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              slotProps={selectSlotProps('Select timing')}
            >
              {timingOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomInput
              name="instructions"
              inputLabelName="Instructions"
              placeholder="e.g. Take with warm water"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddMedication();
                }
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            type="button"
            className="add-btn"
            variant="contained"
            disableElevation
            startIcon={<AddIcon fontSize="small" />}
            onClick={handleAddMedication}
          >
            Add Medication
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
