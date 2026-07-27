# React Admin Template

A modern, production-ready admin dashboard template built with React, TypeScript, and a carefully curated stack of tools for building scalable, type-safe web applications.

## 📋 Overview

This project is a fully-featured admin dashboard template that serves as a starting point for building admin interfaces and data management applications. It includes authentication, multi-language support, theming, and pre-built data table components.

## 🏗️ Tech Stack

### Core Framework

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Strict type-safe development
- **Vite 7** - Lightning-fast build tool and dev server
- **SWC** - Ultra-fast JavaScript/TypeScript compiler for hot module replacement

### Routing & State Management

- **TanStack React Router** - Type-safe file-based routing with automatic code splitting
- **TanStack React Query (v5)** - Powerful server state management and caching
- **TanStack React Table (v8)** - Headless table component for complex data management

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Shadcn Components** - Pre-built accessible UI components
- **Phosphor Icons** - Beautiful, customizable icon library
- **Sonner** - Beautiful toast notifications

### Forms & Validation

- **React Hook Form** - Performant, flexible form handling
- **Zod** - TypeScript-first schema validation

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **Supported Languages**: English (en), Spanish (es)

### Additional Libraries

- **date-fns & dayjs** - Date manipulation utilities
- **js-cookie** - Cookie handling
- **next-themes** - Theme management (light/dark/system)
- **class-variance-authority** - CSS utility composition
- **clsx & tailwind-merge** - Class name utilities

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting with import sorting
- **TypeScript Strict Mode** - Maximum type safety

## 📁 Project Structure

```
src/
├── core/                    # Shared core utilities
│   ├── api/                 # HTTP request handling and API utilities
│   ├── components/          # Reusable UI components
│   │   ├── data/           # Data table components (paginator, search, etc.)
│   │   ├── form-fields/    # Form field components
│   │   └── ui/             # Basic UI primitives
│   ├── constants/          # App-wide constants
│   ├── errors/             # Error definitions
│   ├── hooks/              # Reusable React hooks
│   ├── lib/                # Utility functions
│   └── types/              # Shared TypeScript types
├── layout/                  # Layout components and theme system
│   ├── components/         # Layout UI (header, sidebar, breadcrumb)
│   ├── contexts/           # Theme provider context
│   ├── hooks/              # Layout-related hooks
│   └── lib/                # Layout utilities
├── modules/                 # Feature modules
│   ├── auth/               # Authentication module
│   ├── dummies/            # Sample feature module for reference
│   └── shared/             # Shared module components
├── routes/                  # File-based routing structure
│   ├── __root.tsx          # Root route with app layout
│   └── app/                # Protected routes
├── locales/                 # i18n translation files
│   ├── en/                 # English translations
│   └── es/                 # Spanish translations
├── styles/                  # Global styles
├── i18n.ts                 # i18next configuration
├── main.tsx                # Application entry point
└── project.config.ts       # Project configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (22+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🔐 Authentication

The template includes a complete authentication system:

- **JWT-based authentication** with access and refresh tokens
- **Automatic token refresh** on 401 responses
- **Secure token storage** using cookies
- **Protected routes** with authentication context
- **Role-based access control** ready for extension

### Making Authenticated Requests

```typescript
import { request } from '@/core/api/request';

const data = await request<UserType>('GET', '/users', {
  query: { page: 1 },
});
```

## 🌍 Internationalization

The app supports multiple languages with easy switching:

- Default language detection from user preferences
- Language switching through `useTranslation()` hook
- Translation files organized by language in `src/locales/`

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
i18n.changeLanguage('es'); // Switch to Spanish
```

## 🎨 Theme Support

Built-in dark/light/system theme support:

```typescript
import { useTheme } from '@/layout/hooks/use-theme';

const { theme, setTheme } = useTheme();
setTheme('dark');
```

## 📊 Data Tables

Pre-built data table components with:

- Sorting and filtering
- Server-side pagination
- Search functionality
- Row selection with checkboxes
- Customizable columns

## 🐳 Deployment

### Docker

The project includes a multi-stage Dockerfile for optimized production builds:

```bash
# Build image
docker build -t react-admin:latest .

# Run container
docker run -p 80:80 react-admin:latest
```

Nginx serves the SPA with proper routing configuration for hash-based navigation.

## 🔧 Configuration

Key configuration files:

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - Linting rules
- `prettier.config.js` - Code formatting
- `tailwind.config.js` - Tailwind CSS configuration
- `src/project.config.ts` - Application configuration (API URL, branding, etc.)

### Environment Variables

```bash
# API Configuration
VITE_BASE_API_URL=http://api.example.com

# Router Configuration
VITE_BROWSER_HISTORY=true  # Use browser history instead of hash history
```

## 📝 Development Guidelines

- Use **TanStack Router** for all routing - avoid manual route management
- Leverage **React Query** for server state - use hooks from `useQuery`, `useMutation`
- Keep components **small and focused** - extract reusable components to `core/components`
- Use **Zod schemas** for API validation and form validation
- Add translations to locale files instead of hardcoding strings
- Follow the **modular structure** - group related features in `modules/`

## 🤝 Contributing

- Run `pnpm lint` before committing
- Run `pnpm format` to format code
- Follow TypeScript strict mode practices
- Add translations for new user-facing strings

## 📄 License

This project is private and proprietary.
