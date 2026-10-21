# PredCare Doctor Portal — Data, Forms, and State

Use the existing data path. Do not add a second HTTP client, query library, form library, or toast system.

---

## 1. HTTP

- Call the API through `axiosInstance` from `services/api/apiClient.ts`. It attaches the bearer token and `x-clinic-id`.
- Add every path to `endpoints` in `services/api/endpoints.ts`. Do not inline URL strings in components.
- Success and error toasts for mutating endpoints are emitted by the response interceptor (`globalSuccess`, `globalWarning`, `globalError`) when the path is listed in `successEndpoints`. Do not fire a second success toast after those calls.
- 401 handling and logout redirection already live in the interceptor and `EventListener`. Do not handle unauthorized responses inside a screen.

---

## 2. React Query

Each domain folder under `hooks/react-query/<domain>/` splits files this way:

- `*.funcs.ts` — axios calls and param types
- `*.hooks.ts` — `useQuery`, `useInfiniteQuery`, `useMutation`
- `payload.interfaces.ts` — request bodies when they are not already in `typescripts/`
- Query key enums in `hooks/react-query/query.keys.ts`

```ts
export const useMyPatientList = (params?: IGetMyPatientsParams) =>
  useQuery({
    queryKey: [PatientsQueryKeys.PatientsList, params],
    queryFn: () => getMyPatientsList(params),
  });
```

- Include the params object in the query key.
- Gate queries that need an id with `enabled: !!params?.id`.
- Invalidate the matching query key after a mutation instead of refetching ad hoc in the component.
- Map response rows in the hook (`select`) or in the func, not by reshaping API payloads inside JSX.

---

## 3. Forms

- Schema: Yup object in `lib/schemas/<name>.schema.ts`.
- Type: `export type TAddPatientSchemaType = yup.InferType<typeof AddPatientSchema>`.
- Form: `useForm` from `react-hook-form` with `@hookform/resolvers/yup`, `mode: 'onBlur'`, and explicit `defaultValues`.
- Bind fields with `Controller` to the shared inputs (`CustomInput`, `CustomSelect`, and the other `components/ui` controls).
- Show field errors with `CommonErrorText`.

```tsx
const { control, handleSubmit, formState: { errors } } = useForm<TAddPatientSchemaType>({
  resolver: yupResolver(AddPatientSchema),
  mode: 'onBlur',
  defaultValues: { selectionMode: 'create_new', name: '' },
});
```

---

## 4. Client State

Zustand stores live in `zustand/stores/`:

| Store | Holds |
| --- | --- |
| `useAuthStore` | Session user |
| `useClinicStore` | Active clinic id sent as `x-clinic-id` |
| `useThemeStore` | `light` / `dark` mode |
| `useLoadingStore` | Global backdrop |
| `useAlertStore` | Global popup alert |

Do not duplicate session, clinic, or theme in component state or a new store. Persist only through the store that already persists.

---

## 5. Types

- API entity interfaces go in `typescripts/interfaces/<domain>.interfaces.ts`.
- Shared response wrappers (`IRootResponse`, pagination meta) stay in `typescripts/interfaces/common.interfaces.ts`.
- Do not declare a one-off duplicate of an existing patient, appointment, or prescription type inside a component.
