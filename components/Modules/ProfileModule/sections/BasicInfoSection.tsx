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
import {
  UpdateDoctorProfileSchema,
  type TProfileLocationOption,
  type TUpdateDoctorProfileSchemaType,
} from '@/lib/schemas/updateProfile.schema';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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
  const { userData } = useAuthStore((state) => state);
  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >();
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TUpdateDoctorProfileSchemaType>({
    resolver: yupResolver(UpdateDoctorProfileSchema),
    defaultValues: {
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
  const { mutate: updateProfile, isPending: updatingProfile } =
    useUpdateDocProfile();

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

  const onSubmit = (data: TUpdateDoctorProfileSchemaType) => {
    const formData = new FormData();
    formData.append('street', data.street);
    formData.append('postalCode', data.postalCode);
    formData.append('aboutMe', data.aboutMe);
    formData.append('country', data.country?.name || '');
    formData.append('state', data.state?.name || '');
    formData.append('city', data.city?.name || '');
    updateProfile(formData);
  };

  useEffect(() => {
    if (userData) {
      setValue('street', userData.address || '');
      setValue('postalCode', userData.postal_code || '');
      setValue('aboutMe', userData.bio || '');
      setValue('country', { id: userData.country, name: userData.country });
      setValue('state', { id: userData.state, name: userData.state });
      setValue('city', { id: userData.city, name: userData.city });
    }
  }, [userData, setValue]);

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
          Update Doctor Profile
        </Button>
      </Box>
    </form>
  );
}
