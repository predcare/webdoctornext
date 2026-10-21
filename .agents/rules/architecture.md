# PredCare Doctor Portal — Architecture Rules

Follow this structure for every feature. Read `node_modules/next/dist/docs/` before using a Next.js API. This repo is Next.js 16 with the App Router.

---

## 1. Where Code Goes

| Concern | Location |
| --- | --- |
| URL, metadata, Suspense boundary | `app/(group)/.../page.tsx` |
| Screen UI and feature components | `components/Modules/<Feature>Module/` |
| Shared controls | `components/ui/<Control>/<Control>.tsx` |
| Cross-feature app pieces | `components/commons/<Name>/<Name>.tsx` |
| Layout chrome | `layouts/` and route-group `layout.tsx` |
| CSS-in-JS for a screen | `styles/CustomStyled/<Feature>Wrapper.tsx` |
| Paths | `routes/index.ts` (`projectRoutes`) |
| Domain types | `typescripts/interfaces/` and `typescripts/enums/` |
| Form schemas | `lib/schemas/` |
| Server state | `hooks/react-query/<domain>/` |
| Client state | `zustand/stores/` |
| HTTP | `services/api/apiClient.ts` and `services/api/endpoints.ts` |
| Env keys and storage key names | `configs/` |

Import with the `@/` alias (`@/*` → repo root). Do not add deep relative imports that climb out of a feature (`../../../services/...`) in new files.

---

## 2. Adding a Screen

1. Add the path to `projectRoutes`. Dynamic ids that the app already encodes go through `encodeUrlParam`.
2. Add `app/(dashboard)/dashboard/<feature>/page.tsx` (or the matching route group). Export `metadata`. Render the module component inside `Suspense` when the screen reads search params.
3. Build the screen as a client component in `components/Modules/<Feature>Module/`.
4. Add `<Feature>Wrapper` in `styles/CustomStyled/` if the screen needs layout styles.
5. Put request functions, query keys, and hooks in `hooks/react-query/<domain>/`. Put Yup schemas in `lib/schemas/`.

The dashboard layout already authenticates and frames the page. Auth screens stay in `AuthModule`. Public pages stay in `CmsModule` and render through `layouts/Wrapper`.

---

## 3. Module Boundaries

- A module owns its page, rows, filters, sections, skeletons, and constants.
- Do not import a screen component from one module into another. Share through `components/ui`, `components/commons`, or a hook.
- Skeletons live in a `Skeletons/` folder next to the screen they mirror.
- Constants used by one module stay in that module. App-wide constants stay in `configs/`.

---

## 4. Client and Server

- `page.tsx` stays a Server Component so it can export `metadata`.
- Add `'use client'` on the module screen, styled wrapper, and any component that uses hooks, events, or browser APIs.
- Do not fetch clinical data in a Server Component with a new client. Data loading goes through the axios instance and React Query hooks.
- Navigation uses `next/link` and `useRouter` from `next/navigation`, with `projectRoutes` for the href.

---

## 5. Naming

- Module folders: `<Feature>Module` (match neighbors: `PatientsModule`, `AppointmentsModule`).
- Page components: `<Feature>Page.tsx` default export.
- Styled roots: `<Feature>Wrapper`.
- Hooks: `use<Action>` in `*.hooks.ts`. Request functions live in `*.funcs.ts`.
- Schemas: `<Name>Schema` and `T<Name>SchemaType` via `yup.InferType`.

Existing misspelled folders stay as they are unless the task is a dedicated rename.

---

## 6. Component Internal Structure (Top-to-Bottom Order)

Inside all page and feature components, maintain this order. Keep the order in the code. Do not add section comments such as `// 1. States & Refs`.

1. **States & Refs**: `useState` and `useRef` always at the top.
2. **Hooks**: Router (`useRouter`), stores (`zustand`), queries/mutations (`useQuery`, `useMutation`), forms (`useForm`).
3. **useMemo, useCallback & Functions**: `useMemo`, `useCallback`, event handlers, action triggers, and computation helpers.
4. **useEffects**: All `useEffect` hooks (form resets, subscriptions, scroll listeners) placed after helper functions.
5. **Render Guards & JSX**: Skeleton/loading returns and the primary JSX return statement.

