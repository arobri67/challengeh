# Documents Manager - React Native App

A mobile application for managing documents with real-time updates, built as part of a technical challenge using Expo Router and modern React Native development practices.

## 📱 Features

### ✅ Implemented Features

#### Required Features

- **Document List Display**: View recent documents in both list and grid layouts with toggle controls
- **Real-time Notifications**: Receive instant notifications when other users create new documents via WebSocket connection with unread count badge
- **Document Creation**: Add new documents with optimistic updates using React Hook Form and modal interface

#### Optional Features

- **Pull to Refresh**: Refresh document list by pulling down in both view modes
- **Relative Date Display**: Shows creation dates in human-readable format using `⁠date-fns` (e.g., "2 days ago")
- **Offline support**: When no network, cache is available (24 hours) to still see documents in UI
- **Native share functionality**: Native share button in list view

#### 🔄 Pending Features

- Local notifications
- Native share functionality

## 🏗️ Architecture & Design Decisions

    ```
    apps/
    ├── mobile/              # React Native app with Expo Router
    └── server/              # Go backend server
    ```

### Mobile App Structure

```
apps/mobile/
├── app/                 # Expo Router file-based routing
├── components/          # Feature-specific and UI components
├── hooks/               # Custom React hooks with TanStack Query
├── api/                 # API client and services
├── schema/              # Zod schemas for form validation
├── types/               # TypeScript type definitions
└── __tests__/           # Test files with Jest and Testing Library
```

### Key Design Decisions

- **TanStack Query:** Chosen for robust server state management, caching, and optimistic updates
- **React Hook Form + Zod:** Type-safe form handling with runtime validation
- **Expo Router:** File-based routing for better performance and developer experience
- **NativeWind:** Tailwind CSS for React Native with consistent design system
- **Custom WebSocket Hook:** Manual WebSocket management for real-time notifications
- **Optimistic Updates:** Graceful fallback when backend POST endpoint is unavailable

## 🛠️ Technology Stack

### Core Technologies

- **Expo Router**: File-based routing and navigation
- **React Native** 0.79.5: Latest stable version
- **TypeScript** 5.8.3: Full type safety
- **NativeWind** 4.1.23: Tailwind CSS for React Native

### State Management & Data Fetching

- **TanStack Query** 5.89.0: Server state management, caching, synchronization and offline support
- **React Hook Form** 7.63.0: Performant form handling
- **Zod** 4.1.11: Runtime type validation and schema definition

### UI & Design System

**React Native Primitives**: Accessible, unstyled components
**Lucide React Native**: Consistent icon system
**Class Variance Authority**: Component variant management
**Tailwind Merge**: Conditional class merging

### Development Tools

**Jest + Testing Library:** Comprehensive testing setup
**Date-fns**: Modern date manipulation library

## 🚀Getting Started

**Prerequisites**

- Node.js (v18 or higher) pnpm (recommended package manager)
- Expo CLI
- iOS Simulator or Android Emulator

**Installation**

- Clone the repository
- Install dependencies
  `pnpm install`
- Start Turborepo
  `pnpm dev`

**Development Commands**

```# Start development server (with cache clear)
pnpm dev

# Run on specific platforms
pnpm ios
pnpm android
pnpm web

# Run tests in watch mode
pnpm test

# Clean build artifacts
pnpm clean
```

## 🧪 Testing Strategy

```
apps/mobile/__tests__/
├── api/
│   └── client.test.ts          # API client functionality
├── hooks/
│   ├── use-create-doc.test.ts  # Document creation with optimistic updates
│   ├── use-documents-query.test.ts # TanStack Query integration
│   └── use-websockets.test.ts  # WebSocket connection management
└── setup.test.js               # Jest configuration
```

## 🔧 Third-Party Libraries - Rationale & Alternatives

### State Management & Data Fetching

**TanStack Query**

- Why needed: Complex server state management, caching, optimistic updates, and real-time synchronization

**Alternatives considered:**

- Redux Toolkit Query: More boilerplate, overkill for this scope
- SWR: Less powerful optimistic updates and mutation handling
- Native fetch + useState: Would require implementing caching, loading states, error handling manually

**Decision:** TanStack Query provides the exact features needed (optimistic updates, automatic caching) with minimal setup

**Zod**

- Why needed: Runtime type validation and schema-first form validation

**Alternatives considered:**

- Yup: Less TypeScript integration, different API
- Joi: Server-focused, heavier bundle

**Decision:** Perfect TypeScript integration and runtime safety, espacially when TypeSctipt is not present at runtime

### UI System & Styling

**NativeWind + Tailwind CSS**

- Why needed: Rapid UI development with consistent design system

**Alternatives considered:**

- StyleSheet: Verbose, no design system consistency
- Styled Components: Runtime overhead, larger bundle
- React Native Elements: Pre-built components but less customizable

**Decision**: Utility-first approach with compile-time optimization

**React Native Reusables (Shadcn/ui port)**

- Why needed: Professional UI components without bundle bloat

**Alternatives considered:**

- React Native Elements: Full library import, unused components

Decision: Copy-paste only needed components, full customization control

### Utilities & Helpers

**Date-fns**

- **Why needed**: Relative date formatting ("2 days ago") and date manipulation

**Alternatives considered:**

- Moment.js: Larger bundle, mutable API
- Native Date methods: Manual relative formatting implementation
- Day.js: Smaller but less comprehensive

_Decision:_ Modern, tree-shakeable, immutable API

**Semver**

- **Why needed:** Version comparison and sorting for documents

**Alternatives considered:**

- Manual string comparison: Error-prone for semantic versions
- Custom implementation: Reinventing the wheel

**Decision:** Standard library for version handling
