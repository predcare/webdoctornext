'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { useDebounce } from '@/hooks/commons/useDebounce';
import {
  useMyAppointmentInfo,
  useRescheduleAppointment,
} from '@/hooks/react-query/appointments/appointments.hooks';
import { IRescheduleAppointment } from '@/hooks/react-query/appointments/payload.interafce';
import {
  useDoctorRescheduledAvailDates,
  useDoctorTimingsByDate,
} from '@/hooks/react-query/availability/availablity.hooks';
import { useMyPatientInfiniteList } from '@/hooks/react-query/patients/patients.hooks';
import { MyAppointmentsQueryKeys } from '@/hooks/react-query/query.keys';
import {
  groupTimingSlotsByPeriod,
  ISlotItem,
  normalizeApiTime,
  normalizeAvailableDates,
} from '@/lib/commons/availability.utils';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { BookAppointmentWrapper } from '@/styles/CustomStyled/BookAppointmentWrapper';
import { ConsultType } from '@/typescripts/enums';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import BookingSummaryCard from '../BookAppointment/BookingSummaryCard';
import ConsultationTypeCard from '../BookAppointment/ConsultationTypeCard';
import DateSelectCard from '../BookAppointment/DateSelectCard';
import PatientSelectCard from '../BookAppointment/PatientSelectCard';
import BookAppointmentSkeleton from '../BookAppointment/Skeletons/BookAppointmentSkeleton';
import TimeSlotCard from '../BookAppointment/TimeSlotCard';
import VisitCategoryCard from '../BookAppointment/VisitCategoryCard';
import {
  BookingConsultType,
  breadcrumbItems,
  consultationTypes,
  PATIENT_PAGE_LIMIT,
  PATIENT_SEARCH_DEBOUNCE,
  visitCategories,
  VisitCategoryId,
} from '../contants/bookAppointment.constants';

interface IFormStates {
  consultationType: BookingConsultType;
  visitCategory: VisitCategoryId;
  selectedDate: string;
  selectedSlot: ISlotItem | null;
  reason: string;
}

const initialFormState: IFormStates = {
  consultationType: ConsultType.IN_PERSON,
  visitCategory: 'regular',
  selectedDate: '',
  selectedSlot: null,
  reason: '',
};
const isSameSlot = (a: ISlotItem, b: ISlotItem) =>
  a.start === b.start && a.end === b.end;

type RescheduleAppointmentPageProps = {
  appointmentId: string;
};

export default function RescheduleAppointmentPage({
  appointmentId,
}: RescheduleAppointmentPageProps) {
  const [selectedPatient, setSelectedPatient] = useState<IMyPatientDoc | null>(
    null,
  );
  const [formStates, setFormState] = useState<IFormStates>(initialFormState);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const showConfirm = useAlertStore((state) => state.showConfirm);
  const debouncedSearch = useDebounce(searchQuery, PATIENT_SEARCH_DEBOUNCE);

  const { data: apptInfo, isFetching: apptInfoIsPending } =
    useMyAppointmentInfo({ id: appointmentId });

  const doctorId = Number(apptInfo?.doctor_id);
  const clinicId = Number(apptInfo?.clinic_id);
  const patientId = Number(apptInfo?.patient_id);
  const slotDuration = Number(
    apptInfo?.slot_duration_minutes || apptInfo?.appointment_duration || 0,
  );
  const consultationType =
    apptInfo?.consultation_type === 'video' ? 'video' : 'in-person';
  const appointmentType = apptInfo?.appointment_type;

  const { data: patientPages, isFetching: isPatientListPending } =
    useMyPatientInfiniteList(
      {
        limit: PATIENT_PAGE_LIMIT,
        search: debouncedSearch.trim() || undefined,
        patient_id: patientId,
      },
      { enabled: !!apptInfo },
    );

  const {
    data: availableDatesRes,
    refetch: refetchAvailableDates,
    isFetching: isAvailableDatesPending,
    isError: isAvailableDatesError,
  } = useDoctorRescheduledAvailDates({
    doctorId,
    consultation_type: consultationType,
    clinicId,
    slot_duration: slotDuration,
  });

  const {
    data: timingsData,
    isFetching: timingsFetching,
    isError: isTimingsError,
    refetch: refetchTimings,
  } = useDoctorTimingsByDate({
    doctorId,
    clinicId,
    consultation_type: formStates.consultationType,
    date: formStates.selectedDate,
  });

  const { mutate: rescheduleAppt } = useRescheduleAppointment();

  const patientOptions = useMemo(() => {
    const seen = new Set<string>();
    const list: IMyPatientDoc[] = [];
    const push = (patient: IMyPatientDoc) => {
      const key = String(patient.id);
      if (seen.has(key)) return;
      seen.add(key);
      list.push(patient);
    };
    patientPages?.pages.forEach((page) => page?.data?.forEach(push));
    if (selectedPatient) push(selectedPatient);
    return list;
  }, [patientPages, selectedPatient]);

  const isPatientSearching = searchQuery !== debouncedSearch;
  const isPatientListLoading = isPatientListPending || isPatientSearching;

  const availableDates = useMemo(
    () => normalizeAvailableDates(availableDatesRes ?? []),
    [availableDatesRes],
  );

  const timingSlots = timingsData?.slots;

  const periodSlots = useMemo(
    () => (timingSlots?.length ? groupTimingSlotsByPeriod(timingSlots) : null),
    [timingSlots],
  );

  const singleSlotFee = useMemo(() => {
    const firstSlot = timingSlots?.[0];
    if (!firstSlot) return 0;
    const fee =
      formStates.consultationType === ConsultType.VIDEO
        ? firstSlot.video_fee
        : firstSlot.in_person_fee;
    return parseFloat(String(fee || 0)) || 0;
  }, [timingSlots, formStates.consultationType]);

  const totalAmount = singleSlotFee;

  const selectedConsult = consultationTypes.find(
    (row) => row.id === formStates.consultationType,
  );
  const selectedVisit = visitCategories.find(
    (row) => row.id === formStates.visitCategory,
  );

  const updateFormState = (patch: Partial<IFormStates>) => {
    setFormState((prev) => ({ ...prev, ...patch }));
  };

  const handlePatientSelect = (patient: IMyPatientDoc | null) => {
    setSelectedPatient(patient);
    if (!patient) updateFormState({ selectedDate: '', selectedSlot: null });
  };

  const handleConsultTypeChange = (consultationType: BookingConsultType) => {
    if (consultationType === formStates.consultationType) return;
    if (consultationType === ConsultType.VIDEO)
      return showInfoToast(
        'Video consultation is coming soon. Please select In-person consultation for now.',
      );
    updateFormState({
      consultationType,
      selectedDate: '',
      selectedSlot: null,
    });
  };

  const handleDateSelect = (selectedDate: string) => {
    if (selectedDate === formStates.selectedDate) return;
    updateFormState({ selectedDate, selectedSlot: null });
  };

  const handleSlotPress = (slot: ISlotItem) => {
    if (slot.booked) return;
    const isSelected = formStates.selectedSlot
      ? isSameSlot(formStates.selectedSlot, slot)
      : false;

    updateFormState({
      selectedSlot: isSelected ? null : slot,
    });
  };

  const handleProceed = () => {
    if (!appointmentId) return showErrorToast('Appointment id is missing');
    if (!formStates.selectedDate) return showErrorToast('Please select a date');
    if (!formStates.selectedSlot) {
      return showErrorToast('Please select a time slot');
    }

    const slot = formStates.selectedSlot;

    const payload: IRescheduleAppointment = {
      appointment_date: formStates.selectedDate,
      start_time: normalizeApiTime(slot.start),
      end_time: normalizeApiTime(slot.end),
      availability_id: [String(slot.availability_id || '')],
      clinic_id: String(clinicId),
      appointment_duration: slotDuration,
      reason: formStates.reason.trim(),
      appointment_slot_time: [
        {
          start: normalizeApiTime(slot.start),
          end: normalizeApiTime(slot.end),
        },
      ],
    };

    showConfirm({
      title: 'Confirm Reschedule',
      message: 'Are you sure you want to reschedule this appointment?',
      onConfirm: () => {
        showLoader('Rescheduling appointment...');
        rescheduleAppt(
          { id: appointmentId, body: payload },
          {
            onSuccess: async (res: any) => {
              if (res?.success) {
                showSuccessToast(
                  res?.message || 'Appointment rescheduled successfully',
                );
                await queryClient.invalidateQueries({
                  queryKey: [MyAppointmentsQueryKeys.MyAppointments],
                });
                await queryClient.invalidateQueries({
                  queryKey: [MyAppointmentsQueryKeys.MyAppointmentsInfo],
                });
                await queryClient.invalidateQueries({
                  queryKey: [MyAppointmentsQueryKeys.MyAppointmentsStats],
                });
                router.replace(projectRoutes.appointmentDetails(appointmentId));
              } else {
                showErrorToast(
                  res?.message || 'Unable to reschedule appointment',
                );
              }
            },
            onSettled: () => {
              hideLoader();
            },
          },
        );
      },
    });
  };

  useEffect(() => {
    if (!apptInfo) return;
    updateFormState({
      consultationType: consultationType as BookingConsultType,
      visitCategory: appointmentType as VisitCategoryId
    });
  }, [apptInfo]);

  useEffect(() => {
    if (!apptInfo || selectedPatient) return;
    if (patientOptions.length === 0) return;
    const matched = patientOptions.find(
      (p) =>
        String(p.id) === String(patientId) ||
        String(p.user_id) === String(patientId),
    );
    if (matched) setSelectedPatient(matched);
  }, [apptInfo, patientOptions]);

  return (
    <BookAppointmentWrapper>
      <PageBreadcrumb
        items={breadcrumbItems}
        action={
          <Button
            className="page-action"
            variant="outlined"
            component={Link}
            href={projectRoutes.appointments}
            startIcon={<ArrowBackIcon fontSize="small" />}
          >
            Back to List
          </Button>
        }
      />

      {apptInfoIsPending || isPatientListPending ? (
        <BookAppointmentSkeleton />
      ) : (
        <Box className="book-form" component="form" noValidate>
          <PatientSelectCard
            options={patientOptions}
            selectedPatient={selectedPatient}
            onSelect={handlePatientSelect}
            onSearchChange={setSearchQuery}
            loading={isPatientListLoading}
            isDisabled={true}
          />

          <ConsultationTypeCard
            value={formStates.consultationType}
            onChange={handleConsultTypeChange}
            mode="reschedule"
          />
          <DateSelectCard
            key={formStates.consultationType}
            dates={availableDates}
            loading={Boolean(doctorId) && isAvailableDatesPending}
            error={isAvailableDatesError}
            onRetry={() => refetchAvailableDates()}
            selectedDate={formStates.selectedDate}
            onSelect={handleDateSelect}
            disabled={!selectedPatient}
          />

          {formStates?.selectedDate && (
            <TimeSlotCard
              periodSlots={periodSlots}
              loading={timingsFetching}
              error={isTimingsError}
              onRetry={() => refetchTimings()}
              selectedDate={formStates.selectedDate}
              selectedSlots={
                formStates.selectedSlot ? [formStates.selectedSlot] : null
              }
              onSlotPress={handleSlotPress}
            />
          )}
          <VisitCategoryCard
            value={formStates.visitCategory}
            onChange={(visitCategory) => updateFormState({ visitCategory })}
          />
          <Box className="book-card">
            <CustomInput
              multiline
              minRows={3}
              name="reason"
              inputLabelName="Reason to Visit"
              placeholder="Please describe the reason for visit..."
              value={formStates.reason}
              onChange={(event) =>
                updateFormState({ reason: event.target.value })
              }
            />
          </Box>

          <BookingSummaryCard
            patientName={selectedPatient?.name}
            consultationLabel={selectedConsult?.label}
            selectedDate={formStates.selectedDate}
            selectedSlots={
              formStates.selectedSlot ? [formStates.selectedSlot] : null
            }
            visitLabel={selectedVisit?.label}
            totalAmount={totalAmount}
          />

          <Box className="confirm-wrap">
            <Button
              className="confirm-btn"
              variant="contained"
              type="button"
              disableElevation
              onClick={handleProceed}
            >
              Confirm Reschedule
            </Button>
          </Box>
        </Box>
      )}
    </BookAppointmentWrapper>
  );
}
