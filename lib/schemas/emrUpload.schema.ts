import * as yup from 'yup';

export const EMR_MAX_FILE_SIZE = 10 * 1024 * 1024;
export const EMR_ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
export const EMR_ACCEPT = EMR_ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',');

export interface TEMRUploadFormValues {
  category: string;
  title: string;
  file: File | null;
  notes?: string;
  shareWithPatient: boolean;
}

const getExtension = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? '';

export const emrUploadSchema: yup.ObjectSchema<TEMRUploadFormValues> = yup.object().shape({
  category: yup.string().trim().required('Category is required'),
  title: yup.string().trim().required('Document title is required'),
  file: yup
    .mixed<File>()
    .nullable()
    .defined('Please select a document file to upload')
    .test('file-required', 'Please select a document file to upload', (value) => !!value)
    .test(
      'file-type',
      'Allowed formats: PDF, DOC, DOCX, JPG, PNG',
      (value) => !value || EMR_ALLOWED_EXTENSIONS.includes(getExtension(value.name)),
    )
    .test(
      'file-size',
      'File size must be 10MB or less',
      (value) => !value || value.size <= EMR_MAX_FILE_SIZE,
    ),
  notes: yup.string().optional().max(1000, 'Notes must be 1000 characters or less').default(''),
  shareWithPatient: yup.boolean().default(true),
});
