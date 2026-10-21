'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { showErrorToast } from '@/lib/commons/toast';
import { TCreatePrescriptionFormValues } from '@/lib/schemas/createPrescription.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const labTableHeads = ['Test Name', 'Instructions', 'Action'];

export default function LabTestsSection() {
  const { control } = useFormContext<TCreatePrescriptionFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lab_tests_structured',
  });

  const [testName, setTestName] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleAddLabTest = () => {
    const trimmed = testName.trim();
    if (!trimmed) {
      showErrorToast('Please enter a lab test name');
      return;
    }

    append({
      name: trimmed,
      instructions: instructions.trim(),
    });

    setTestName('');
    setInstructions('');
  };

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

      {fields.length > 0 && (
        <CustomTable
          className="prescription-table"
          headList={labTableHeads}
          zebraStriping={false}
          isEmpty={false}
        >
          {fields.map((field, idx) => {
            const test = field as any;
            return (
              <TableRow key={field.id}>
                <TableCell>
                  <Typography
                    component="p"
                    sx={{ fontWeight: 600, fontSize: 13 }}
                  >
                    {test.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="p"
                    sx={{ fontSize: 13, color: 'text.secondary' }}
                  >
                    {test.instructions || '—'}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: 80 }}>
                  <IconButton
                    size="small"
                    aria-label={`Remove lab test ${test.name}`}
                    onClick={() => remove(idx)}
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
      )}

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
              placeholder="Enter lab test name (e.g., Blood Test, X-Ray, Lipid Profile)"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddLabTest();
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomInput
              name="labTestInstructions"
              inputLabelName="Instructions"
              placeholder="e.g., Fasting for 12 hours"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddLabTest();
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
            onClick={handleAddLabTest}
          >
            Add Lab Test
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
