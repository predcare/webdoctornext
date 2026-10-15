'use client';

import {
  activeAvailabilityFilterCount,
  consultationOptions,
  dateModeOptions,
  type AvailabilityFilterState,
  type ConsultationFilter,
  type DateModeFilter,
} from '@/components/Modules/AvailabilityModule/availabilityFilters';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { availabilityDoctors } from '@/resources/mock/availability';
import { projectRoutes } from '@/routes';
import { AvailabilityFilterPopover } from '@/styles/CustomStyled/AvailabilityListWrapper';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import {
  Badge,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { memo, useState, type MouseEvent } from 'react';

type DraftFilters = Pick<AvailabilityFilterState, 'dateMode' | 'consultation'>;

type AvailabilityToolbarProps = {
  filters: AvailabilityFilterState;
  onChange: (patch: Partial<AvailabilityFilterState>) => void;
  onClear: () => void;
};

function AvailabilityToolbar({
  filters,
  onChange,
  onClear,
}: AvailabilityToolbarProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState<DraftFilters>({
    dateMode: 'all',
    consultation: 'all',
  });
  const activeCount = activeAvailabilityFilterCount(filters);

  const openFilters = (event: MouseEvent<HTMLButtonElement>) => {
    setDraft({
      dateMode: filters.dateMode,
      consultation: filters.consultation,
    });
    setAnchor(event.currentTarget);
  };

  const applyFilters = () => {
    onChange(draft);
    setAnchor(null);
  };

  return (
    <Box className="list-actions">
      <Select
        className="doctor-select"
        size="small"
        value={filters.doctorId}
        onChange={(event) => onChange({ doctorId: event.target.value })}
        renderValue={(value) => {
          const doctor = availabilityDoctors.find(
            (item: any) => item.id === value,
          );
          return (
            <Box
              component="span"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
            >
              <PersonOutlineIcon className="doctor-select-icon" />
              {doctor?.name ?? 'All doctors'}
            </Box>
          );
        }}
      >
        <MenuItem value="all">All doctors</MenuItem>
        {availabilityDoctors.map((doctor: any) => (
          <MenuItem key={doctor.id} value={doctor.id}>
            {doctor.name}
          </MenuItem>
        ))}
      </Select>

      <Badge
        className="filter-badge"
        badgeContent={activeCount}
        color="primary"
        invisible={activeCount === 0}
      >
        <Button
          className={`filter-btn${activeCount ? ' active' : ''}`}
          variant="outlined"
          startIcon={<FilterListIcon fontSize="small" />}
          onClick={openFilters}
        >
          Filters
        </Button>
      </Badge>

      <CustomButton
        className="add-availability"
        text="+ Add Availability"
        action={projectRoutes.manageAvailability}
      />

      <AvailabilityFilterPopover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box className="popover-section">
          <Typography component="p" className="popover-label">
            Date Mode
          </Typography>
          <Box className="popover-chips">
            {dateModeOptions.map((option) => (
              <Chip
                key={option.value}
                className={`popover-chip${draft.dateMode === option.value ? ' selected' : ''}`}
                label={option.label}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    dateMode: option.value as DateModeFilter,
                  }))
                }
              />
            ))}
          </Box>
        </Box>

        <Box className="popover-section">
          <Typography component="p" className="popover-label">
            Consultation Type
          </Typography>
          <Box className="popover-chips">
            {consultationOptions.map((option) => (
              <Chip
                key={option.value}
                className={`popover-chip${draft.consultation === option.value ? ' selected' : ''}`}
                label={option.label}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    consultation: option.value as ConsultationFilter,
                  }))
                }
              />
            ))}
          </Box>
        </Box>

        <Box className="popover-footer">
          <Button
            className="popover-btn"
            variant="outlined"
            onClick={() => setDraft({ dateMode: 'all', consultation: 'all' })}
          >
            Reset
          </Button>
          <Button
            className="popover-btn"
            variant="contained"
            disableElevation
            onClick={applyFilters}
          >
            Apply
          </Button>
        </Box>
      </AvailabilityFilterPopover>
    </Box>
  );
}

export default memo(AvailabilityToolbar);

export function AvailabilityActiveFilters({
  filters,
  onChange,
  onClear,
}: AvailabilityToolbarProps) {
  const dateModeLabel = dateModeOptions.find(
    (option) => option.value === filters.dateMode,
  )?.label;
  const consultationLabel = consultationOptions.find(
    (option) => option.value === filters.consultation,
  )?.label;

  return (
    <Box className="active-filters">
      {filters.dateMode !== 'all' ? (
        <Chip
          className="active-chip"
          size="small"
          label={`Date Mode: ${dateModeLabel}`}
          onDelete={() => onChange({ dateMode: 'all' })}
        />
      ) : null}
      {filters.consultation !== 'all' ? (
        <Chip
          className="active-chip"
          size="small"
          label={`Consultation: ${consultationLabel}`}
          onDelete={() => onChange({ consultation: 'all' })}
        />
      ) : null}
      <Button className="clear-all" size="small" onClick={onClear}>
        Clear all
      </Button>
    </Box>
  );
}
