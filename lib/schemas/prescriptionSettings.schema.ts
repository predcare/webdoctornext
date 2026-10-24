import * as yup from 'yup';

export const PrescriptionSettingsSchema = yup.object().shape({
  clinic_id: yup.string().optional().nullable(),
  header_type: yup
    .string()
    .oneOf(['default', 'html', 'image'])
    .default('default')
    .required(),
  header_text: yup.string().optional().nullable(),
  header_image: yup.mixed<File>().optional().nullable(),
  footer_type: yup
    .string()
    .oneOf(['default', 'html', 'image'])
    .default('default')
    .required(),
  footer_text: yup.string().optional().nullable(),
  footer_image: yup.mixed<File>().optional().nullable(),
  signature_mode: yup
    .string()
    .oneOf(['upload', 'none'])
    .default('upload')
    .required(),
  signature_image: yup.mixed<File>().optional().nullable(),
});

export type TPrescriptionSettingsSchemaType = yup.InferType<
  typeof PrescriptionSettingsSchema
>;
