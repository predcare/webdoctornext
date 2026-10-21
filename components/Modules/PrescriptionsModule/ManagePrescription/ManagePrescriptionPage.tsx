'use client';

import {
  clinicalNoteFields,
  followUpReferralFields,
  type ClinicalNoteField,
  type ConsultationTabId,
  type FollowUpReferralField,
} from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import ConsultationPatientHeader from '@/components/Modules/PrescriptionsModule/ManagePrescription/ConsultationPatientHeader';
import ConsultationWorkspaceTabs from '@/components/Modules/PrescriptionsModule/ManagePrescription/ConsultationWorkspaceTabs';
import AllergiesConditionsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/AllergiesConditionsSection';
import ClinicalNotesSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/ClinicalNotesSection';
import ConsultationActionsBar from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/ConsultationActionsBar';
import FollowUpReferralSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/FollowUpReferralSection';
import LabTestsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/LabTestsSection';
import PatientVitalsSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/PatientVitalsSection';
import PrescriptionSection from '@/components/Modules/PrescriptionsModule/ManagePrescription/sections/PrescriptionSection';
import ManagePrescriptionSkeleton from '@/components/Modules/PrescriptionsModule/ManagePrescription/Skeletons/ManagePrescriptionSkeleton';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import { useMyPatientInfo } from '@/hooks/react-query/patients/patients.hooks';
import {
  ICreatePrescriptionPayload,
  IUpdatePrescriptionPayload,
} from '@/hooks/react-query/prescriptions/payload.interfaces';
import {
  useCreatePrescription,
  useDownloadPrescriptionPdf,
  useGetPrescriptionDetails,
  useResendPrescriptionEmail,
  useUpdatePrescription,
} from '@/hooks/react-query/prescriptions/prescriptions.hooks';
import {
  PatientsQueryKeys,
  PrescriptionQueryKeys,
} from '@/hooks/react-query/query.keys';
import { formatDate, getAge, openInNewTab } from '@/lib/commons/common.utils';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import {
  createPrescriptionSchema,
  TCreatePrescriptionFormValues,
} from '@/lib/schemas/createPrescription.schema';
import { projectRoutes } from '@/routes';
import { ManagePrescriptionWrapper } from '@/styles/CustomStyled/ManagePrescriptionWrapper';
import { UserRoles } from '@/typescripts/enums';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ACTIONS_ID = 'consultation-actions';

const getMainScroller = () =>
  document.querySelector<HTMLElement>('.dashboard-main');

const clinicalNotesByTab: Record<
  ConsultationTabId,
  readonly ClinicalNoteField[] | null
> = {
  prescription: clinicalNoteFields,
  'clinical-notes': ['symptoms', 'examination'],
  diagnosis: ['diagnosis', 'treatment'],
  referrals: null,
};

const followUpByTab: Record<
  ConsultationTabId,
  readonly FollowUpReferralField[] | null
> = {
  prescription: followUpReferralFields,
  'clinical-notes': ['follow-up'],
  diagnosis: null,
  referrals: ['referral'],
};

const defaultFormValues: TCreatePrescriptionFormValues = {
  chief_complaints: '',
  examination_notes: '',
  diagnosis: '',
  treatment_plan: '',
  chronic_conditions: '',
  drug_allergies: '',
  blood_pressure: '',
  pulse: '',
  temperature: '',
  spo2: '',
  weight: '',
  height: '',
  bmi: '',
  custom_vitals: [],
  medications: [],
  lab_tests_structured: [],
  general_advice: '',
  follow_up_date: '',
  referral_specialist: '',
  referral_doctor_hospital: '',
  referral_doctor_name: '',
  referral_reason: '',
  notes: '',
};

type ManagePrescriptionPageProps = {
  tab: ConsultationTabId;
  patientId: string;
  prescriptionId?: string;
  appointmentId?: string;
};

export default function ManagePrescriptionPage({
  tab: initialTab,
  patientId,
  prescriptionId,
  appointmentId,
}: ManagePrescriptionPageProps) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const [showScrollEnd, setShowScrollEnd] = useState(false);

  const showFullForm = tab === 'prescription';
  const clinicalFields = clinicalNotesByTab[tab];
  const followUpFields = followUpByTab[tab];

  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const { clearInPersonAppointment } = useMeetingStore((state) => state);

  const currentPrescriptionId = useRef<number | null>(
    prescriptionId ? Number(prescriptionId) : null,
  );
  const hasPrescriptionId = Boolean(prescriptionId);

  const [autoSaveStatus, setAutoSaveStatus] = useState<
    'idle' | 'typing' | 'saving' | 'saved' | 'error'
  >('idle');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef<boolean>(false);
  const isInitialLoadRef = useRef<boolean>(!!prescriptionId);
  const [isFormReady, setIsFormReady] = useState<boolean>(!prescriptionId);

  const {
    data: prescriptionInfo,
    isFetching: prescriptionInfoPending,
    isError: isPrescriptionInfoError,
  } = useGetPrescriptionDetails({
    id: Number(prescriptionId),
  });
  const { data: patientInfo, isFetching: patientInfoPending } =
    useMyPatientInfo({
      patientId,
    });

  const isPageLoading =
    patientInfoPending ||
    (hasPrescriptionId && (prescriptionInfoPending || !isFormReady));

  const { mutate: createPrescription } = useCreatePrescription();
  const { mutate: updatePrescription } = useUpdatePrescription();
  const { mutate: resendEmailMutation, isPending: isSendingEmail } =
    useResendPrescriptionEmail();
  const { mutate: downloadPdfMutation } = useDownloadPrescriptionPdf();

  const methods = useForm<TCreatePrescriptionFormValues>({
    resolver: yupResolver(createPrescriptionSchema),
    defaultValues: defaultFormValues,
  });

  const handleTabChange = (nextTab: ConsultationTabId) => {
    setTab(nextTab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', nextTab);
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  };

  const scrollToActions = () => {
    document.getElementById(ACTIONS_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const hasAnyContent = (_data: TCreatePrescriptionFormValues) => {
    const validMedications = _data?.medications?.filter(
      (m) => m?.name && m.name.trim() !== '',
    );
    const validCustomVitals = _data?.custom_vitals?.filter(
      (v) =>
        (v?.name && v.name.trim() !== '') ||
        (v?.value && v.value.trim() !== ''),
    );
    const validLabTests = _data?.lab_tests_structured?.filter(
      (l) => l?.name && l.name.trim() !== '',
    );

    return Boolean(
      _data?.chief_complaints?.trim() ||
      _data?.examination_notes?.trim() ||
      _data?.diagnosis?.trim() ||
      _data?.treatment_plan?.trim() ||
      _data?.chronic_conditions?.trim() ||
      _data?.drug_allergies?.trim() ||
      _data?.blood_pressure?.trim() ||
      _data?.pulse?.trim() ||
      _data?.temperature?.trim() ||
      _data?.spo2?.trim() ||
      _data?.weight?.trim() ||
      _data?.height?.trim() ||
      _data?.bmi?.trim() ||
      _data?.general_advice?.trim() ||
      _data?.follow_up_date?.trim() ||
      _data?.referral_specialist?.trim() ||
      _data?.referral_doctor_hospital?.trim() ||
      _data?.referral_doctor_name?.trim() ||
      _data?.referral_reason?.trim() ||
      _data?.notes?.trim() ||
      (validMedications && validMedications.length > 0) ||
      (validCustomVitals && validCustomVitals.length > 0) ||
      (validLabTests && validLabTests.length > 0),
    );
  };

  const buildPrescriptionPayload = (
    _data: TCreatePrescriptionFormValues,
    status: 'draft' | 'completed' = 'draft',
  ): ICreatePrescriptionPayload => {
    const currentUser = useAuthStore.getState().userData;
    const clinicId = currentUser?.clinic?.id;
    const rx = prescriptionInfo?.data;
    const validMedications = _data?.medications?.filter(
      (m) => m?.name && m.name.trim() !== '',
    );
    const validCustomVitals = _data?.custom_vitals?.filter(
      (v) =>
        (v?.name && v.name.trim() !== '') ||
        (v?.value && v.value.trim() !== ''),
    );
    const validLabTests = _data?.lab_tests_structured?.filter(
      (l) => l?.name && l.name.trim() !== '',
    );

    const rawPayload: Record<string, any> = {
      doctor_id: currentUser?.id || '',
      patient_id: patientId ?? rx?.patient_id ?? '',
      clinic_id: clinicId ?? rx?.clinic_id ?? '',
      appointment_id: rx?.appointment_id ?? appointmentId ?? '',
      type: UserRoles.DOCTOR,
      chief_complaints: _data?.chief_complaints,
      diagnosis: _data?.diagnosis,
      symptoms: _data?.chief_complaints,
      examination_notes: _data?.examination_notes,
      treatment_plan: _data?.treatment_plan,
      drug_allergies: _data?.drug_allergies || '',
      chronic_conditions: _data?.chronic_conditions || '',
      blood_pressure: _data?.blood_pressure,
      pulse: _data?.pulse,
      temperature: _data?.temperature,
      spo2: _data?.spo2,
      weight: _data?.weight,
      height: _data?.height,
      bmi: _data?.bmi,
      custom_vitals: validCustomVitals,
      medications: validMedications,
      lab_tests_structured: validLabTests,
      general_advice: _data?.general_advice,
      follow_up: _data?.follow_up_date,
      follow_up_date: _data?.follow_up_date,
      referral_specialist: _data?.referral_specialist,
      referral_doctor_hospital: _data?.referral_doctor_hospital,
      referral_doctor_name: _data?.referral_doctor_name,
      referral_reason: _data?.referral_reason,
      notes: _data?.notes,
      status,
    };

    return Object.fromEntries(
      Object.entries(rawPayload).filter(([_, val]) => {
        if (val === null || val === undefined || val === '') return false;
        if (Array.isArray(val) && val.length === 0) return false;
        return true;
      }),
    ) as unknown as ICreatePrescriptionPayload;
  };

  const triggerAutoSave = (formValues: TCreatePrescriptionFormValues) => {
    if (!hasAnyContent(formValues) || isSavingRef.current) return;

    isSavingRef.current = true;
    setAutoSaveStatus('saving');
    const payload = buildPrescriptionPayload(formValues, 'draft');
    const activeId =
      currentPrescriptionId.current ||
      (prescriptionId ? Number(prescriptionId) : null);

    const getFormattedTime = () => {
      const date = new Date();
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    if (activeId) {
      updatePrescription(
        {
          id: activeId,
          payload: payload as unknown as IUpdatePrescriptionPayload,
        },
        {
          onSuccess: () => {
            isSavingRef.current = false;
            setAutoSaveStatus('saved');
            setLastSavedAt(getFormattedTime());
            clearInPersonAppointment();
          },
          onError: () => {
            isSavingRef.current = false;
            setAutoSaveStatus('error');
          },
        },
      );
    } else {
      createPrescription(payload, {
        onSuccess: async (response) => {
          const createId = response?.data?.id;
          if (createId) {
            currentPrescriptionId.current = Number(createId);
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.set('prescriptionId', String(createId));
              window.history.replaceState(null, '', url.pathname + url.search);
            }
          }
          await queryClient.invalidateQueries({
            queryKey: [PrescriptionQueryKeys.GetPresciptionInfo],
          });
          await queryClient.invalidateQueries({
            queryKey: [PatientsQueryKeys.Prescriptions],
          });
          isSavingRef.current = false;
          setAutoSaveStatus('saved');
          setLastSavedAt(getFormattedTime());
          clearInPersonAppointment();
        },
        onError: () => {
          isSavingRef.current = false;
          setAutoSaveStatus('error');
        },
      });
    }
  };

  const handleFinalSubmit = (_data: TCreatePrescriptionFormValues) => {
    if (!hasAnyContent(_data)) {
      showErrorToast(
        'Please enter at least one detail (e.g. Diagnosis, Symptoms, Vitals, or Medications) to complete the prescription.',
      );
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    const payload = buildPrescriptionPayload(_data, 'completed');
    const activeId =
      currentPrescriptionId.current ||
      (prescriptionId ? Number(prescriptionId) : null);

    if (activeId) {
      showLoader('Updating prescription...');
      updatePrescription(
        {
          id: activeId,
          payload: payload as unknown as IUpdatePrescriptionPayload,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: [PrescriptionQueryKeys.GetPresciptionInfo],
            });
            await queryClient.invalidateQueries({
              queryKey: [PatientsQueryKeys.Prescriptions],
            });
            showSuccessToast('Prescription completed successfully');
            hideLoader();
            clearInPersonAppointment();
            router.push(projectRoutes.patientDetails(patientId));
          },
          onError: () => {
            hideLoader();
          },
        },
      );
    } else {
      showLoader('Creating new prescription...');
      createPrescription(payload, {
        onSuccess: async (response) => {
          const createId = response?.data?.id;
          if (createId) {
            currentPrescriptionId.current = Number(createId);
          }
          await queryClient.invalidateQueries({
            queryKey: [PrescriptionQueryKeys.GetPresciptionInfo],
          });
          await queryClient.invalidateQueries({
            queryKey: [PatientsQueryKeys.Prescriptions],
          });
          showSuccessToast('Prescription completed successfully');
          hideLoader();
          clearInPersonAppointment();
          router.push(projectRoutes.patientDetails(patientId));
        },
        onError: () => {
          hideLoader();
        },
      });
    }
  };

  const handleSendAndComplete = (_data: TCreatePrescriptionFormValues) => {
    if (!hasAnyContent(_data)) {
      showErrorToast(
        'Please enter at least one detail (e.g. Diagnosis, Symptoms, Vitals, or Medications) to complete and send the prescription.',
      );
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    const payload = buildPrescriptionPayload(_data, 'completed');
    const activeId =
      currentPrescriptionId.current ||
      (prescriptionId ? Number(prescriptionId) : null);

    showLoader('Sending prescription to patient...');

    const triggerEmailAndNavigate = (rxId: string | number) => {
      resendEmailMutation(rxId, {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries({
            queryKey: [PrescriptionQueryKeys.GetPresciptionInfo],
          });
          await queryClient.invalidateQueries({
            queryKey: [PatientsQueryKeys.Prescriptions],
          });
          showSuccessToast(
            res?.message || "Prescription completed & sent to patient's email.",
          );
          hideLoader();
          clearInPersonAppointment();
          router.push(projectRoutes.patientDetails(patientId));
        },
        onError: async (e: any) => {
          await queryClient.invalidateQueries({
            queryKey: [PrescriptionQueryKeys.GetPresciptionInfo],
          });
          await queryClient.invalidateQueries({
            queryKey: [PatientsQueryKeys.Prescriptions],
          });
          const msg =
            e?.response?.data?.message ||
            'Prescription completed, but failed to send email.';
          showErrorToast(msg);
          hideLoader();
          router.push(projectRoutes.patientDetails(patientId));
        },
      });
    };

    if (activeId) {
      updatePrescription(
        {
          id: activeId,
          payload: payload as unknown as IUpdatePrescriptionPayload,
        },
        {
          onSuccess: () => {
            triggerEmailAndNavigate(activeId);
          },
          onError: () => {
            hideLoader();
          },
        },
      );
    } else {
      createPrescription(payload, {
        onSuccess: (response) => {
          const createId = response?.data?.id;
          if (createId) {
            currentPrescriptionId.current = Number(createId);
          }
          triggerEmailAndNavigate(
            createId || currentPrescriptionId.current || '',
          );
          clearInPersonAppointment();
        },
        onError: () => {
          hideLoader();
        },
      });
    }
  };

  const handlePrintOrDownloadPdf = () => {
    const rx = prescriptionInfo?.data;
    if (rx?.pdf_url) {
      openInNewTab(rx.pdf_url);
      return;
    }

    const activeId =
      currentPrescriptionId.current ||
      (prescriptionId ? Number(prescriptionId) : null);

    if (activeId) {
      downloadPdfMutation({ id: activeId, action: 'open' });
    } else {
      showErrorToast(
        'Please save or complete the prescription before printing the PDF summary.',
      );
    }
  };

  // Debounced auto-save immediately on any field change/typing
  useEffect(() => {
    const subscription = methods.watch(() => {
      if (isInitialLoadRef.current) return;
      const currentValues = methods.getValues();
      if (!hasAnyContent(currentValues)) return;

      setAutoSaveStatus('typing');
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      autoSaveTimerRef.current = setTimeout(() => {
        triggerAutoSave(methods.getValues());
      }, 1000);
    });

    return () => {
      subscription.unsubscribe();
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [methods]);

  useEffect(() => {
    const scroller = getMainScroller();
    if (!scroller) return;

    const update = () => {
      const remaining =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      setShowScrollEnd(remaining > 80);
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tab]);

  // Populate form if existing prescription data is loaded
  useEffect(() => {
    if (prescriptionInfo?.data && isInitialLoadRef.current) {
      const rx = prescriptionInfo.data;
      if (rx.id) {
        currentPrescriptionId.current = Number(rx.id);
      }

      methods.reset({
        chief_complaints: rx.chief_complaints || rx.symptoms || '',
        examination_notes: rx.examination_notes || '',
        diagnosis: rx.diagnosis || '',
        treatment_plan: rx.treatment_plan || '',
        chronic_conditions: rx.chronic_conditions || '',
        drug_allergies: rx.drug_allergies || '',
        blood_pressure: rx.blood_pressure || '',
        pulse: rx.pulse || '',
        temperature: rx.temperature || '',
        spo2: rx.spo2 || '',
        weight: rx.weight || '',
        height: rx.height || '',
        bmi: rx.bmi || '',
        custom_vitals: rx.custom_vitals || [],
        medications: (rx.medications || []).map((m) => ({
          name: m.name || '',
          strength: m.strength || '',
          strengthUnit: m.strengthUnit || 'mg',
          dosage: m.dosage || '',
          durationNum: m.durationNum || '5',
          durationUnit: m.durationUnit || 'days',
          timing: m.timing || '',
          instructions: m.instructions || '',
        })),
        lab_tests_structured: (rx.lab_tests || []).map((l) => ({
          name: l.name || l.text || '',
          instructions: l.instructions || '',
        })),
        general_advice: rx.general_advice || '',
        follow_up_date: rx.follow_up_date || rx.follow_up || '',
        referral_specialist: rx.referral_specialist || '',
        referral_doctor_hospital: rx.referral_doctor_hospital || '',
        referral_doctor_name: rx.referral_doctor_name || '',
        referral_reason: rx.referral_reason || '',
        notes: rx.notes || '',
      });

      if (rx.updated_at || rx.created_at) {
        const d = new Date(rx.updated_at || rx.created_at);
        setLastSavedAt(
          d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        );
        setAutoSaveStatus('saved');
      }

      isInitialLoadRef.current = false;
      setIsFormReady(true);
    }
  }, [prescriptionInfo?.data, methods]);

  useEffect(() => {
    if (isPrescriptionInfoError) {
      setIsFormReady(true);
    }
  }, [isPrescriptionInfoError]);

  if (isPageLoading) {
    return (
      <ManagePrescriptionWrapper>
        <ManagePrescriptionSkeleton tab={tab} />
      </ManagePrescriptionWrapper>
    );
  }

  return (
    <ManagePrescriptionWrapper>
      <FormProvider {...methods}>
        <ConsultationPatientHeader
          ptName={patientInfo?.name || ''}
          patientCode={patientInfo?.patient_id || ''}
          ptPhone={patientInfo?.phone_number || ''}
          ptEmail={patientInfo?.email || ''}
          ptGender={patientInfo?.gender || ''}
          ptAge={getAge(patientInfo?.date_of_birth || '') || 'N/A'}
          ptCity={patientInfo?.city || ''}
          ptBloodGroup={patientInfo?.blood_type || ''}
          ptLastVisit={formatDate(patientInfo?.last_appointment_date) || ''}
          ptRegisteredDate={formatDate(patientInfo?.created_at) || ''}
        />

        <ConsultationWorkspaceTabs tab={tab} onChange={handleTabChange} />

        {showFullForm || tab === 'clinical-notes' ? (
          <AllergiesConditionsSection />
        ) : null}

        {showFullForm || tab === 'clinical-notes' ? (
          <PatientVitalsSection />
        ) : null}

        {clinicalFields ? (
          <ClinicalNotesSection fields={clinicalFields} />
        ) : null}

        {showFullForm ? <PrescriptionSection /> : null}

        {showFullForm ? <LabTestsSection /> : null}

        {followUpFields ? (
          <FollowUpReferralSection fields={followUpFields} />
        ) : null}

        <ConsultationActionsBar
          id={ACTIONS_ID}
          status={prescriptionInfo?.data?.status || 'draft'}
          autoSaveStatus={autoSaveStatus}
          lastSavedAt={lastSavedAt}
          emailSentAt={formatDate(prescriptionInfo?.data?.email_sent_at)}
          isSendingEmail={isSendingEmail}
          onSendPrescription={methods.handleSubmit(handleSendAndComplete)}
          onPrintSummary={handlePrintOrDownloadPdf}
          onCompleteConsultation={methods.handleSubmit(handleFinalSubmit)}
        />

        {showScrollEnd ? (
          <IconButton
            type="button"
            className="scroll-to-end"
            aria-label="Scroll to actions"
            onClick={scrollToActions}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        ) : null}
      </FormProvider>
    </ManagePrescriptionWrapper>
  );
}
