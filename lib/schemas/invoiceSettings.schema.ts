import * as yup from 'yup';

export const InvoiceSettingsSchema = yup.object().shape({
  clinic_id: yup.string().optional().nullable(),
  header_type: yup
    .string()
    .oneOf(['default', 'html', 'image'])
    .default('default')
    .required(),
  header_text: yup.string().optional().nullable(),
  header_note: yup.string().optional().nullable(),
  header_image: yup.mixed<File>().optional().nullable(),
  footer_type: yup
    .string()
    .oneOf(['default', 'html', 'image'])
    .default('default')
    .required(),
  footer_text: yup.string().optional().nullable(),
  footer_note: yup.string().optional().nullable(),
  footer_image: yup.mixed<File>().optional().nullable(),
  terms_conditions: yup.string().optional().nullable(),
  invoice_prefix: yup.string().default('INV').optional().nullable(),
  gst_type: yup
    .string()
    .oneOf(['None', 'Intra-State', 'Inter-State'])
    .default('None')
    .required(),
  signature_mode: yup
    .string()
    .oneOf(['upload', 'none'])
    .default('upload')
    .required(),
  signature_image: yup.mixed<File>().optional().nullable(),
});

export type TInvoiceSettingsSchemaType = yup.InferType<
  typeof InvoiceSettingsSchema
>;
