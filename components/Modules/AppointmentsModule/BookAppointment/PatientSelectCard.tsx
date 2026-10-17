'use client';

import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import { getInitials } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import AddIcon from '@mui/icons-material/Add';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';

type PatientSelectCardProps = {
  options: IMyPatientDoc[];
  selectedPatient: IMyPatientDoc | null;
  onSelect: (patient: IMyPatientDoc | null) => void;
  onSearchChange: (value: string) => void;
  loading?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
};

const samePatient = (option: IMyPatientDoc, value: IMyPatientDoc) =>
  String(option.id) === String(value.id);

export default function PatientSelectCard({
  options,
  selectedPatient,
  onSelect,
  onSearchChange,
  loading = false,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
}: PatientSelectCardProps) {
  return (
    <>
      <Box className="book-card">
        <Typography component="h3" className="card-title required">
          Select Patient
        </Typography>
        <CustomAutocomplete<IMyPatientDoc>
          name="patient"
          placeholder="Search patient by name, ID or phone"
          options={options}
          value={selectedPatient}
          onChange={(patient) => {
            onSearchChange('');
            onSelect(patient);
          }}
          onInputChange={(value, reason) => {
            if (reason === 'input') onSearchChange(value);
            if (reason === 'clear') onSearchChange('');
          }}
          startAdornment={<SearchIcon />}
          getOptionLabel={(option) => option.name || ''}
          isOptionEqualToValue={samePatient}
          loading={loading}
          loadingText="Searching patients..."
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={onLoadMore}
          noOptionsText="No patients found"
          renderOption={(option) => {
            const profile = [
              option.gender_display || option.gender,
              option.age_display,
            ]
              .filter(Boolean)
              .join(', ');
            return (
              <Box className="patient-option">
                <Avatar
                  className="patient-option-avatar"
                  src={option.profile_image || undefined}
                  alt={option.name}
                >
                  {getInitials(option.name || '')}
                </Avatar>
                <Box className="patient-option-copy">
                  <Box className="patient-option-head">
                    <Typography component="span" className="patient-option-name">
                      {option.name}
                    </Typography>
                    {option.patient_id ? (
                      <Box component="span" className="patient-option-id">
                        {option.patient_id}
                      </Box>
                    ) : null}
                  </Box>
                  <Box component="span" className="patient-option-meta">
                    {profile ? (
                      <span className="patient-option-profile">{profile}</span>
                    ) : null}
                    {option.phone_number ? (
                      <span>
                        <PhoneOutlinedIcon />
                        {option.phone_number}
                      </span>
                    ) : null}
                    {option.email ? (
                      <span className="patient-option-email">
                        <MailOutlinedIcon />
                        {option.email}
                      </span>
                    ) : null}
                  </Box>
                </Box>
                <CheckRoundedIcon className="patient-option-check" />
              </Box>
            );
          }}
        />
        <Box className="patient-search-foot">
          <Link className="card-link" href={projectRoutes.addPatient}>
            <AddIcon fontSize="inherit" />
            Add New Patient
          </Link>
        </Box>

        {selectedPatient ? (
          <SelectedPatientPanel patient={selectedPatient} />
        ) : null}
      </Box>
    </>
  );
}

function SelectedPatientPanel({ patient }: { patient: IMyPatientDoc }) {
  const profile = [
    patient.gender_display || patient.gender,
    patient.age_display,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Box className="selected-panel">
      <Avatar
        className="selected-avatar"
        src={patient.profile_image || undefined}
        alt={patient.name}
      >
        {getInitials(patient.name || '')}
      </Avatar>

      <Box className="selected-copy">
        <Box className="selected-title-row">
          <Typography component="p" className="selected-name">
            {patient.name}
          </Typography>
          {patient.patient_id ? (
            <Box component="span" className="selected-id">
              {patient.patient_id}
            </Box>
          ) : null}
        </Box>

        <Box className="selected-meta">
          {profile ? <span className="selected-profile">{profile}</span> : null}
          {patient.phone_number ? (
            <span>
              <PhoneOutlinedIcon />
              {patient.phone_number}
            </span>
          ) : null}
          {patient.email ? (
            <span>
              <MailOutlinedIcon />
              {patient.email}
            </span>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
