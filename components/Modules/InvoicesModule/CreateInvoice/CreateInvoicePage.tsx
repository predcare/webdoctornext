'use client';

import { useCreateInvoices } from '@/hooks/react-query/invoices/invoices.hooks';
import {
  ICreateManualInvoicePayload,
  ICreateManualItem,
} from '@/hooks/react-query/invoices/payload.interfaces';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import {
  createInvoiceSchema,
  TCreateInvoiceSchemaType,
} from '@/lib/schemas/createInvoice.schema';
import { projectRoutes } from '@/routes';
import { CreateInvoiceWrapper } from '@/styles/CustomStyled/CreateInvoiceWrapper';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceSummarySection from './InvoiceSummarySection';
import PatientDetailsCard from './PatientDetailsCard';
import PaymentDetailsSection from './PaymentDetailsSection';
import PaymentStatusCard from './PaymentStatusCard';
interface ICreateInvoicePageProps {
  patientId?: string;
}
function CreateInvoicePage({ patientId }: ICreateInvoicePageProps) {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<IMyPatientDoc | null>(
    null,
  );

  const { mutate: createInvoiceMutate, isPending: isSubmitting } =
    useCreateInvoices();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TCreateInvoiceSchemaType>({
    resolver: yupResolver(createInvoiceSchema) as any,
    mode: 'onSubmit',
    defaultValues: {
      patient_id: patientId || '',
      items: [
        {
          name: '',
          hsn_sac: '',
          qty: '1',
          price: '0.00',
          discount: '0',
          discount_type: '%',
          tax_percent: '0',
        },
      ],
      paymentStatus: 'Unpaid',
      paymentMode: 'Cash',
      payments: [],
      notes: '',
    },
  });

  const watchedItems = watch('items') || [];
  const watchedPayments = watch('payments') || [];

  const { subtotal, totalDiscount, grandTotal } = useMemo(() => {
    let sub = 0;
    let disc = 0;

    watchedItems.forEach((item) => {
      const q = parseFloat(item?.qty || '0') || 0;
      const p = parseFloat(item?.price || '0') || 0;
      const d = parseFloat(item?.discount || '0') || 0;
      const dType = item?.discount_type || '%';

      const lineBase = q * p;
      let lineDisc = 0;
      if (dType === '%') {
        lineDisc = (lineBase * d) / 100;
      } else {
        lineDisc = d;
      }
      if (lineDisc > lineBase) lineDisc = lineBase;

      sub += lineBase;
      disc += lineDisc;
    });

    const total = Math.max(0, sub - disc);
    return {
      subtotal: sub,
      totalDiscount: disc,
      grandTotal: total,
    };
  }, [watchedItems]);

  const handleSelectPatient = useCallback(
    (patient: IMyPatientDoc | null) => {
      setSelectedPatient(patient);
      setValue('patient_id', patient?.id ? String(patient.id) : '', {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onSubmit = useCallback(
    (data: TCreateInvoiceSchemaType) => {
      const clinicId = useAuthStore.getState().userData?.clinic?.id
      if (!clinicId) return showErrorToast("Clinic not found")
      const formattedItems: ICreateManualItem[] = data.items.map((it) => {
        const q = parseFloat(it.qty || '0') || 0;
        const p = parseFloat(it.price || '0') || 0;
        const d = parseFloat(it.discount || '0') || 0;
        const dType = it.discount_type || '%';
        const discount_percent =
          dType === '%'
            ? d
            : q * p > 0
              ? Math.min(100, (d / (q * p)) * 100)
              : 0;

        return {
          item_name: it.name,
          hsn_sac: it.hsn_sac || '',
          qty: q,
          unit_price: p,
          discount_percent,
          tax_rate: parseFloat(it.tax_percent || '0') || 0,
        };
      });

      const payload: ICreateManualInvoicePayload = {
        clinic_id: String(clinicId),
        patient_id: String(data.patient_id || selectedPatient?.id || ''),
        patient_name: selectedPatient?.name || '',
        patient_phone: selectedPatient?.phone_number || '',
        patient_email: selectedPatient?.email || '',
        patient_gender: selectedPatient?.gender || '',
        invoice_date: "",
        payment_mode: data.paymentMode,
        payment_status: data.paymentStatus?.toLowerCase() || 'unpaid',
        gst_type: 'CGST_SGST',
        items: formattedItems,
        notes: data.notes || '',
      };

      createInvoiceMutate(payload, {
        onSuccess: (res) => {
          if (res?.success) {
            showSuccessToast('Invoice generated successfully.');
          }
          if (data.patient_id) {
            router.push(projectRoutes.patientDetails(data.patient_id));
          } else {
            router.push(projectRoutes.dashboard);
          }
        },
      });
    },
    [
      selectedPatient,
      watchedPayments,
      createInvoiceMutate,
      router,
    ],
  );

  return (
    <CreateInvoiceWrapper>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box className="patient-top-grid">
            <PatientDetailsCard
              selectedPatient={selectedPatient}
              onSelectPatient={handleSelectPatient}
              error={errors.patient_id?.message}
              patientId={patientId}
            />
            <PaymentStatusCard control={control} />
          </Box>

          <InvoiceItemsTable control={control} watch={watch} />

          <PaymentDetailsSection
            control={control}
            watch={watch}
            grandTotal={grandTotal}
          />

          <InvoiceSummarySection
            control={control}
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            grandTotal={grandTotal}
            isSubmitting={isSubmitting}
          />
        </Box>
      </Box>
    </CreateInvoiceWrapper>
  );
}

export default memo(CreateInvoicePage);
