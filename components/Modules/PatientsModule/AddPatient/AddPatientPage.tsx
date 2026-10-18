'use client';

import CommonErrorText from '@/components/commons/CommonErrorText/CommonErrorText';
import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomSelect, {
  type TSelectOption,
} from '@/components/ui/CustomSelect/CustomSelect';
import { useDebounce } from '@/hooks/commons/useDebounce';
import {
  useCitiesBySId,
  useCountries,
  useStatesByCId,
} from '@/hooks/react-query/common/common.hooks';
import {
  useCreateNewPatient,
  useGetAllPatients,
  useLinkExistingPatient,
} from '@/hooks/react-query/patients/patients.hooks';
import { PatientsQueryKeys } from '@/hooks/react-query/query.keys';
import {
  appendIfDefined,
  capitalize,
  formatDateToYYYYMMDD,
  getInitials,
} from '@/lib/commons/common.utils';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import {
  AddPatientSchema,
  type TAddPatientSchemaType,
} from '@/lib/schemas/addPatient.schema';
import { projectRoutes } from '@/routes';
import { AddPatientWrapper } from '@/styles/CustomStyled/AddPatientWrapper';
import type { IAllPatientsDoc } from '@/typescripts/interfaces/patients.interfaces';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

type TSelectionMode = 'create_new' | 'existing_user';
type TLocationOption = { id: number | string; name: string };

const genderSelectOptions: TSelectOption[] = ['male', 'female', 'other'].map(
  (gender) => ({ value: gender, label: capitalize(gender) }),
);
const bloodTypeSelectOptions: TSelectOption[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
].map((bloodType) => ({ value: bloodType, label: bloodType }));
const MIN_SEARCH_LENGTH = 3;

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Patients', href: projectRoutes.patients },
  { label: 'Add Patient' },
];

const fieldSize = { xs: 12, sm: 6, md: 4 };

const toLocationOptions = (raw: unknown): TLocationOption[] =>
  Array.isArray(raw)
    ? raw.map((item: { id: number | string; name: string }) => ({
      id: Number(item.id) || item.id,
      name: item.name,
    }))
    : [];

export default function AddPatientPage() {
  const router = useRouter();
  const { userData } = useAuthStore((state) => state);
  const [selectedUser, setSelectedUser] = useState<IAllPatientsDoc | null>(
    null,
  );
  const [userSearch, setUserSearch] = useState('');
  const debouncedUserSearch = useDebounce(userSearch.trim(), 500);
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<TAddPatientSchemaType>({
    resolver: yupResolver(AddPatientSchema),
    mode: 'onBlur',
    defaultValues: {
      selectionMode: 'create_new',
      selected_user_id: null,
      profile_image: undefined,
      name: '',
      email: '',
      phone: '',
      alternate_number: '',
      whatsapp_number: '',
      date_of_birth: new Date(2000, 0, 1),
      gender: '',
      blood_group: '',
      status: 'active',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      medical_history: '',
    },
  });

  const selectionMode = useWatch({ control, name: 'selectionMode' });
  const profileImage = useWatch({ control, name: 'profile_image' });
  const phone = useWatch({ control, name: 'phone' }) || '';
  const countryName = useWatch({ control, name: 'country' }) || '';
  const stateName = useWatch({ control, name: 'state' }) || '';
  const cityName = useWatch({ control, name: 'city' }) || '';
  const isExistingMode = selectionMode === 'existing_user';

  const { data: allPatients, isFetching: isFetchingPatients } =
    useGetAllPatients({
      limit: 100,
      page: 1,
      search:
        debouncedUserSearch.length >= MIN_SEARCH_LENGTH
          ? debouncedUserSearch
          : undefined,
      user_type: isExistingMode ? 'patient' : '',
    });

  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >();
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>();

  const { data: rawCountries, isLoading: loadingCountries } = useCountries();
  const { data: rawStates, isFetching: loadingStates } = useStatesByCId(
    selectedCountryId ? { cId: selectedCountryId } : undefined,
  );
  const { data: rawCities, isFetching: loadingCities } = useCitiesBySId(
    selectedStateId ? { sId: selectedStateId } : undefined,
  );

  const countries = useMemo(
    () => toLocationOptions(rawCountries),
    [rawCountries],
  );
  const states = useMemo(() => toLocationOptions(rawStates), [rawStates]);
  const cities = useMemo(() => toLocationOptions(rawCities), [rawCities]);

  const photoPreview = useMemo(
    () =>
      profileImage instanceof File ? URL.createObjectURL(profileImage) : null,
    [profileImage],
  );

  const patientOptions = useMemo(() => {
    const list = allPatients?.data ?? [];
    if (
      selectedUser &&
      !list.some((option) => String(option.id) === String(selectedUser.id))
    ) {
      return [selectedUser, ...list];
    }
    return list;
  }, [allPatients, selectedUser]);

  useEffect(
    () => () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    },
    [photoPreview],
  );

  const { mutate: createNewPatient, isPending: creatingPatient } =
    useCreateNewPatient();
  const { mutate: linkExistingPatient, isPending: linkingPatient } =
    useLinkExistingPatient();
  const isSubmitting = creatingPatient || linkingPatient;

  const handleSelectionMode = (mode: TSelectionMode) => {
    setValue('selectionMode', mode, { shouldValidate: true });
    setSelectedUser(null);
    setUserSearch('');
    setValue('selected_user_id', null);
    clearErrors();
    if (mode === 'create_new') {
      setValue('name', '');
      setValue('email', '');
      setValue('phone', '');
      setValue('gender', '');
      setValue('date_of_birth', new Date(2000, 0, 1));
    }
  };

  const handlePickUser = (user: IAllPatientsDoc | null) => {
    setSelectedUser(user);
    if (!user) {
      setValue('selected_user_id', null, { shouldValidate: true });
      return;
    }
    setValue('selected_user_id', Number(user.id), { shouldValidate: true });
    setValue('name', user.name || '');
    setValue('email', user.email || '');
    setValue('phone', user.phone_number || '');
    if (user.gender) setValue('gender', user.gender.toLowerCase());
    if (user.date_of_birth) {
      setValue('date_of_birth', new Date(user.date_of_birth));
    }
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showErrorToast('Please select a JPG or PNG image');
      return;
    }
    setValue('profile_image', file, { shouldValidate: true });
  };

  const handleDone = async (res?: {
    success?: boolean | number;
    message?: string;
  }) => {
    if (!res?.success) {
      showErrorToast(res?.message || 'Something went wrong');
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: [PatientsQueryKeys.PatientsList],
    });
    showSuccessToast(
      res.message ||
      (isExistingMode
        ? 'Patient added to your clinic'
        : 'Patient created successfully'),
    );
    router.push(projectRoutes.patients);
  };

  const onSubmit = (formData: TAddPatientSchemaType) => {
    const clinicId = userData?.clinic?.id;
    if (!clinicId) {
      showErrorToast('Clinic not found');
      return;
    }
    if (!userData?.id) return showErrorToast('User not found');

    if (formData.selectionMode === 'existing_user') {
      if (!selectedUser) {
        showErrorToast('Please select an existing user');
        return;
      }
      linkExistingPatient(
        { user_id: selectedUser.id, clinic_id: clinicId },
        { onSuccess: handleDone },
      );
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name?.trim() || '');
    payload.append('phone', formData.phone?.trim() || '');
    payload.append('gender', formData.gender || '');
    payload.append('address', formData.address?.trim() || '');
    payload.append('clinic_id', String(clinicId));

    appendIfDefined(payload, 'email', formData.email);
    appendIfDefined(payload, 'alternate_phone', formData.alternate_number);
    appendIfDefined(payload, 'alternate_number', formData.alternate_number);
    appendIfDefined(payload, 'whatsapp_number', formData.whatsapp_number);
    if (formData.date_of_birth) {
      payload.append(
        'date_of_birth',
        formatDateToYYYYMMDD(formData.date_of_birth),
      );
    }
    appendIfDefined(payload, 'city', formData.city);
    appendIfDefined(payload, 'state', formData.state);
    appendIfDefined(payload, 'postal_code', formData.postal_code);
    appendIfDefined(payload, 'country', formData.country);
    appendIfDefined(payload, 'status', formData.status);
    appendIfDefined(payload, 'medical_history', formData.medical_history);
    if (formData.profile_image instanceof File) {
      payload.append('profile_image', formData.profile_image);
    }

    createNewPatient(payload, { onSuccess: handleDone });
  };

  useEffect(() => {
    if (!selectedCountryId && countryName && countries.length > 0) {
      const found = countries.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase(),
      );
      if (found) setSelectedCountryId(Number(found.id));
    }
  }, [countryName, countries, selectedCountryId]);

  useEffect(() => {
    if (!selectedStateId && stateName && states.length > 0) {
      const found = states.find(
        (s) => s.name.toLowerCase() === stateName.toLowerCase(),
      );
      if (found) setSelectedStateId(Number(found.id));
    }
  }, [stateName, states, selectedStateId]);

  return (
    <AddPatientWrapper>
      <PageBreadcrumb items={breadcrumbItems} />
      <form
        className="add-patient-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="form-card">
          <Grid container spacing={2.5}>
            <Grid size={12} className="is-required">
              <CustomInput
                name="doctor"
                inputLabelName="Assign Doctor"
                value={userData?.name ? `Dr. ${userData.name}` : ''}
                helperText="Doctor is automatically assigned to your account"
                disabled
              />
            </Grid>

            <Grid size={12}>
              <Typography component="p" className="field-label">
                Patient Selection Mode
              </Typography>
              <RadioGroup
                row
                className="radio-group"
                name="selectionMode"
                value={selectionMode}
                onChange={(event) =>
                  handleSelectionMode(event.target.value as TSelectionMode)
                }
              >
                <FormControlLabel
                  value="create_new"
                  control={<Radio size="small" />}
                  label="Create New Patient"
                />
                <FormControlLabel
                  value="existing_user"
                  control={<Radio size="small" />}
                  label="Select Existing User"
                />
              </RadioGroup>
            </Grid>

            {isExistingMode && (
              <>
                <Grid size={12} className="is-required">
                  <CustomAutocomplete<IAllPatientsDoc>
                    name="selected_user_id"
                    inputLabelName="Select User"
                    placeholder="Search users..."
                    startAdornment={<SearchIcon />}
                    options={patientOptions}
                    value={selectedUser}
                    onChange={handlePickUser}
                    onInputChange={(value, reason) => {
                      if (reason !== 'reset') setUserSearch(value);
                    }}
                    getOptionLabel={(option) => option.name || ''}
                    isOptionEqualToValue={(option, value) =>
                      String(option.id) === String(value.id)
                    }
                    noOptionsText={
                      isFetchingPatients
                        ? 'Searching users...'
                        : userSearch.trim().length > 0 &&
                          userSearch.trim().length < MIN_SEARCH_LENGTH
                          ? `Type at least ${MIN_SEARCH_LENGTH} characters`
                          : 'No matching users found'
                    }
                    renderOption={(option) => (
                      <Box className="option-row">
                        <Box component="span" className="option-avatar">
                          {getInitials(option.name || '')}
                        </Box>
                        <Box className="option-copy">
                          <Typography component="span" className="option-title">
                            {option.name}
                            {option.gender ? (
                              <Box component="span" className="option-tag">
                                {option.gender}
                              </Box>
                            ) : null}
                          </Typography>
                          <Typography
                            component="span"
                            className="option-subtitle"
                          >
                            {option.email || option.phone_number}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  />
                  <CommonErrorText message={errors.selected_user_id?.message} />
                </Grid>

                {selectedUser && (
                  <Grid size={12}>
                    <Box className="selected-user">
                      <Box className="selected-user-copy">
                        <Typography
                          component="p"
                          className="selected-user-name"
                        >
                          <strong>Selected:</strong> {selectedUser.name}
                        </Typography>
                        <Typography
                          component="p"
                          className="selected-user-email"
                        >
                          {selectedUser.email || selectedUser.phone_number}
                        </Typography>
                      </Box>
                      <Button
                        type="button"
                        className="clear-btn"
                        variant="outlined"
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={() => handlePickUser(null)}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>

        {isExistingMode && selectedUser && (
          <Box className="form-card summary-card">
            <Box className="card-header">
              <Typography component="h2" className="card-title">
                Patient Summary
              </Typography>
            </Box>
            <Box className="summary-list">
              <Box className="summary-row">
                <Typography component="span" className="summary-label">
                  Name
                </Typography>
                <Typography component="span" className="summary-value">
                  {selectedUser.name}
                </Typography>
              </Box>
              {selectedUser.email ? (
                <Box className="summary-row">
                  <Typography component="span" className="summary-label">
                    Email
                  </Typography>
                  <Typography component="span" className="summary-value">
                    {selectedUser.email}
                  </Typography>
                </Box>
              ) : null}
              {selectedUser.phone_number ? (
                <Box className="summary-row">
                  <Typography component="span" className="summary-label">
                    Phone
                  </Typography>
                  <Typography component="span" className="summary-value">
                    {selectedUser.phone_number}
                  </Typography>
                </Box>
              ) : null}
              {selectedUser.gender ? (
                <Box className="summary-row">
                  <Typography component="span" className="summary-label">
                    Gender
                  </Typography>
                  <Typography component="span" className="summary-value">
                    {capitalize(selectedUser.gender)}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            <Box className="form-note info">
              <InfoOutlinedIcon />
              <Typography component="p">
                All existing data (contact, medical history, address) will be
                used as-is from the database. Only clinic registration is
                needed.
              </Typography>
            </Box>
          </Box>
        )}

        {!isExistingMode && (
          <>
            <Box className="form-card">
              <Box className="card-header">
                <Typography component="h2" className="card-title">
                  Patient information
                </Typography>
                <Typography component="p" className="card-subtitle">
                  Contact details are used for appointment reminders and sharing
                  prescriptions.
                </Typography>
              </Box>

              <Box className="photo-row">
                <IconButton
                  component="label"
                  className="photo-picker"
                  aria-label="Upload profile photo"
                >
                  {photoPreview ? (
                    <Box
                      component="img"
                      src={photoPreview}
                      alt="Profile preview"
                      className="photo-preview"
                    />
                  ) : (
                    <PhotoCameraOutlinedIcon />
                  )}
                  <input
                    hidden
                    type="file"
                    name="profile_image"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoChange}
                  />
                </IconButton>
                <Box className="photo-copy">
                  <Typography component="p" className="photo-title">
                    Profile photo
                  </Typography>
                  <Typography component="p" className="photo-hint">
                    Optional · JPG or PNG
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={fieldSize} className="is-required">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        inputLabelName="Full Name"
                        placeholder="John Doe"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        type="email"
                        inputLabelName="Email Address"
                        placeholder="example@email.com"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize} className="is-required">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        onChange={(event) => field.onChange(event.target.value)}
                        type="tel"
                        inputLabelName="Phone Number"
                        placeholder="9845012345"
                        error={!!errors.phone}
                        helperText={
                          errors.phone?.message ??
                          (phone.length > 0 ? (
                            <Box
                              component="span"
                              className={`phone-hint ${phone.length === 10 ? 'is-valid' : 'is-invalid'}`}
                            >
                              {phone.length === 10
                                ? 'Valid phone number'
                                : `${phone.length}/10 digits`}
                            </Box>
                          ) : undefined)
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize} className="is-required">
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        name={field.name}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        inputLabelName="Gender"
                        placeholder="Select"
                        options={genderSelectOptions}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize}>
                  <Controller
                    name="alternate_number"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        onChange={(event) => field.onChange(event.target.value)}
                        type="tel"
                        inputLabelName="Alternate Phone Number"
                        placeholder="Optional alternate number"
                        error={!!errors.alternate_number}
                        helperText={errors.alternate_number?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize}>
                  <Controller
                    name="date_of_birth"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        name={field.name}
                        onBlur={field.onBlur}
                        type="date"
                        inputLabelName="DOB"
                        value={
                          field.value ? formatDateToYYYYMMDD(field.value) : ''
                        }
                        onChange={(event) =>
                          field.onChange(
                            event.target.value
                              ? dayjs(event.target.value).toDate()
                              : undefined,
                          )
                        }
                        slotProps={{
                          htmlInput: { max: formatDateToYYYYMMDD(new Date()) },
                        }}
                        error={!!errors.date_of_birth}
                        helperText={errors.date_of_birth?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={fieldSize} className="is-required">
                  <Typography component="p" className="field-label">
                    Status
                  </Typography>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        className="radio-group"
                        name={field.name}
                        value={field.value || 'active'}
                        onChange={(event) => field.onChange(event.target.value)}
                      >
                        <FormControlLabel
                          value="active"
                          control={<Radio size="small" />}
                          label="Active"
                        />
                        <FormControlLabel
                          value="inactive"
                          control={<Radio size="small" />}
                          label="Inactive"
                        />
                      </RadioGroup>
                    )}
                  />
                  <CommonErrorText message={errors.status?.message} />
                </Grid>
                <Grid size={fieldSize}>
                  <Controller
                    name="blood_group"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        name={field.name}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        inputLabelName="Blood Type"
                        placeholder="Select Blood Type"
                        options={bloodTypeSelectOptions}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="medical_history"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        multiline
                        minRows={3}
                        inputLabelName="Medical History & Allergies"
                        placeholder="Known medical conditions, allergies, past surgeries, current medications..."
                        helperText="Optional, but helps provide better personalized clinical care."
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-card">
              <Box className="card-header">
                <Typography component="h2" className="card-title">
                  Address Information
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={12} className="is-required">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        inputLabelName="Street Address"
                        placeholder="Enter full street address"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={fieldSize} className="is-required">
                  <CustomAutocomplete<TLocationOption>
                    name="country"
                    inputLabelName="Country"
                    placeholder="Select Country"
                    options={countries}
                    value={
                      countries.find(
                        (country) => country.name === countryName,
                      ) ?? null
                    }
                    disabled={loadingCountries}
                    getOptionLabel={(option) => option.name}
                    onChange={(next) => {
                      setValue('country', next?.name || '', {
                        shouldValidate: true,
                      });
                      setSelectedCountryId(next ? Number(next.id) : undefined);
                      setValue('state', '');
                      setSelectedStateId(undefined);
                      setValue('city', '');
                    }}
                  />
                  <CommonErrorText message={errors.country?.message} />
                </Grid>
                <Grid size={fieldSize}>
                  <CustomAutocomplete<TLocationOption>
                    name="state"
                    inputLabelName="State"
                    placeholder="Select State"
                    options={states}
                    value={
                      states.find((state) => state.name === stateName) ?? null
                    }
                    disabled={!selectedCountryId || loadingStates}
                    getOptionLabel={(option) => option.name}
                    onChange={(next) => {
                      setValue('state', next?.name || '');
                      setSelectedStateId(next ? Number(next.id) : undefined);
                      setValue('city', '');
                    }}
                  />
                </Grid>
                <Grid size={fieldSize}>
                  <CustomAutocomplete<TLocationOption>
                    name="city"
                    inputLabelName="City"
                    placeholder="Select City"
                    options={cities}
                    value={
                      cities.find((city) => city.name === cityName) ?? null
                    }
                    disabled={!selectedStateId || loadingCities}
                    getOptionLabel={(option) => option.name}
                    onChange={(next) => setValue('city', next?.name || '')}
                  />
                </Grid>
                <Grid size={fieldSize}>
                  <Controller
                    name="postal_code"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ''}
                        onChange={(event) => field.onChange(event.target.value)}
                        inputLabelName="Postal Code"
                        placeholder="560001"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-note info">
              <InfoOutlinedIcon />
              <Typography component="p">
                <strong>Note:</strong> A secure password will be generated
                automatically and emailed to the patient.
              </Typography>
            </Box>
          </>
        )}

        {isExistingMode && (
          <Box className="form-note warning">
            <WarningAmberIcon />
            <Typography component="p">
              <strong>Note:</strong> This will assign the selected user as a
              patient to your clinic. They will receive an email notification.
            </Typography>
          </Box>
        )}

        <Box className="form-footer">
          <Button
            component={Link}
            href={projectRoutes.patients}
            className="footer-btn cancel-btn"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="footer-btn submit-btn"
            variant="contained"
            disableElevation
            disabled={isSubmitting || (isExistingMode && !selectedUser)}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {isExistingMode ? 'Assign as Patient' : 'Add New Patient'}
          </Button>
        </Box>
      </form>
    </AddPatientWrapper>
  );
}
