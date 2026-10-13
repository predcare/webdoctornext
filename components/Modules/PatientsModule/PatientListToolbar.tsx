'use client';

import {
  activePatientFilterCount,
  clinicStatusOptions,
  genderOptions,
  sortOptions,
  type PatientFilterState,
  type PatientSort,
} from '@/components/Modules/PatientsModule/patientFilters';
import { projectRoutes } from '@/routes';
import { PatientFilterPopover } from '@/styles/CustomStyled/PatientListWrapper';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Badge,
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { memo, useState, type MouseEvent } from 'react';

type DraftFilters = Pick<PatientFilterState, 'gender' | 'clinicStatus'>;

const optionLabel = (value: string) => (value === 'all' ? 'All' : value);

type PatientListToolbarProps = {
  filters: PatientFilterState;
  onChange: (patch: Partial<PatientFilterState>) => void;
  onClear: () => void;
};

function PatientListToolbar({ filters, onChange, onClear }: PatientListToolbarProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState<DraftFilters>({ gender: 'all', clinicStatus: 'all' });
  const activeCount = activePatientFilterCount(filters);

  const openFilters = (event: MouseEvent<HTMLButtonElement>) => {
    setDraft({ gender: filters.gender, clinicStatus: filters.clinicStatus });
    setAnchor(event.currentTarget);
  };

  const applyFilters = () => {
    onChange(draft);
    setAnchor(null);
  };

  return (
    <Box className="patient-toolbar">
      <Box className="toolbar-row">
        <TextField
          className="patient-search"
          size="small"
          placeholder="Search patients..."
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
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

        <Box className="toolbar-actions">
          <Badge className="filter-badge" badgeContent={activeCount} color="primary" invisible={activeCount === 0}>
            <Button
              className={`toolbar-btn filter-btn${activeCount ? ' active' : ''}`}
              variant="outlined"
              startIcon={<FilterListIcon fontSize="small" />}
              onClick={openFilters}
            >
              Filters
            </Button>
          </Badge>

          <Select
            className="toolbar-btn sort-select"
            size="small"
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value as PatientSort })}
            renderValue={(value) => `Sort By : ${sortOptions.find((option) => option.value === value)?.label}`}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            component={Link}
            href={projectRoutes.addPatient}
            className="toolbar-btn add-patient"
            variant="contained"
            disableElevation
            startIcon={<AddIcon fontSize="small" />}
          >
            Add Patient
          </Button>
        </Box>
      </Box>

      {activeCount > 0 ? (
        <Box className="active-filters">
          {filters.gender !== 'all' ? (
            <Chip
              className="active-chip"
              size="small"
              label={`Gender: ${filters.gender}`}
              onDelete={() => onChange({ gender: 'all' })}
            />
          ) : null}
          {filters.clinicStatus !== 'all' ? (
            <Chip
              className="active-chip"
              size="small"
              label={`Clinic Status: ${filters.clinicStatus}`}
              onDelete={() => onChange({ clinicStatus: 'all' })}
            />
          ) : null}
          <Button className="clear-all" size="small" onClick={onClear}>
            Clear all
          </Button>
        </Box>
      ) : null}

      <PatientFilterPopover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box className="popover-section">
          <Typography component="p" className="popover-label">
            Gender
          </Typography>
          <Box className="popover-chips">
            {genderOptions.map((option) => (
              <Chip
                key={option}
                className={`popover-chip${draft.gender === option ? ' selected' : ''}`}
                label={optionLabel(option)}
                onClick={() => setDraft((current) => ({ ...current, gender: option }))}
              />
            ))}
          </Box>
        </Box>

        <Box className="popover-section">
          <Typography component="p" className="popover-label">
            Clinic Status
          </Typography>
          <Box className="popover-chips">
            {clinicStatusOptions.map((option) => (
              <Chip
                key={option}
                className={`popover-chip${draft.clinicStatus === option ? ' selected' : ''}`}
                label={optionLabel(option)}
                onClick={() => setDraft((current) => ({ ...current, clinicStatus: option }))}
              />
            ))}
          </Box>
        </Box>

        <Box className="popover-footer">
          <Button
            className="popover-btn"
            variant="outlined"
            onClick={() => setDraft({ gender: 'all', clinicStatus: 'all' })}
          >
            Reset
          </Button>
          <Button className="popover-btn" variant="contained" disableElevation onClick={applyFilters}>
            Apply
          </Button>
        </Box>
      </PatientFilterPopover>
    </Box>
  );
}

export default memo(PatientListToolbar);
