'use client';

import {
  useGetPrescriptionSettings,
  useUpdatePrescriptionSettings,
} from '@/hooks/react-query/prescriptions/prescriptions.hooks';
import { showErrorToast } from '@/lib/commons/toast';
import {
  PrescriptionSettingsSchema,
  type TPrescriptionSettingsSchemaType,
} from '@/lib/schemas/prescriptionSettings.schema';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BannerModeField from '../parts/BannerModeField';
import FormActions from '../parts/FormActions';
import SignatureUploadField from '../parts/SignatureUploadField';
import PrescriptionSettingsSkeleton from '../Skeletons/PrescriptionSettingsSkeleton';

export default function PrescriptionSettingsSection() {
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const {
    data: prescriptionSettings,
    isPending: isLoadingPrescriptionSettings,
    refetch: refetchPrescriptionSettings,
  } = useGetPrescriptionSettings();
  const {
    mutate: updatePrescriptionSettingsMutate,
    isPending: isUpdatingPrescriptionSettings,
  } = useUpdatePrescriptionSettings();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TPrescriptionSettingsSchemaType>({
    resolver: yupResolver(PrescriptionSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      clinic_id: '',
      header_type: 'default',
      header_text: '',
      footer_type: 'default',
      footer_text: '',
      signature_mode: 'upload',
    },
  });

  const headerType = watch('header_type');
  const footerType = watch('footer_type');
  const signatureMode = watch('signature_mode');
  const headerText = watch('header_text');
  const footerText = watch('footer_text');

  const onSubmit = (data: TPrescriptionSettingsSchemaType) => {
    const formData = new FormData();
    const clinicId = useAuthStore.getState().userData?.clinic?.id;
    if (!clinicId) return showErrorToast('Clinic not found');

    formData.append('header_type', data.header_type);
    if (data.header_type === 'html') {
      formData.append('header_text', data.header_text || '');
      formData.append('header_image', '');
    } else if (data.header_type === 'image') {
      if (headerFile) {
        formData.append('header_image', headerFile);
      }
      formData.append('header_text', '');
    } else {
      formData.append('header_text', '');
      formData.append('header_image', '');
    }

    formData.append('footer_type', data.footer_type);
    if (data.footer_type === 'html') {
      formData.append('footer_text', data.footer_text || '');
      formData.append('footer_image', '');
    } else if (data.footer_type === 'image') {
      if (footerFile) {
        formData.append('footer_image', footerFile);
      }
      formData.append('footer_text', '');
    } else {
      formData.append('footer_text', '');
      formData.append('footer_image', '');
    }

    formData.append('signature_mode', data.signature_mode);
    if (data.signature_mode === 'upload') {
      if (signatureFile) {
        formData.append('signature_image', signatureFile);
      }
    } else {
      formData.append('signature_image', '');
    }

    updatePrescriptionSettingsMutate(formData, {
      async onSuccess(res) {
        if (res?.success) {
          await refetchPrescriptionSettings();
        }
      },
    });
  };

  useEffect(() => {
    if (prescriptionSettings) {
      reset({
        clinic_id: prescriptionSettings.clinic_id
          ? String(prescriptionSettings.clinic_id)
          : '',
        header_type:
          (prescriptionSettings.header_type as 'default' | 'html' | 'image') ||
          'default',
        header_text: prescriptionSettings.header_text || '',
        footer_type:
          (prescriptionSettings.footer_type as 'default' | 'html' | 'image') ||
          'default',
        footer_text: prescriptionSettings.footer_text || '',
        signature_mode:
          (prescriptionSettings.signature_mode as 'upload' | 'none') ||
          'upload',
      });
    }
  }, [prescriptionSettings, reset]);

  if (isLoadingPrescriptionSettings) {
    return <PrescriptionSettingsSkeleton />;
  }

  return (
    <Box
      component="form"
      className="form-card"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <BannerModeField
        name="prescription-header"
        title="Prescription Header"
        defaultNote="The default clinic banner (clinic name, address, contact info, doctor info) will be used."
        modeValue={headerType}
        onModeChange={(mode) =>
          setValue('header_type', mode as any, { shouldValidate: true })
        }
        textValue={headerText || ''}
        onTextChange={(e) =>
          setValue('header_text', e.target.value, { shouldValidate: true })
        }
        file={headerFile}
        onFileChange={setHeaderFile}
        existingImageUrl={prescriptionSettings?.header_image_url}
        error={errors.header_text?.message}
      />
      <BannerModeField
        name="prescription-footer"
        title="Prescription Footer"
        defaultNote="The default footer (prescription code, clinic info, signature line) will be used."
        modeValue={footerType}
        onModeChange={(mode) =>
          setValue('footer_type', mode as any, { shouldValidate: true })
        }
        textValue={footerText || ''}
        onTextChange={(e) =>
          setValue('footer_text', e.target.value, { shouldValidate: true })
        }
        file={footerFile}
        onFileChange={setFooterFile}
        existingImageUrl={prescriptionSettings?.footer_image_url}
        error={errors.footer_text?.message}
      />
      <SignatureUploadField
        name="prescription-signature"
        title="Doctor Signature"
        description="Choose how the signature area appears on every prescription PDF."
        hint="JPEG, PNG, GIF — max 2 MB. Use a transparent PNG for best results. Recommended size 300 × 80 px — the signature is displayed at max 200 × 60 px on the PDF."
        modeValue={signatureMode}
        onModeChange={(mode) =>
          setValue('signature_mode', mode as any, { shouldValidate: true })
        }
        file={signatureFile}
        onFileChange={setSignatureFile}
        existingImageUrl={prescriptionSettings?.signature_image_url}
      />
      <FormActions
        saveLabel="Save Settings"
        showCheck
        loading={isUpdatingPrescriptionSettings}
        disabled={isUpdatingPrescriptionSettings}
      />
    </Box>
  );
}
