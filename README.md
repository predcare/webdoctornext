# PredCare - Doctor Portal Web Application

Welcome to the **PredCare Doctor Portal**, an enterprise-grade clinical management and healthcare provider web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Material UI (MUI v9)**.

The portal provides medical practitioners with tools to manage patient care, schedule appointments, conduct video consultations, issue digital prescriptions, handle electronic medical records (EMR), generate invoices, and configure clinic availability.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Framework & Styling**:
  - [Material UI (MUI v9)](https://mui.com/material-ui/) (`@mui/material`, `@mui/icons-material`, `@mui/material-nextjs`)
  - [Emotion](https://emotion.sh/) (`@emotion/react`, `@emotion/styled`)
  - [Styled Components](https://styled-components.com/)
  - Custom Dual Theme Engine (Light & Dark modes)
- **Server State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Client State Management**: [Zustand v5](https://zustand.docs.pmnd.rs/) with state persistence
- **HTTP Client**: [Axios](https://axios-http.com/) with centralized request/response interceptors & global event-bus error handling
- **Form Management & Validation**: [React Hook Form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup)
- **Security & Storage**: [CryptoJS](https://cryptojs.gitbook.io/docs/) (AES-encrypted client storage) & [Nookies](https://github.com/maticzav/nookies) (cookie management)
- **Date & Time**: [Day.js](https://day.js.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Event Bus**: [EventEmitter3](https://github.com/primus/eventemitter3)

---

## ✨ Key Features & Clinical Modules

1. **Authentication & Session Security**
   - OTP-based login workflows (`/auth/request-login-otp`, `/auth/verify-login-otp`).
   - Secure token storage via encrypted cookies and local storage.
   - Centralized 401 handling with event emitter-driven automatic logout and redirection.

2. **Patient Management & Electronic Medical Records (EMR)**
   - Doctor's patient roster with full profile details and family member relationships.
   - Patient linking and registration workflows.
   - Electronic medical records (EMR) upload, review, and visibility/sharing controls.

3. **Appointments & Teleconsultation**
   - Appointment tracking across states (Scheduled, In-Progress, Completed, Cancelled).
   - Rescheduling and manual booking capabilities.
   - WebRTC / Video consultation token retrieval (`/video-token`) with call heartbeat monitoring and logging.
   - Statistical performance overview for appointments.

4. **Digital Prescriptions**
   - Rich prescription creation and draft upserting.
   - Instant sharing directly to patient channels.
   - PDF generation and export for physical or digital records.

5. **Invoicing & Practice Billing**
   - Manual invoice creation and line-item billing.
   - Practice invoice management and doctor revenue statistics.
   - Automated PDF invoice generation and download.

6. **Doctor Availability & Slot Management**
   - Weekly recurring availability slots (Monday through Sunday).
   - Custom calendar dates and duration configuration (5 to 1440 mins).
   - Real-time slot calculation and overview.

7. **Design System & Component Library**
   - Dynamic dark and light theme switching backed by Zustand store (`useThemeStore`).
   - Reusable UI component suite:
     - `CustomInput`: Validated text, select, radio, phone, and password inputs.
     - `CustomModal`: Accessible modal dialog system with animations.
     - `CustomTable`: Advanced data table with search, sorting, and pagination.
     - `CustomTabsGroup`: Scrollable pill-shaped tabs with badge counters and icons.
     - `EmptyState`: Modular zero-data placeholder with customizable icons and typography.
     - `CommonErrorText`: Standardized inline validation and error messages.
     - Custom SVG icons (`NoFoundIcon`, `CloseIcon`, `PasswordVisibilityIcon`, etc.).

---

## 📁 Project Architecture & Directory Structure

```text
predcare-doctor-web/
├── app/                        # Next.js App Router root
│   ├── (auth)/                 # Authentication route group
│   │   ├── auth/
│   │   │   ├── doctor/login/   # Doctor Login route (/auth/doctor/login)
│   │   │   └── patient/login/  # Patient Login route (/auth/patient/login)
│   │   └── layout.tsx          # Centered layout shell for authentication views
│   ├── (cms)/                  # Content and public informational pages
│   ├── (dashboard)/            # Authenticated doctor workspace & portal routes
│   ├── globals.css             # Base reset and typography styling
│   └── layout.tsx              # Root HTML layout with providers (MUI, Theme, Query)
├── components/                 # Shared UI components
│   ├── Providers/              # Application providers (ReactQueryProvider, etc.)
│   ├── commons/                # Common utility components
│   │   ├── CommonErrorText/    # Reusable validation error text
│   │   └── EmptyState/         # Zero-data & empty state displays
│   └── ui/                     # Core design system components
│       ├── CustomInput/        # Validated input fields (text, select, phone, radio)
│       ├── CustomModal/        # Accessible modal dialog system
│       ├── CustomTable/        # Advanced data table with search, sort & pagination
│       ├── CustomTabsGroup/    # Scrollable pill-style tabs with badge counts
│       └── Icons/              # Custom SVG icon set (NoFoundIcon, CloseIcon, etc.)
├── configs/                    # Global configurations & constants
│   ├── constants.ts            # Media limits, country codes, currencies, day lists
│   ├── keys.constants.ts       # Storage keys, environment flags, tokens
│   └── navItems.ts             # Navigation hierarchy and footer links
├── hooks/                      # Custom reusable React hooks
│   └── commons/                # Utility hooks (useDebounce, useEventEmitter)
├── layouts/                    # Structural layout components
│   ├── Header/                 # Navigation header bar
│   ├── Footer/                 # Portal footer component
│   └── Wrapper/                # Page shell wrapper combining Header and Footer
├── lib/                        # Utility libraries and helpers
│   ├── commons/                # Cookie helpers and toast triggers
│   ├── functions/              # Encrypted storage (CryptoJS) & response handlers
│   └── services/               # Global event bus (EventEmitter3)
├── routes/                     # Centralized project route definitions
│   └── index.ts                # Application route map (including auth routes)
├── services/                   # API networking layer
│   └── api/
│       ├── apiClient.ts        # Axios client instance with auth & error interceptors
│       └── endpoints.ts        # Centralized REST API endpoints
├── styles/                     # Styled components & custom CSS-in-JS abstractions
│   └── CustomStyled/           # CustomTabsWrapper and specialized styled elements
├── themes/                     # Material UI theme customizations
│   ├── _colorPalette.ts        # Light and dark color palettes
│   ├── _commonStyle.ts         # Global CSS style rules
│   ├── _projectTheme.ts        # MUI component overrides & typography
│   ├── ProjectThemeProvider.tsx# Dynamic ThemeProvider with Zustand integration
│   └── createEmotionCache.ts   # Emotion cache configuration for SSR
├── typescripts/                # TypeScript interfaces, types, and enums
│   ├── enums/                  # Network, status, and system enums
│   ├── interfaces/             # Domain entities (IIconProps, Appointments, etc.)
│   └── types/                  # General type aliases
└── zustand/                    # State management stores
    └── stores/                 # useThemeStore and client state
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# API & Backend Configuration
NEXT_APP_BASE_URL=https://api-dev.predcare.in
NEXT_PUBLIC_FILE_URL=https://api-dev.predcare.in/storage

# Security & Encryption
NEXT_PUBLIC_PERSIST_SECRET_KEY=your_encryption_secret_key_here
NEXT_PUBLIC_PROJECT_TOKEN=_predcare_doctor_token

# Application URLs
NEXT_APP_FRONTEND_URL=http://localhost:3000
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher recommended
- **Package Manager**: `npm` (v10+), `yarn`, `pnpm`, or `bun`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd predcare-doctor-web

# Install project dependencies
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command         | Description                                             |
| :-------------- | :------------------------------------------------------ |
| `npm run dev`   | Runs the Next.js development server with hot-reload     |
| `npm run build` | Builds the optimized production application             |
| `npm run start` | Starts the production server                            |
| `npm run lint`  | Runs ESLint to verify code quality and rule conformance |

---

## 🌐 Network & API Handling

- **Base Endpoint**: `https://api-dev.predcare.in/api/v1`
- **Request Interceptor**: Automatically attaches the bearer token retrieved from secure cookie storage.
- **Response Interceptor**:
  - Automatically displays success notifications for mutation endpoints (`post`, `put`, `patch`, `delete`).
  - Intercepts `401 Unauthorized` responses and fires `logoutCurrentUser` through `eventEmitter` to safely reset state.
  - Handles network drops gracefully with rate-limited alerts.

---

## 👥 Contributing & Conventions

- Follow the project's TypeScript types defined in `typescripts/`.
- Use the predefined UI components in `components/ui/` for consistency.
- Maintain theme token usage from `themes/` instead of hardcoded hex colors.
- Follow Git branching workflows and keep commits atomic and descriptive.
