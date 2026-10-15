import CustomInput from '@/components/ui/CustomInput/CustomInput';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';

export default function AllergiesConditionsSection() {
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
            />
            <Button
              type="button"
              className="add-btn"
              variant="contained"
              disableElevation
            >
              Add
            </Button>
          </Box>
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
            />
            <Button
              type="button"
              className="add-btn"
              variant="contained"
              disableElevation
            >
              Add
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
