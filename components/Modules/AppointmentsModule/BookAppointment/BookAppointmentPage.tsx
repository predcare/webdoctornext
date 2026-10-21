'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { useDebounce } from '@/hooks/commons/useDebounce';
import { useBookAppointments } from '@/hooks/react-query/appointments/appointments.hooks';
import { ICreateAppointmentPayload } from '@/hooks/react-query/auth/payload.interfaces';
import {
  useDoctorAvailDates,
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
import { showErrorToast, showInfoToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { BookAppointmentWrapper } from '@/styles/CustomStyled/BookAppointmentWrapper';
import { ConsultStatus, ConsultType } from '@/typescripts/enums';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  BookingConsultType,
  breadcrumbItems,
  consultationTypes,
  PATIENT_PAGE_LIMIT,
  PATIENT_SEARCH_DEBOUNCE,
  visitCategories,
  VisitCategoryId,
} from '../contants/bookAppointment.constants';
import BookingSummaryCard from './BookingSummaryCard';
import ConsultationTypeCard from './ConsultationTypeCard';
import DateSelectCard from './DateSelectCard';
import PatientSelectCard from './PatientSelectCard';
import BookAppointmentSkeleton from './Skeletons/BookAppointmentSkeleton';
import TimeSlotCard from './TimeSlotCard';
import VisitCategoryCard from './VisitCategoryCard';

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

type BookAppointmentPageProps = {
  patientId?: string;
};

export default function BookAppointmentPage({
  patientId,
}: BookAppointmentPageProps) {
  const [selectedPatient, setSelectedPatient] = useState<IMyPatientDoc | null>(
    null,
  );
  const [prefilledFor, setPrefilledFor] = useState<string | null>(null);
  const [formStates, setFormState] = useState<IFormStates>(initialFormState);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const userData = useAuthStore((state) => state.userData);
  const { showLoader, hideLoader } = useLoadingStore((state) => state);

  const doctorId = Number(userData?.id || userData?.user_id || 0);
  const clinicId = Number(userData?.clinic?.id || userData?.clinic_id || 0);

  const debouncedSearch = useDebounce(searchQuery, PATIENT_SEARCH_DEBOUNCE);

  const {
    data: patientPages,
    isPending: isPatientListPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMyPatientInfiniteList({
    limit: PATIENT_PAGE_LIMIT,
    search: debouncedSearch.trim() || undefined,
  });

  const {
    data: availDatesRaw,
    isPending: availDatesPending,
    isError: isAvailDatesError,
    refetch: refetchAvailDates,
  } = useDoctorAvailDates({
    clinicId,
    consultation_type: formStates.consultationType,
    doctorId,
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

  const { mutate: bookAppt } = useBookAppointments();

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
  const isPatientListLoading =
    isPatientListPending || isPatientSearching || !isFetchingNextPage;

  const handleLoadMorePatients = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const availableDates = useMemo(
    () => normalizeAvailableDates(availDatesRaw ?? []),
    [availDatesRaw],
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

  const handleBookAppointment = () => {
    if (!selectedPatient) return showErrorToast('Select Patient First');
    if (!formStates.selectedDate)
      return showErrorToast('Select Appointment Date');
    if (!formStates.selectedSlot) {
      return showErrorToast('Select at least one Time Slot');
    }
    if (!doctorId || !clinicId)
      return showErrorToast('Doctor/Clinic information is missing');

    if (formStates.selectedSlot.booked) {
      return showErrorToast(
        'Selected slot is already booked. Please choose another.',
      );
    }

    const slot = formStates.selectedSlot;

    showLoader('Please Wait. While Booking Appointment...');
    const payload: ICreateAppointmentPayload = {
      doctor_id: String(doctorId),
      patient_id: String(selectedPatient.user_id),
      clinic_id: String(clinicId),
      availability_id: [String(slot.availability_id || '')],
      appointment_date: formStates.selectedDate,
      start_time: normalizeApiTime(slot.start),
      end_time: normalizeApiTime(slot.end),
      consultation_type: formStates.consultationType,
      appointment_type: selectedVisit?.appointmentType || 'first_visit',
      reason: formStates.reason.trim() || null,
      symptoms: null,
      medications: null,
      appointment_slot_time: [
        {
          start: normalizeApiTime(slot.start),
          end: normalizeApiTime(slot.end),
          booked: true,
        },
      ],
      appointment_fee: totalAmount,
      appointment_status: ConsultStatus.CONFIRMED,
      payment_status: 'pending',
    };

    bookAppt(payload, {
      onSuccess: async (res) => {
        if (res?.success) {
          const appointmentId = String(res?.data?.appointment?.id || '');
          await queryClient.invalidateQueries({
            queryKey: [MyAppointmentsQueryKeys.MyAppointments],
          });
          setFormState(initialFormState);
          setSelectedPatient(null);
          setPrefilledFor(null);
          hideLoader();
          if (appointmentId) {
            router.replace(projectRoutes.appointmentDetails(appointmentId));
          }
        } else {
          hideLoader();
        }
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  useEffect(() => {
    if (!patientId || prefilledFor === patientId) return;
    const match = patientOptions.find((p) => String(p.id) === patientId);
    if (match) {
      setPrefilledFor(patientId);
      setSelectedPatient(match);
    }
  }, [patientId, prefilledFor, patientOptions]);

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

      {isPatientListPending ? (
        <BookAppointmentSkeleton />
      ) : (
        <Box className="book-form" component="form" noValidate>
          <PatientSelectCard
            options={patientOptions}
            selectedPatient={selectedPatient}
            onSelect={handlePatientSelect}
            onSearchChange={setSearchQuery}
            loading={isPatientListLoading}
            hasMore={Boolean(hasNextPage)}
            loadingMore={isFetchingNextPage}
            onLoadMore={handleLoadMorePatients}
          />

          <ConsultationTypeCard
            value={formStates.consultationType}
            onChange={handleConsultTypeChange}
          />
          <DateSelectCard
            key={formStates.consultationType}
            dates={availableDates}
            loading={Boolean(doctorId) && availDatesPending}
            error={isAvailDatesError}
            onRetry={() => refetchAvailDates()}
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
              onClick={handleBookAppointment}
            >
              Confirm Booking
            </Button>
          </Box>
        </Box>
      )}
    </BookAppointmentWrapper>
  );
}
