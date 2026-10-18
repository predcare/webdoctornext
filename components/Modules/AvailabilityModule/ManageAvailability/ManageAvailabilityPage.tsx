'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AvailabilityCalendar from '@/components/Modules/AvailabilityModule/ManageAvailability/AvailabilityCalendar';
import AvailabilityFormFields from '@/components/Modules/AvailabilityModule/ManageAvailability/AvailabilityFormFields';
import RecurringDaysFields from '@/components/Modules/AvailabilityModule/ManageAvailability/RecurringDaysFields';
import ManageAvailabilitySkeleton from '@/components/Modules/AvailabilityModule/ManageAvailability/Skeletons/ManageAvailabilitySkeleton';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import {
  useCreateAvailability,
  useGetAvailabilityById,
  useUpdateAvailability,
} from '@/hooks/react-query/availability/availablity.hooks';
import { AvailbilityQueryKeys } from '@/hooks/react-query/query.keys';
import {
  buildAvailabilityPayload,
  defaultAvailabilityFormValues,
  mapAvailabilityToFormValues,
  type TimeValue,
} from '@/lib/commons/availability.utils';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import {
  AvailabilityFormSchema,
  type TAvailabilityFormValues,
} from '@/lib/schemas/availability.schema';
import { projectRoutes } from '@/routes';
import { ManageAvailabilityWrapper } from '@/styles/CustomStyled/ManageAvailabilityWrapper';
import type { ICommonRoot } from '@/typescripts/interfaces/common.interfaces';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BreadcrumbItems } from '../constants/availability.constants';

type SlotMode = TAvailabilityFormValues['editorTab'];

const modes: { id: SlotMode; label: string }[] = [
  { id: 'specific', label: 'Specific Date' },
  { id: 'recurring', label: 'Recurring Days' },
  { id: 'leave', label: 'Leave' },
];

const fieldOptions = { shouldValidate: true, shouldDirty: true };

const toggleValue = (items: string[], value: string) =>
  items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];

type ManageAvailabilityPageProps = {
  availabilityId?: string;
};

export default function ManageAvailabilityPage({
  availabilityId,
}: ManageAvailabilityPageProps) {
  const router = useRouter();
  const isEditing = Boolean(availabilityId);
  const { userData } = useAuthStore((state) => state);
  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const prefilledId = useRef<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TAvailabilityFormValues>({
    resolver: yupResolver(AvailabilityFormSchema),
    defaultValues: defaultAvailabilityFormValues,
  });

  const { mutate: createAvailability, isPending: isCreatePending } =
    useCreateAvailability();
  const { mutate: updateAvailability, isPending: isUpdatePending } =
    useUpdateAvailability();
  const { data: availability, isPending: isLoadingAvailability } =
    useGetAvailabilityById(availabilityId);
  const isSubmitting = isCreatePending || isUpdatePending;
  const editingSlot = isEditing ? (availability ?? null) : null;

  const activeTab = useWatch({ control, name: 'editorTab' }) || 'specific';
  const selectedDates = useWatch({ control, name: 'selectedDates' }) || [];
  const recurringDays = useWatch({ control, name: 'recurringDays' }) || [];
  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });
  const leaveDates = useWatch({ control, name: 'leaveDates' }) || [];
  const fromTime =
    useWatch({ control, name: 'fromTime' }) ||
    defaultAvailabilityFormValues.fromTime;
  const toTime =
    useWatch({ control, name: 'toTime' }) ||
    defaultAvailabilityFormValues.toTime;
  const consultationType =
    useWatch({ control, name: 'consultationType' }) || 'in-person';
  const slotDuration = useWatch({ control, name: 'slotDuration' }) ?? 30;
  const inPersonFee = useWatch({ control, name: 'inPersonFee' }) || '';
  const videoFee = useWatch({ control, name: 'videoFee' }) || '';
  const hideFee = useWatch({ control, name: 'hideFee' }) ?? false;
  const requirePayment = useWatch({ control, name: 'requirePayment' }) ?? false;

  const handleDone = async (res?: ICommonRoot) => {
    if (!res?.success) {
      hideLoader();
      return;
    }
    showSuccessToast(
      res.message ||
      (isEditing
        ? 'Availability updated successfully'
        : 'Availability added successfully'),
    );
    await queryClient.invalidateQueries({
      queryKey: [AvailbilityQueryKeys.GetAvailablity],
    });
    if (availabilityId) {
      await queryClient.invalidateQueries({
        queryKey: [AvailbilityQueryKeys.GetAvailabilityById, availabilityId],
      });
    }
    hideLoader();
    router.replace(projectRoutes.availability);
  };

  const onSubmit = (data: TAvailabilityFormValues) => {
    if (!userData?.id) {
      showErrorToast('Doctor information not found. Please log in again.');
      return;
    }

    const body = buildAvailabilityPayload(data, {
      clinicId: userData?.clinic?.id,
      editingSlot,
    });

    if (isEditing) {
      if (!editingSlot?.id) return;
      showLoader('Updating...');
      updateAvailability(
        { id: editingSlot.id, body },
        { onSuccess: handleDone, onError: () => hideLoader() },
      );
      return;
    }

    showLoader('Adding...');
    createAvailability(
      { body },
      { onSuccess: handleDone, onError: () => hideLoader() },
    );
  };

  const handleToggleDate = (iso: string) => {
    if (activeTab === 'leave') {
      setValue('leaveDates', toggleValue(leaveDates, iso), fieldOptions);
      return;
    }
    setValue('selectedDates', toggleValue(selectedDates, iso), fieldOptions);
  };

  const handleTimeChange =
    (field: 'fromTime' | 'toTime', current: TimeValue) =>
      (patch: Partial<TimeValue>) =>
        setValue(field, { ...current, ...patch }, fieldOptions);

  useLayoutEffect(() => {
    if (!editingSlot || prefilledId.current === String(editingSlot.id)) return;
    prefilledId.current = String(editingSlot.id);
    reset(mapAvailabilityToFormValues(editingSlot));
  }, [editingSlot, reset]);

  useEffect(() => {
    if (!isEditing || isLoadingAvailability || editingSlot) return;
    if (prefilledId.current === 'missing') return;
    prefilledId.current = 'missing';
    showErrorToast('Availability not found');
    router.replace(projectRoutes.availability);
  }, [isEditing, isLoadingAvailability, editingSlot, router]);

  const breadcrumb = (
    <PageBreadcrumb
      items={BreadcrumbItems}
      action={
        <Button
          className="page-action"
          variant="outlined"
          type="button"
          onClick={() => router.replace(projectRoutes.availability)}
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Back to List
        </Button>
      }
    />
  );

  if (!isEditing && editingSlot) {
    return (
      <ManageAvailabilityWrapper>
        {breadcrumb}
        <ManageAvailabilitySkeleton />
      </ManageAvailabilityWrapper>
    );
  }

  return (
    <ManageAvailabilityWrapper>
      {breadcrumb}
      <Box className="form-card">
        <Typography component="p" className="card-title">
          Availability Slot
        </Typography>
        <Box
          className="mode-switch"
          role="tablist"
          aria-label="Availability slot mode"
        >
          {modes.map((mode) => (
            <Box
              key={mode.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={activeTab === mode.id}
              className={`mode-btn${activeTab === mode.id ? ' active' : ''}`}
              onClick={() => setValue('editorTab', mode.id, fieldOptions)}
            >
              {mode.label}
            </Box>
          ))}
        </Box>

        {activeTab === 'recurring' ? (
          <RecurringDaysFields
            weekdays={recurringDays}
            startDate={startDate ?? ''}
            endDate={endDate ?? ''}
            dayError={errors.recurringDays?.message}
            startDateError={errors.startDate?.message}
            endDateError={errors.endDate?.message}
            onToggleDay={(day) =>
              setValue(
                'recurringDays',
                toggleValue(recurringDays, day),
                fieldOptions,
              )
            }
            onStartChange={(value) =>
              setValue('startDate', value || null, fieldOptions)
            }
            onEndChange={(value) =>
              setValue('endDate', value || null, fieldOptions)
            }
          />
        ) : (
          <AvailabilityCalendar
            mode={activeTab}
            selectedDates={selectedDates}
            leaveDates={leaveDates}
            error={
              activeTab === 'leave'
                ? errors.leaveDates?.message
                : errors.selectedDates?.message
            }
            disablePastDates
            onToggleDate={handleToggleDate}
          />
        )}
      </Box>

      <AvailabilityFormFields
        from={fromTime}
        to={toTime}
        consultationType={consultationType}
        duration={slotDuration}
        inPersonFee={inPersonFee}
        videoFee={videoFee}
        hideFee={hideFee}
        requirePayment={requirePayment}
        timeError={errors.fromTime?.message || errors.toTime?.message}
        durationError={errors.slotDuration?.message}
        inPersonFeeError={errors.inPersonFee?.message}
        videoFeeError={errors.videoFee?.message}
        onFromChange={handleTimeChange('fromTime', fromTime)}
        onToChange={handleTimeChange('toTime', toTime)}
        onConsultationChange={(value) =>
          setValue('consultationType', value, fieldOptions)
        }
        onDurationChange={(value) =>
          setValue('slotDuration', value, fieldOptions)
        }
        onInPersonFeeChange={(value) =>
          setValue('inPersonFee', value, fieldOptions)
        }
        onVideoFeeChange={(value) => setValue('videoFee', value, fieldOptions)}
        onHideFeeChange={(value) => {
          setValue('hideFee', value, fieldOptions);
          if (value) setValue('requirePayment', false, fieldOptions);
        }}
        onRequirePaymentChange={(value) => {
          setValue('requirePayment', value, fieldOptions);
          if (value) setValue('hideFee', false, fieldOptions);
        }}
      />

      <Box className="form-footer">
        <Button
          className="footer-btn"
          variant="outlined"
          onClick={() => router.replace(projectRoutes.availability)}
        >
          Cancel
        </Button>
        <Button
          className="footer-btn save-btn"
          variant="contained"
          disableElevation
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </Box>
    </ManageAvailabilityWrapper>
  );
}
