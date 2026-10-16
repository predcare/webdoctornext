import * as yup from 'yup';

export type TProfileLocationOption = {
  id: string | number;
  name: string;
};

const locationOptionSchema = yup
  .object({
    id: yup.mixed<string | number>().required(),
    name: yup.string().trim().required(),
  })
  .nullable()
  .optional()
  .default(null);

export const UpdateDoctorProfileSchema = yup.object({
  street: yup.string().trim().optional().default(''),
  country: locationOptionSchema,
  state: locationOptionSchema,
  city: locationOptionSchema,
  postalCode: yup
    .string()
    .trim()
    .optional()
    .default('')
    .test(
      'is-valid-pincode',
      'Pincode must be 6 digits',
      (value) => !value || /^\d{6}$/.test(value),
    ),
  aboutMe: yup.string().trim().optional().default(''),
});

export type TUpdateDoctorProfileSchemaType = yup.InferType<
  typeof UpdateDoctorProfileSchema
>;
