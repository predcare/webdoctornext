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
  areSlotsConsecutive,
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
import { useMemo, useState } from 'react';
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
  selectedSlots: ISlotItem[] | null;
  reason: string;
}

const initialFormState: IFormStates = {
  consultationType: ConsultType.IN_PERSON,
  visitCategory: 'regular',
  selectedDate: '',
  selectedSlots: null,
  reason: '',
};

type BookAppointmentPageProps = {
  patientId?: string;
};

export default function BookAppointmentPage({
  patientId,
}: BookAppointmentPageProps) {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<IMyPatientDoc | null>(
    null,
  );
  const [prefilledFor, setPrefilledFor] = useState<string | null>(null);
  const [formStates, setFormState] = useState<IFormStates>(initialFormState);
  const userData = useAuthStore((state) => state.userData);
  const { showLoader, hideLoader } = useLoadingStore((state) => state);

  const doctorId = Number(userData?.id || userData?.user_id || 0);
  const clinicId = Number(userData?.clinic?.id || userData?.clinic_id || 0);

  const [searchQuery, setSearchQuery] = useState('');
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

  if (patientId && prefilledFor !== patientId) {
    const match = patientOptions.find((p) => String(p.id) === patientId);
    if (match) {
      setPrefilledFor(patientId);
      setSelectedPatient(match);
    }
  }

  const isPatientSearching = searchQuery !== debouncedSearch;
  const isPatientListLoading =
    isPatientListPending || isPatientSearching || !isFetchingNextPage;

  const handleLoadMorePatients = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

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

  const totalAmount = singleSlotFee * (formStates.selectedSlots?.length || 1);

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
    if (!patient) updateFormState({ selectedDate: '', selectedSlots: null });
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
      selectedSlots: null,
    });
  };

  const handleDateSelect = (selectedDate: string) => {
    if (selectedDate === formStates.selectedDate) return;
    updateFormState({ selectedDate, selectedSlots: null });
  };

  const handleSlotPress = (slot: ISlotItem) => {
    if (slot.booked) return;
    const currentSelected = formStates.selectedSlots ?? [];

    const isSelected = currentSelected.some(
      (selectedSlot) => selectedSlot.start === slot.start,
    );

    if (isSelected) {
      const updated = currentSelected.filter(
        (selectedSlot) => selectedSlot.start !== slot.start,
      );

      if (updated.length > 0 && !areSlotsConsecutive(updated)) {
        showErrorToast('Please select consecutive slots only.');
        return;
      }

      updateFormState({
        selectedSlots: updated.length > 0 ? updated : null,
      });
      return;
    }

    if (currentSelected.length === 0) {
      updateFormState({ selectedSlots: [slot] });
      return;
    }

    const sorted = [...currentSelected].sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    if (slot.start === last.end || slot.end === first.start) {
      updateFormState({ selectedSlots: [...currentSelected, slot] });
    } else {
      showErrorToast('Please select consecutive slots only.');
    }
  };

  const handleBookAppointment = () => {
    if (!selectedPatient) return showErrorToast('Select Patient First');
    if (!formStates.selectedDate)
      return showErrorToast('Select Appointment Date');
    if (!formStates.selectedSlots || formStates.selectedSlots.length === 0) {
      return showErrorToast('Select at least one Time Slot');
    }
    if (!areSlotsConsecutive(formStates.selectedSlots)) {
      return showErrorToast('Please select consecutive slots only.');
    }
    if (!doctorId || !clinicId)
      return showErrorToast('Doctor/Clinic information is missing');

    if (formStates.selectedSlots.some((s) => s.booked)) {
      return showErrorToast(
        'One or more selected slots are already booked. Please choose another.',
      );
    }

    const sorted = [...formStates.selectedSlots].sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    const firstSlot = sorted[0];
    const lastSlot = sorted[sorted.length - 1];

    showLoader('Please Wait. While Booking Appointment...');
    const payload: ICreateAppointmentPayload = {
      doctor_id: String(doctorId),
      patient_id: String(selectedPatient.user_id),
      clinic_id: String(clinicId),
      availability_id: sorted.map((s) => String(s.availability_id || '')),
      appointment_date: formStates.selectedDate,
      start_time: normalizeApiTime(firstSlot.start),
      end_time: normalizeApiTime(lastSlot.end),
      consultation_type: formStates.consultationType,
      appointment_type: selectedVisit?.appointmentType || 'first_visit',
      reason: formStates.reason.trim() || null,
      symptoms: null,
      medications: null,
      appointment_slot_time: sorted.map((s) => ({
        start: normalizeApiTime(s.start),
        end: normalizeApiTime(s.end),
        booked: true,
      })),
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
              selectedSlots={formStates.selectedSlots}
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
            selectedSlots={formStates.selectedSlots}
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
