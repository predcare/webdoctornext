'use client';

import {
  AllIcon,
  CalendarIcon,
  CancelledIcon,
  CompletedIcon,
  ConfirmedIcon,
  InPersonIcon,
  InProgressIcon,
  NoShowIcon,
  VideoIcon,
} from '@/components/ui/Icons/appointments';
import { AppointmentFiltersWrapper } from '@/styles/CustomStyled/AppointmentFiltersWrapper';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { memo, type ReactNode } from 'react';

const visitOptions: { id: string; label: string; icon: ReactNode; active?: boolean }[] = [
  { id: 'all', label: 'All', icon: <AllIcon />, active: true },
  { id: 'video', label: 'Video', icon: <VideoIcon /> },
  { id: 'in-person', label: 'In-Person', icon: <InPersonIcon /> },
];

const periodOptions: { id: string; label: string; active?: boolean }[] = [
  { id: 'all', label: 'All Time', active: true },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

const statusOptions: { id: string; label: string; count: number; icon: ReactNode; active?: boolean }[] = [
  { id: 'all', label: 'All', count: 10, icon: <AllIcon size={14} />, active: true },
  { id: 'scheduled', label: 'Scheduled', count: 2, icon: <CalendarIcon /> },
  { id: 'confirmed', label: 'Confirmed', count: 3, icon: <ConfirmedIcon /> },
  { id: 'in-progress', label: 'In Progress', count: 1, icon: <InProgressIcon /> },
  { id: 'completed', label: 'Completed', count: 2, icon: <CompletedIcon /> },
  { id: 'no-show', label: 'No Show', count: 1, icon: <NoShowIcon /> },
  { id: 'cancelled', label: 'Cancelled', count: 1, icon: <CancelledIcon /> },
];

function PatientAppointmentFilters() {
  return (
    <AppointmentFiltersWrapper>
      <Box className="filter-row">
        <Box className="chip-group">
          {visitOptions.map((option) => (
            <Button
              key={option.id}
              className={option.active ? 'visit-chip active' : 'visit-chip'}
              aria-pressed={Boolean(option.active)}
              startIcon={option.icon}
              disableElevation
            >
              {option.label}
            </Button>
          ))}
        </Box>
        <Divider className="row-divider" orientation="vertical" flexItem />
        <FormControlLabel
          className="instant-check"
          control={<Checkbox size="small" defaultChecked />}
          label="Include Instant Appointments"
        />
        <Box className="timeline">
          <Typography className="timeline-label" component="span">
            Timeline:
          </Typography>
          <Box className="period-group">
            {periodOptions.map((option) => (
              <Button
                key={option.id}
                className={option.active ? 'period-chip active' : 'period-chip'}
                aria-pressed={Boolean(option.active)}
                disableElevation
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="filter-row status-row">
        <Box className="status-group">
          {statusOptions.map((option) => (
            <Button
              key={option.id}
              className={option.active ? 'status-chip active' : 'status-chip'}
              aria-pressed={Boolean(option.active)}
              startIcon={option.icon}
              disableElevation
            >
              {option.label}
              <Box component="span" className="status-count">
                {option.count}
              </Box>
            </Button>
          ))}
        </Box>
        <Button className="reset-filters" variant="outlined" disableElevation>
          Reset Filters
        </Button>
      </Box>

      <Box className="filter-row">
        <TextField
          className="search-field"
          placeholder="Search by appointment ID, reason or doctor..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button className="date-field empty" variant="outlined" endIcon={<CalendarIcon />}>
          dd-mm-yyyy
        </Button>
        <Button className="date-field empty" variant="outlined" endIcon={<CalendarIcon />}>
          dd-mm-yyyy
        </Button>
        <Select className="sort-select" defaultValue="nearest">
          <MenuItem value="nearest">Date (Nearest First)</MenuItem>
          <MenuItem value="farthest">Date (Farthest First)</MenuItem>
        </Select>
      </Box>
    </AppointmentFiltersWrapper>
  );
}

export default memo(PatientAppointmentFilters);
