'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  useCreateInvoiceSettings,
  useInvoiceSettings,
} from '@/hooks/react-query/invoices/invoices.hooks';
import { showErrorToast } from '@/lib/commons/toast';
import {
  InvoiceSettingsSchema,
  type TInvoiceSettingsSchemaType,
} from '@/lib/schemas/invoiceSettings.schema';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BannerModeField from '../parts/BannerModeField';
import FormActions from '../parts/FormActions';
import SignatureUploadField from '../parts/SignatureUploadField';
import InvoiceSettingsSkeleton from '../Skeletons/InvoiceSettingsSkeleton';

const gstOptions = [
  { value: 'None', label: 'None (No GST)' },
  { value: 'Intra-State', label: 'Intra-State (CGST+SGST)' },
  { value: 'Inter-State', label: 'Inter-State (IGST)' },
];

export default function InvoiceSettingsSection() {
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const {
    data: invoiceSetting,
    isPending: isLoadingInvoiceSetting,
    refetch: refetchInvoiceSetting,
  } = useInvoiceSettings();
  const { mutate: saveInvoiceSettings, isPending: saveInvoiceSettingsPending } =
    useCreateInvoiceSettings();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TInvoiceSettingsSchemaType>({
    resolver: yupResolver(InvoiceSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      clinic_id: '',
      header_type: 'default',
      header_text: '',
      header_note: '',
      footer_type: 'default',
      footer_text: '',
      footer_note: '',
      terms_conditions: '',
      invoice_prefix: 'INV',
      gst_type: 'None',
      signature_mode: 'upload',
    },
  });

  const headerType = watch('header_type');
  const footerType = watch('footer_type');
  const signatureMode = watch('signature_mode');
  const headerText = watch('header_text');
  const footerText = watch('footer_text');

  const onSubmit = (data: TInvoiceSettingsSchemaType) => {
    const formData = new FormData();
    const clinicId = useAuthStore.getState().userData?.clinic?.id;
    if (!clinicId) return showErrorToast('Clinic not found');
    if (clinicId) {
      formData.append('clinic_id', String(clinicId));
    }

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

    formData.append('terms_conditions', data.terms_conditions || '');
    formData.append('invoice_prefix', data.invoice_prefix || 'INV');
    formData.append('gst_type', data.gst_type);

    saveInvoiceSettings(formData, {
      async onSuccess(res) {
        if (res?.success) {
          await refetchInvoiceSetting();
        }
      },
    });
  };

  useEffect(() => {
    if (invoiceSetting) {
      reset({
        clinic_id: invoiceSetting.clinic_id
          ? String(invoiceSetting.clinic_id)
          : '',
        header_type:
          (invoiceSetting.header_type as 'default' | 'html' | 'image') ||
          'default',
        header_text: invoiceSetting.header_text || '',
        header_note: invoiceSetting.header_note || '',
        footer_type:
          (invoiceSetting.footer_type as 'default' | 'html' | 'image') ||
          'default',
        footer_text: invoiceSetting.footer_text || '',
        footer_note: invoiceSetting.footer_note || '',
        terms_conditions: invoiceSetting.terms_conditions || '',
        invoice_prefix: invoiceSetting.invoice_prefix || 'INV',
        gst_type:
          (invoiceSetting.gst_type as 'None' | 'Intra-State' | 'Inter-State') ||
          'None',
        signature_mode:
          (invoiceSetting.signature_mode as 'upload' | 'none') || 'upload',
      });
    }
  }, [invoiceSetting, reset]);

  if (isLoadingInvoiceSetting) {
    return <InvoiceSettingsSkeleton />;
  }

  return (
    <Box
      component="form"
      className="form-card"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <BannerModeField
        name="invoice-header"
        title="Invoice Header"
        defaultNote="The default invoice banner (clinic name, address, contact info, invoice number strip) will be used."
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
        existingImageUrl={invoiceSetting?.header_image_url}
        error={errors.header_text?.message}
      />
      <BannerModeField
        name="invoice-footer"
        title="Invoice Footer"
        defaultNote="The default footer (terms, signature line, bottom band) will be used."
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
        existingImageUrl={invoiceSetting?.footer_image_url}
        error={errors.footer_text?.message}
      />
      <Box>
        <Box className="label-row">
          <Typography component="p" className="field-label">
            Terms & Conditions
          </Typography>
          <span className="optional-pill">Optional</span>
        </Box>
        <Controller
          name="terms_conditions"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              value={field.value ?? ''}
              multiline
              minRows={3}
              placeholder="Enter any terms or conditions you want printed on the invoice..."
              error={!!errors.terms_conditions}
              helperText={errors.terms_conditions?.message}
            />
          )}
        />
      </Box>
      <SignatureUploadField
        name="invoice-signature"
        title="Authorized Signature"
        description="Choose how the signature area appears on every invoice PDF."
        hint="JPEG, PNG, GIF — max 2 MB. Use a transparent PNG for best results. Recommended size 240 × 90 px — the signature is displayed at max 160 × 52 px on the PDF."
        modeValue={signatureMode}
        onModeChange={(mode) =>
          setValue('signature_mode', mode as any, { shouldValidate: true })
        }
        file={signatureFile}
        onFileChange={setSignatureFile}
        existingImageUrl={invoiceSetting?.signature_image_url}
      />
      <Box>
        <Box className="label-row">
          <Typography component="p" className="field-label">
            <ReceiptLongOutlinedIcon />
            Default GST Type
          </Typography>
        </Box>
        <Typography component="p" className="block-copy">
          Applied by default when creating new invoices.
        </Typography>
        <Controller
          name="gst_type"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              value={field.value ?? 'None'}
              select
              error={!!errors.gst_type}
              helperText={errors.gst_type?.message}
            >
              {gstOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomInput>
          )}
        />
      </Box>
      <FormActions
        saveLabel="Save Settings"
        showCheck
        loading={saveInvoiceSettingsPending}
        disabled={saveInvoiceSettingsPending}
      />
    </Box>
  );
}
