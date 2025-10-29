## Ubukwe Frontend Guide

This document explains the current frontend structure, completed features, primary flows, and proposes pragmatic improvements inspired by production-grade projects.

### Tech Stack
- Next.js App Router (app/)
- TypeScript + React (client components for interactive screens)
- Tailwind CSS + shadcn/ui primitives
- lucide-react icons

### High-Level Architecture
- app/ contains route-based pages for customer, provider, admin, services, booking, and auth flows.
- components/ hosts reusable UI and feature modules for each dashboard domain.
- Sidebars and headers are shared across routes with role-specific variants.

### Routing Overview (App Router)
- app/page.tsx: Landing/home
- app/about/page.tsx: About page
- app/auth/signin and app/auth/signup: Auth entry
- app/services: Services discovery
- app/booking/[serviceId]: Booking flow for a specific service
- app/customer/dashboard: Customer dashboard
- app/provider/dashboard: Provider dashboard
- app/admin/dashboard: Admin dashboard
- Global error handling: app/error.tsx, app/not-found.tsx

Each dashboard route now includes a sticky white header, white sidebars, and a page background of #f9fafc.

### Directory Map (Key)
- components/ui/
  - dashboard-header.tsx: Generic header (bg-white)
  - dashboard-sidebar.tsx: Customer sidebar (accordion groups with icons, state persisted)
  - provider-tabs-sidebar.tsx: Provider sidebar (accordion groups with icons, state persisted)
  - admin-tabs-sidebar.tsx: Admin sidebar (accordion groups with icons, state persisted)
  - empty-state.tsx: Reusable empty state block
  - coming-soon.tsx: Simple “coming soon” banner
- components/dashboard/
  - Feature slices used in the customer dashboard: overview, planning, services, bookings, budget, vendor marketplace, guest & venue management, messages hub, photography booking, wedding inspiration, comprehensive planning.
- components/provider/
  - overview.tsx, services.tsx, bookings.tsx, earnings.tsx, profile.tsx used by provider dashboard.
- components/admin/
  - overview.tsx, users.tsx, providers.tsx, bookings.tsx, disputes.tsx, analytics.tsx used by admin dashboard.
- hooks/
  - useAuth (referenced in dashboards) to access user data and logout.

### Completed UI/UX Work
- Standardized backgrounds:
  - Page wrapper: #f9fafc
  - Headers/sidebars: white with borders and subtle shadows
- Sidebars improved:
  - Professional spacing, subtle hover, left active indicator
  - Collapsible groups (accordion) with icons per category
  - Group open/closed state persisted in localStorage
  - Collapsed mode preserves quick access via icons
- Global UX hardening:
  - loading.tsx for provider and admin dashboards
  - error.tsx and not-found.tsx for better failure and 404 handling
  - EmptyState component for consistent no-data views

### Primary Flows
- Customer Dashboard
  - Uses DashboardSidebar + sticky header
  - Tabs: Overview, Vendors, Planning, Guests, Venue, Bookings, Budget, Messages, Inspiration, Photography
  - Feature components render via renderContent() switch on activeTab
- Provider Dashboard
  - Uses ProviderTabsSidebar + sticky header
  - Tabs: Overview, Services, Bookings, Earnings, Profile
- Admin Dashboard
  - Uses AdminTabsSidebar + sticky header
  - Tabs: Overview, Users, Providers, Bookings, Disputes, Analytics

### Styling & Theming
- Tailwind classes with shadcn/ui primitives provide consistent spacing, borders, and states
- Icons via lucide-react
- “Muted” background for active sidebar items and hover states

### How to Run Locally (typical)
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Suggested Improvements (Production-inspired)

1) Data + State
- Introduce data fetching layer (tRPC/React Query/SWR) and replace mock data
- Normalize contracts with strong types (Zod) and surface errors via toasts
- Add optimistic updates and skeletons for key interactions (bookings, messages)

2) Auth & Access Control
- Gate dashboards with role-based middleware and route groups
- Ensure server-side session validation for sensitive pages

3) Navigation & URL State
- Deep-link tabs using the querystring or nested routes to enable shareable links
- Persist activeTab to URL or storage to restore user context

4) Accessibility & Internationalization
- Add semantic labels for buttons (aria-labels) and keyboard navigation support for sidebars
- Consider i18n (e.g., next-intl) for multilingual support

5) Design System
- Extract tokens (spacing, colors, radii) and consolidate typography
- Promote EmptyState, SectionHeader, DataList, StatCard, and Table into a shared design system folder

6) Error Boundaries & Metrics
- Add per-route error.tsx for dashboard sub-routes
- Integrate client error reporting (e.g., Sentry) and performance monitoring (e.g., Web Vitals)

7) Forms & Validation
- Wrap forms with react-hook-form + zod schemas across booking, profile, services
- Add field-level errors, disabled states, and submission spinners

8) Real-time & Notifications
- Add WebSocket or SSE for messages and live booking status
- Central Notification center with toasts and inbox view

9) File Handling & Images
- Use Next Image with optimization and fallbacks; standardize placeholder handling
- Drag-and-drop uploads with image preview and server validation

10) Testing & Quality
- Add unit tests (vitest/jest) for UI logic (sidebar behavior, tab switching)
- Add Playwright/Cypress for critical flows (auth, booking)

11) Performance
- Code-split heavy dashboard sections
- Memoize expensive lists and virtualize long tables

12) Security
- Sanitize user-generated content (messages)
- Guard server actions and API routes with role checks and rate limiting

### Quick Wins You Can Do Next
- Convert dashboard tab state to URL-driven routes for deep-linking
- Replace mock provider/customer data with typed fetches and skeleton loaders
- Adopt EmptyState in lists with zero results (bookings, services)
- Extract shared sidebar configuration to a single source to avoid duplication

---
This README should help future contributors quickly understand layout, flows, and where to extend the app. For any questions, open an issue or leave inline TODOs near the relevant component.


