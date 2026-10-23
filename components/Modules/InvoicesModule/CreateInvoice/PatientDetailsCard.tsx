'use client';

import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import { useMyPatientInfiniteList } from '@/hooks/react-query/patients/patients.hooks';
import { getInitials } from '@/lib/commons/common.utils';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Typography } from '@mui/material';
import { memo, useMemo, useState } from 'react';

interface PatientDetailsCardProps {
  patientId?: string;
  selectedPatient: IMyPatientDoc | null;
  onSelectPatient: (patient: IMyPatientDoc | null) => void;
  error?: string;
}

function PatientDetailsCard({
  patientId,
  selectedPatient,
  onSelectPatient,
  error,
}: PatientDetailsCardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: patientsData,
    isLoading: isPatientsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyPatientInfiniteList(
    {
      search: searchTerm.trim() || undefined,
      limit: 15,
      patient_id: Number(patientId),
    },
    { enabled: !selectedPatient },
  );

  const patientOptions = useMemo(() => {
    if (!patientsData?.pages) return [];
    return patientsData.pages.flatMap((page) => page.data || []);
  }, [patientsData]);

  const handleClearPatient = () => {
    onSelectPatient(null);
    setSearchTerm('');
  };

  const patientAddress = useMemo(() => {
    if (!selectedPatient) return '';
    return [
      selectedPatient.address,
      selectedPatient.city,
      selectedPatient.state,
    ]
      .filter(Boolean)
      .join(', ');
  }, [selectedPatient]);

  return (
    <Box className="invoice-card">
      <Box className="card-header-row">
        <Typography component="h3" className="card-title">
          Patient Details
        </Typography>
      </Box>

      {!selectedPatient ? (
        <Box>
          <CustomAutocomplete<IMyPatientDoc>
            name="patient_search"
            placeholder="Search by name, phone, or email..."
            options={patientOptions}
            value={null}
            onChange={(val) => {
              if (val) {
                onSelectPatient(val);
                setSearchTerm('');
              }
            }}
            onInputChange={(val, reason) => {
              if (reason === 'input') {
                setSearchTerm(val);
              }
              if (reason === 'clear') {
                setSearchTerm('');
              }
            }}
            getOptionLabel={(opt) =>
              `${opt.name || ''} ${opt.patient_id ? `(${opt.patient_id})` : ''}`.trim()
            }
            isOptionEqualToValue={(opt, val) =>
              String(opt.id) === String(val.id)
            }
            loading={isPatientsLoading}
            loadingText="Searching patients..."
            hasMore={hasNextPage}
            loadingMore={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            noOptionsText="No patients found"
            startAdornment={<SearchIcon />}
            renderOption={(opt) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  py: 0.5,
                }}
              >
                <Avatar
                  src={opt.profile_image || undefined}
                  sx={{ width: 32, height: 32, fontSize: '12px' }}
                >
                  {getInitials(opt.name || '')}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                    {opt.name}{' '}
                    {opt.patient_id ? (
                      <Box
                        component="span"
                        sx={{ fontSize: '11px', color: 'text.secondary' }}
                      >
                        #{opt.patient_id}
                      </Box>
                    ) : null}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '11px', color: 'text.secondary' }}
                  >
                    {[opt.phone_number, opt.email].filter(Boolean).join(' • ')}
                  </Typography>
                </Box>
              </Box>
            )}
          />
          {error ? (
            <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5 }}>
              {error}
            </Typography>
          ) : null}
        </Box>
      ) : (
        <Box className="patient-selected-box">
          <Box className="patient-header-line">
            <Box className="patient-name-id">
              <span>{selectedPatient.name}</span>
              {selectedPatient.patient_id ? (
                <span className="patient-code">
                  #{selectedPatient.patient_id}
                </span>
              ) : null}
            </Box>
            <Box
              component="span"
              className="clear-patient-btn"
              onClick={handleClearPatient}
              title="Remove patient"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>

          <Box className="patient-details-line">
            {selectedPatient.phone_number ? (
              <span className="detail-item">
                <PhoneOutlinedIcon />
                {selectedPatient.phone_number}
              </span>
            ) : null}
            {selectedPatient.email ? (
              <span className="detail-item">
                <EmailOutlinedIcon />
                {selectedPatient.email}
              </span>
            ) : null}
            {selectedPatient.age_display ? (
              <span className="detail-item">
                <CalendarMonthOutlinedIcon />
                {selectedPatient.age_display}
              </span>
            ) : null}
            {selectedPatient.gender_display || selectedPatient.gender ? (
              <span className="detail-item">
                <PersonOutlineOutlinedIcon />
                {selectedPatient.gender_display || selectedPatient.gender}
              </span>
            ) : null}
            {patientAddress ? (
              <span className="detail-item">
                <LocationOnOutlinedIcon />
                {patientAddress}
              </span>
            ) : null}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default memo(PatientDetailsCard);
