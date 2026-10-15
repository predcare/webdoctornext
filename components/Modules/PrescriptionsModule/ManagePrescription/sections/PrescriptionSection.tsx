import {
  dosageOptions,
  durationUnits,
  prescriptionTableHeads,
  strengthUnits,
  timingOptions,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import { selectSlotProps } from '@/components/Modules/PrescriptionsModule/ManagePrescription/selectSlotProps';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { Box, Button, Grid, MenuItem, Typography } from '@mui/material';

export default function PrescriptionSection() {
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
        <Button
          type="button"
          className="ghost-btn"
          variant="outlined"
          disableElevation
          startIcon={<HistoryOutlinedIcon fontSize="small" />}
        >
          Load Previous
        </Button>
      </Box>

      <CustomTable
        className="prescription-table"
        headList={prescriptionTableHeads}
        zebraStriping={false}
        isEmpty={false}
      />

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
            <CustomAutocomplete<string>
              name="medicineName"
              inputLabelName="Medicine Name"
              placeholder="Type 3+ letters to search..."
              options={[]}
              getOptionLabel={(option) => option}
              noOptionsText="No medicines found"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box className="split-field">
              <Box>
                <CustomInput
                  name="strength"
                  inputLabelName="Strength"
                  defaultValue="50"
                />
              </Box>
              <Box>
                <CustomInput
                  select
                  name="strengthUnit"
                  defaultValue="mg"
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
              defaultValue=""
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
                  name="duration"
                  inputLabelName="Duration"
                  defaultValue="30"
                />
              </Box>
              <Box>
                <CustomInput
                  select
                  name="durationUnit"
                  defaultValue="days"
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
              defaultValue=""
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
              placeholder="Additional instructions"
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
            Add Medication
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
