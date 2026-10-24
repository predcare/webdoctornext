'use client';

import CommonErrorText from '@/components/commons/CommonErrorText/CommonErrorText';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  useCitiesBySId,
  useCountries,
  useStatesByCId,
} from '@/hooks/react-query/common/common.hooks';
import { useUpdateDocProfile } from '@/hooks/react-query/profile/profile.hooks';
import { ProfileQueryKeys } from '@/hooks/react-query/query.keys';
import { getInitials } from '@/lib/commons/common.utils';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import {
  UpdateDoctorProfileSchema,
  type TProfileLocationOption,
  type TUpdateDoctorProfileSchemaType,
} from '@/lib/schemas/updateProfile.schema';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

const locationLabel = (option: TProfileLocationOption) => option.name;

const sameLocation = (
  option: TProfileLocationOption,
  value: TProfileLocationOption,
) => String(option.id) === String(value.id);

const toLocationId = (id?: string | number | null) => {
  if (id == null || id === '') return undefined;
  const numericId = Number(id);
  return Number.isFinite(numericId) ? numericId : undefined;
};

const findLocation = (options: TProfileLocationOption[], name?: string) =>
  options.find(
    (option) => option.name.toLowerCase() === name?.trim().toLowerCase(),
  );

export default function BasicInfoSection() {
  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >();
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { userData } = useAuthStore((state) => state);
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending: updatingProfile } =
    useUpdateDocProfile();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUpdateDoctorProfileSchemaType>({
    resolver: yupResolver(UpdateDoctorProfileSchema),
    defaultValues: {
      profile_image: null,
      street: userData?.address || '',
      postalCode: userData?.postal_code || '',
      aboutMe: userData?.bio || '',
      country: null,
      state: null,
      city: null,
    },
  });

  const countryName = useWatch({ control, name: 'country' });
  const stateName = useWatch({ control, name: 'state' });

  const { data: rawCountries, isLoading: loadingCountries } = useCountries();
  const { data: rawStates, isFetching: loadingStates } = useStatesByCId(
    selectedCountryId ? { cId: selectedCountryId } : undefined,
  );
  const { data: rawCities, isFetching: loadingCities } = useCitiesBySId(
    selectedStateId ? { sId: selectedStateId } : undefined,
  );

  const countries = useMemo(() => {
    if (!Array.isArray(rawCountries)) return [];
    return rawCountries.map((c: any) => ({
      id: Number(c.id) || c.id,
      name: c.name,
    }));
  }, [rawCountries]);

  const states = useMemo(() => {
    if (!Array.isArray(rawStates)) return [];
    return rawStates.map((s: any) => ({
      id: Number(s.id) || s.id,
      name: s.name,
    }));
  }, [rawStates]);

  const cities = useMemo(() => {
    if (!Array.isArray(rawCities)) return [];
    return rawCities.map((c: any) => ({
      id: Number(c.id) || c.id,
      name: c.name,
    }));
  }, [rawCities]);

  const doctorInitials = useMemo(() => {
    return getInitials(userData?.name || '');
  }, [userData?.name]);

  const avatarSrc = useMemo(() => {
    if (photoPreview) return photoPreview;
    if (userData?.profile_image) return userData.profile_image;
    return undefined;
  }, [photoPreview, userData?.profile_image]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showErrorToast('Please select a JPG, PNG, or WEBP image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showErrorToast('Image size should be less than 5MB');
      return;
    }

    setPhotoFile(file);
    setValue('profile_image', file, { shouldValidate: true });

    const preview = URL.createObjectURL(file);
    setPhotoPreview(preview);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue('profile_image', null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: TUpdateDoctorProfileSchemaType) => {
    const formData = new FormData();
    if (photoFile instanceof File) {
      formData.append('profile_image', photoFile);
    }
    formData.append('address', data.street);
    formData.append('postalCode', data.postalCode);
    formData.append('bio', data.aboutMe);
    formData.append('country', data.country?.name || '');
    formData.append('state', data.state?.name || '');
    formData.append('city', data.city?.name || '');

    updateProfile(formData, {
      async onSuccess(res) {
        if (res?.success) {
          showSuccessToast(res?.message || 'Profile updated successfully');
          await queryClient.invalidateQueries({
            queryKey: [ProfileQueryKeys.Profile],
          });
        }
      },
    });
  };
  useEffect(() => {
    if (userData) {
      setValue('street', userData.address || '');
      setValue('postalCode', userData.postal_code || '');
      setValue('aboutMe', userData.bio || '');
      setValue('country', { id: userData.country, name: userData.country });
      setValue('state', { id: userData.state, name: userData.state });
      setValue('city', { id: userData.city, name: userData.city });
      setValue('profile_image', userData.profile_image);
      setPhotoPreview(userData.profile_image || null);
    }
  }, [userData, setValue, setPhotoPreview]);

  useEffect(() => {
    if (countryName && countries.length > 0) {
      const found = findLocation(countries, countryName.name);
      const countryId = toLocationId(found?.id);
      if (countryId) {
        setSelectedCountryId(countryId);
      }
    }
  }, [countryName, countries]);

  useEffect(() => {
    if (stateName && states.length > 0) {
      const found = findLocation(states, stateName.name);
      const stateId = toLocationId(found?.id);
      if (stateId) {
        setSelectedStateId(stateId);
      }
    }
  }, [stateName, states]);

  return (
    <form
      className="section-stack"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box className="form-card">
        <Typography component="h2" className="card-title">
          Profile Photo
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2.5,
            pt: 0.5,
          }}
        >
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar
              src={avatarSrc}
              alt={userData?.name || 'Doctor'}
              sx={{
                width: 88,
                height: 88,
                borderRadius: '20px',
                fontSize: 28,
                fontWeight: 700,
                bgcolor: (theme) => theme.palette.customColors.brandTeal,
                color: (theme) => theme.palette.common.white,
                boxShadow: (theme) =>
                  `0 8px 20px ${theme.palette.customColors.brandTealGlow}`,
                border: (theme) =>
                  `2px solid ${theme.palette.customColors.border}`,
              }}
            >
              {doctorInitials}
            </Avatar>
            <Box
              component="label"
              htmlFor="doctor-profile-image-input"
              sx={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: (theme) => theme.palette.customColors.brandTeal,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                transition: 'transform 0.15s ease, background-color 0.15s ease',
                '&:hover': {
                  transform: 'scale(1.08)',
                  bgcolor: (theme) => theme.palette.customColors.brandTealDark,
                },
              }}
              title="Upload new photo"
            >
              <PhotoCameraOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: (theme) => theme.palette.customColors.heading,
              }}
            >
              Upload Profile Image
            </Typography>
            <Typography
              component="p"
              className="card-subtitle"
              sx={{ margin: 0, fontSize: 13 }}
            >
              JPG, PNG, or WEBP up to 5MB. A clear portrait is recommended.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
                mt: 0.5,
              }}
            >
              <Button
                component="label"
                htmlFor="doctor-profile-image-input"
                variant="outlined"
                size="small"
                startIcon={<PhotoCameraOutlinedIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderColor: (theme) => theme.palette.customColors.brandTeal,
                  color: (theme) => theme.palette.customColors.brandTeal,
                  '&:hover': {
                    borderColor: (theme) =>
                      theme.palette.customColors.brandTealDark,
                    bgcolor: (theme) =>
                      theme.palette.customColors.brandTealLight,
                  },
                }}
              >
                {photoFile ? 'Change Photo' : 'Upload Photo'}
              </Button>
              <input
                id="doctor-profile-image-input"
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handlePhotoChange}
              />

              {photoFile && (
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={handleRemovePhoto}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                  }}
                >
                  Remove Selection
                </Button>
              )}

              {photoFile && (
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) => theme.palette.customColors.textMuted,
                    fontStyle: 'italic',
                  }}
                >
                  {photoFile.name} ({(photoFile.size / (1024 * 1024)).toFixed(2)}{' '}
                  MB)
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="form-card">
        <Typography component="h2" className="card-title">
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  multiline
                  minRows={2}
                  inputLabelName="Street Address"
                  error={Boolean(errors.street)}
                  helperText={errors.street?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CustomAutocomplete<TProfileLocationOption>
                  name={field.name}
                  inputLabelName="Country"
                  placeholder="Select Country"
                  options={countries}
                  value={field.value}
                  disabled={loadingCountries}
                  getOptionLabel={locationLabel}
                  isOptionEqualToValue={sameLocation}
                  onChange={(next) => {
                    field.onChange(next);
                    setSelectedCountryId(toLocationId(next?.id));
                    setSelectedStateId(undefined);
                    setValue('state', null);
                    setValue('city', null);
                  }}
                />
              )}
            />
            <CommonErrorText message={errors.country?.message || ''} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <CustomAutocomplete<TProfileLocationOption>
                  name={field.name}
                  inputLabelName="State"
                  placeholder="Select State"
                  options={states}
                  value={field.value}
                  disabled={!selectedCountryId || loadingStates}
                  getOptionLabel={locationLabel}
                  isOptionEqualToValue={sameLocation}
                  onChange={(next) => {
                    field.onChange(next);
                    setSelectedStateId(toLocationId(next?.id));
                    setValue('city', null);
                  }}
                />
              )}
            />
            <CommonErrorText message={errors.state?.message || ''} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CustomAutocomplete<TProfileLocationOption>
                  name={field.name}
                  inputLabelName="City"
                  placeholder="Select City"
                  options={cities}
                  value={field.value}
                  disabled={!selectedStateId || loadingCities}
                  getOptionLabel={locationLabel}
                  isOptionEqualToValue={sameLocation}
                  onChange={field.onChange}
                />
              )}
            />
            <CommonErrorText message={errors.city?.message || ''} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputLabelName="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <Box className="form-card">
        <Typography component="h2" className="card-title">
          About Me
        </Typography>
        <Controller
          name="aboutMe"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              multiline
              minRows={3}
              error={Boolean(errors.aboutMe)}
              helperText={errors.aboutMe?.message}
            />
          )}
        />
      </Box>

      <Box className="form-actions is-end">
        <Button
          type="submit"
          variant="contained"
          disableElevation
          className="save-btn"
          disabled={updatingProfile}
        >
          {updatingProfile ? 'Updating Profile...' : 'Update Doctor Profile'}
        </Button>
      </Box>
    </form>
  );
}
