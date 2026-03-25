# AuditChain Frontend

A premium, high-performance banking interface built with React and Tailwind CSS. AuditChain provides users and auditors with a transparent view into the cryptographic integrity of their financial transactions.

## Key Features

- **Premium UI/UX**: High-contrast, light-blue and white theme with glassmorphism effects and smooth Framer Motion animations.
- **Auditor Dashboard**: Real-time visualization of the audit chain, system alerts, and AI-generated forensic summaries.
- **Transaction Portal**: Secure money transfers with instant feedback on cryptographic sealing.
- **Visual Integrity Indicators**: Status pings showing "Chain Intact" or "Tamper Detected" based on live backend verification.
- **Personalized Experience**: Dynamic user initial avatars and role-specific navigation.

## Tech Stack

- **Core**: React 18+ (Vite)
- **Styling**: Tailwind CSS 4.0 (Vanilla CSS with @theme)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors for JWT injection

## Environment Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8081
   ```

3. **Development Mode**:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components`: Reusable UI elements (Topbar, Sidebar, StatCards).
- `src/pages`: Feature-specific views (Landing, User Dashboard, Auditor Verify).
- `src/services`: API client configuration with environment mapping.
- `src/utils`: Authentication and storage helpers.

## Security Note

All API calls are secured via JWT tokens stored in `localStorage`. The frontend automatically handles 401 Unauthorized responses by redirecting to the login portal.

---
© 2026 AuditChain Labs | Modern Banking, Redefined.
