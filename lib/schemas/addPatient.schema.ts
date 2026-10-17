import * as yup from 'yup';

const TEN_DIGITS = /^\d{10}$/;

const isTenDigits = (val?: string) =>
  !!val && TEN_DIGITS.test(val.replace(/\D/g, ''));

export const AddPatientSchema = yup.object().shape({
  // Mode
  selectionMode: yup
    .string()
    .oneOf(['create_new', 'existing_user'])
    .default('create_new')
    .required('Selection mode is required'),
  selected_user_id: yup
    .number()
    .nullable()
    .when('selectionMode', {
      is: 'existing_user',
      then: (schema) => schema.required('Please select an existing user'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
  profile_image: yup.mixed().optional().nullable(),

  // Basic Info
  name: yup
    .string()
    .trim()
    .when('selectionMode', {
      is: 'create_new',
      then: (schema) => schema.required('Full name is required'),
      otherwise: (schema) => schema.optional(),
    }),
  date_of_birth: yup.date().optional(),
  gender: yup.string().when('selectionMode', {
    is: 'create_new',
    then: (schema) => schema.required('Gender is required'),
    otherwise: (schema) => schema.optional(),
  }),
  blood_group: yup.string().optional(),
  status: yup.string().oneOf(['active', 'inactive']).default('active'),

  // Medical Info
  medical_history: yup.string().optional(),

  // Contact Info
  phone: yup
    .string()
    .trim()
    .when('selectionMode', {
      is: 'create_new',
      then: (schema) =>
        schema
          .required('Phone number is required')
          .test('is-10-digits', 'Phone number must be 10 digits', isTenDigits),
      otherwise: (schema) => schema.optional(),
    }),
  email: yup
    .string()
    .trim()
    .when('selectionMode', {
      is: 'create_new',
      then: (schema) =>
        schema
          .required('Email is required')
          .email('Enter a valid email address'),
      otherwise: (schema) => schema.optional(),
    }),
  alternate_number: yup
    .string()
    .trim()
    .optional()
    .test(
      'is-alt-10-digits',
      'Alternate number must be 10 digits',
      (val) => !val || isTenDigits(val),
    ),
  whatsapp_number: yup
    .string()
    .trim()
    .optional()
    .test(
      'is-wa-10-digits',
      'WhatsApp number must be 10 digits',
      (val) => !val || isTenDigits(val),
    ),

  // Address
  address: yup
    .string()
    .trim()
    .when('selectionMode', {
      is: 'create_new',
      then: (schema) => schema.required('Address is required'),
      otherwise: (schema) => schema.optional(),
    }),
  country: yup
    .string()
    .trim()
    .when('selectionMode', {
      is: 'create_new',
      then: (schema) => schema.required('Country is required'),
      otherwise: (schema) => schema.optional(),
    }),
  state: yup.string().optional(),
  city: yup.string().optional(),
  postal_code: yup.string().optional(),
});

export type TAddPatientSchemaType = yup.InferType<typeof AddPatientSchema>;
