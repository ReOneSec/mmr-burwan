# MMR Burwan - Marriage Registration Portal

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Supabase%20%7C%20TypeScript-blueviolet)

**MMR Burwan** (Marriage Registrar Burwan) is a comprehensive, enterprise-grade digital platform designed to digitize and streamline the marriage registration process for the region of Burwan. It replaces legacy manual paperwork with a secure, transparent, and automated digital workflow, serving both citizens (applicants) and government officials (administrators).

---

## 📚 Table of Contents
1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Key Features & Workflows](#-key-features--workflows)
4. [Database Schema & Data Model](#-database-schema--data-model)
5. [Security & Privacy](#-security--privacy)
6. [Folder Structure](#-folder-structure)
<<<<<<< HEAD
7. [Getting Started & Deployment](#-getting-started--deployment)
=======
7. [Technical Highlights](#-technical-highlights)
8. [Getting Started & Deployment](#-getting-started--deployment)
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

---

## 🔭 Project Overview

The platform serves two primary user groups with distinct interfaces and permissions:

### 1. Applicants (Citizens)
- **Digital Application**: A guided, multi-step wizard to submit marriage details (Groom, Bride, Witnesses).
- **Document Vault**: Secure upload and management of ID proofs (Aadhaar, Voter ID, etc.).
- **Appointment Booking**: Real-time slot booking for physical verification at the registrar's office.
- **Status Tracking**: Live updates on application status (Draft → Submitted → Verified/Rejected).
- **Certificate Access**: Instant download of digitally signed marriage certificates.

### 2. Administrators (Officials)
- **Command Center**: A dashboard view of all applications with filtering and sorting.
<<<<<<< HEAD
- **Proxy Applications**: Ability to create accounts and applications on behalf of citizens (Walk-in applicants).
- **Verification Suite**: Tools to view documents side-by-side with application data for verification.
- **Rejection Management**: Granular rejection system with automated email notifications explaining the reason.
- **Certificate Issuance**: 
    - One-click generation of unique, traceable certificate numbers.
    - Automatic PDF generation with QR codes.
    - Strict duplicate prevention and history management.
=======
- **Verification Suite**: Tools to view documents side-by-side with application data for verification.
- **Rejection Management**: Granular rejection system with automated email notifications explaining the reason.
- **Certificate Issuance**: One-click generation of unique, traceable certificate numbers.
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

---

## 🏗 System Architecture

The project follows a **Modern Serverless Architecture** leveraging the **Supabase** ecosystem. This ensures high availability, scalability, and zero server management overhead.

### Tech Stack
- **Frontend**: 
    - **Framework**: React 18 (Vite) for high performance.
    - **Language**: TypeScript for type safety.
    - **Styling**: Tailwind CSS for responsive, utility-first design.
    - **State Management**: React Context API.
<<<<<<< HEAD
    - **PDF Generation**: `@react-pdf/renderer` for client-side certificate generation.
    - **Internationalization**: `react-i18next` (English & Bengali).
    - **Testing**: `Vitest` and `React Testing Library`.
- **Backend (BaaS)**: 
    - **Supabase**: Provides Auth, Database, Storage, and Realtime subscriptions.
- **Compute (Serverless)**: 
    - **Supabase Edge Functions**: Deno-based serverless functions for backend logic (Email sending, Proxy user creation).
=======
    - **Internationalization**: `react-i18next` (English & Bengali).
- **Backend (BaaS)**: 
    - **Supabase**: Provides Auth, Database, Storage, and Realtime subscriptions.
- **Compute (Serverless)**: 
    - **Supabase Edge Functions**: Deno-based serverless functions for backend logic (Email sending, complex validation).
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410
- **Communication**: 
    - **Resend.com**: Transactional email API for reliable delivery.

### Architecture Diagram
```mermaid
graph TD
    User[Applicant] -->|HTTPS| Frontend[React App]
    Admin[Administrator] -->|HTTPS| Frontend
    
    Frontend -->|REST/WebSocket| Supabase[Supabase Platform]
    
    subgraph Supabase Services
        Auth["Authentication (JWT)"]
        DB[(PostgreSQL Database)]
        Storage["File Storage (S3-compatible)"]
        Realtime[Realtime Subscriptions]
    end
    
    Supabase -->|Database Webhooks| Webhooks[Event Triggers]
    Webhooks -->|POST| EdgeFn["Edge Functions (Deno)"]
    
    subgraph Edge Functions
        VerifyFn[send-verification-email]
        RejectFn[send-rejection-email]
<<<<<<< HEAD
        ProxyFn[create-proxy-user]
=======
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410
    end
    
    EdgeFn -->|API Call| Resend[Resend Email API]
    Resend -->|SMTP| User
```

---

## 🚀 Key Features & Workflows

### A. The Application Lifecycle
<<<<<<< HEAD
1.  **Drafting**: Users start an application. Data is validated strictly using `Zod` schemas.
2.  **Submission**: Once submitted, the application is locked and moves to the Admin queue.
3.  **Review**: Admins review the data.
    - **Rejection**: Status reverts, user is notified via email to correct specific errors.
    - **Verification**: Status becomes `verified`. Certificate is generated.

### B. Event-Driven Notification System
We utilize an **Event-Driven Architecture** to decouple the frontend from side effects.
- **Mechanism**: 
    1. Admin performs an action (e.g., rejects a document).
    2. Frontend inserts a record into the `notifications` table.
    3. **Database Webhook** triggers an **Edge Function**.
    4. Email is sent via Resend.
- **Benefit**: Ensures reliability even if the client-side session is interrupted.

### C. Certificate Management
- **Generation**: Certificates are generated as PDF files with unique serial numbers.
- **Synchronization**: Updating a certificate number automatically regenerates the PDF and updates database records, ensuring consistency.
- **Security**: Old certificate files are automatically deleted to prevent data leaks.
=======
1.  **Drafting**: Users can start an application and save it as a draft. Data is validated using `Zod` schemas.
2.  **Submission**: Once submitted, the application is locked for editing and moves to the Admin queue.
3.  **Review**: Admins review the data.
    - **Rejection**: If rejected, the status reverts, and the user is notified to correct errors.
    - **Verification**: If approved, the status becomes `verified`.

### B. Event-Driven Notification System
We utilize an **Event-Driven Architecture** to decouple the frontend from side effects like emails.
- **Mechanism**: 
    1. Admin performs an action (e.g., rejects a document).
    2. Frontend inserts a record into the `notifications` table.
    3. **Database Webhook** detects the `INSERT`.
    4. **Edge Function** (`send-rejection-email`) is triggered.
    5. Email is sent.
- **Benefit**: This ensures that even if the Admin's browser crashes immediately after the action, the email is guaranteed to be sent by the backend.

### C. Appointment System
- **Slot Management**: Admins define available slots.
- **Concurrency Control**: The database ensures that two users cannot book the same slot simultaneously.
- **QR Code**: Upon booking, a QR code is generated for easy check-in at the office.
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

---

## 💾 Database Schema & Data Model

The core data model is built on **PostgreSQL**. Key tables include:

| Table Name | Description | Key Relationships |
| :--- | :--- | :--- |
| `users` | Extends Supabase Auth with app-specific profile data. | `id` references `auth.users` |
| `applications` | The central record for a marriage registration. | `user_id` references `users` |
<<<<<<< HEAD
| `certificates` | Stores issued certificate metadata and file URLs. | `application_id` references `applications` |
| `documents` | Metadata for uploaded files. | `belongs_to` references `applications` |
| `appointments` | Booking slots and status. | `user_id` references `users` |
| `notifications` | System alerts and email trigger logs. | `user_id` references `users` |

---

## 🛡 Security & Privacy

1.  **Row Level Security (RLS)**:
    - **Applicants** can ONLY access their own data (`auth.uid() = user_id`).
    - **Admins** have elevated privileges via a custom `is_admin()` function.
    
2.  **Secure Storage**:
    - Documents are stored in private Supabase Storage buckets (`applications`, `certificates`).
    - Accessed only via short-lived **Signed URLs**.

3.  **Validation**:
    - Strict backend validation prevents duplicate certificate numbers.
=======
| `documents` | Metadata for uploaded files. | `belongs_to` references `applications` |
| `appointments` | Booking slots and status. | `user_id` references `users` |
| `notifications` | System alerts and email triggers. | `user_id` references `users` |

---

## � Security & Privacy

Security is paramount for government applications.

1.  **Row Level Security (RLS)**:
    - We strictly enforce RLS policies on all tables.
    - **Applicants** can ONLY `SELECT`, `INSERT`, `UPDATE` their own rows (`user_id = auth.uid()`).
    - **Admins** have a special role that grants access to all rows for processing.
    
2.  **Secure Storage**:
    - Documents are stored in private Supabase Storage buckets.
    - Access is granted only via **Signed URLs** with short expiration times (e.g., 1 hour), generated on-demand.

3.  **Edge Function Security**:
    - Functions are protected and can only be invoked by the system (Webhooks) or authenticated users with valid JWTs.
    - API Keys (e.g., Resend) are stored in **Supabase Secrets**, never in the code.
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

---

## 📂 Folder Structure

```
mmr-burwan/
├── src/
<<<<<<< HEAD
│   ├── components/       # Reusable UI components
│   │   ├── admin/        # Admin-specific components (tables, modals)
│   │   ├── application/  # Application form steps
│   │   └── ui/           # Generic UI elements (Buttons, Inputs)
│   ├── contexts/         # Global state (Auth, Notifications)
│   ├── data/             # Static data (Districts, Options)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route components
│   │   ├── admin/        # Admin pages (Dashboard, Verification)
│   │   └── dashboard/    # User dashboard
│   ├── services/         # API service layer (admin.ts, certificates.ts)
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Helpers (certificateGenerator.ts)
├── supabase/
│   ├── functions/        # Deno Edge Functions
=======
│   ├── components/       # Reusable UI components (Buttons, Inputs, Cards)
│   ├── contexts/         # Global state (Auth, Notifications)
│   ├── hooks/            # Custom React hooks (useAuth, useForm)
│   ├── pages/            # Route components (ApplicationPage, AdminDashboard)
│   ├── services/         # API service layer (Supabase calls)
│   ├── types/            # TypeScript interfaces and Zod schemas
│   └── utils/            # Helper functions (Date formatting, Validation)
├── supabase/
│   ├── functions/        # Deno Edge Functions
│   │   ├── send-verification-email/
│   │   └── send-rejection-email/
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410
│   └── migrations/       # SQL migration files
└── public/               # Static assets
```

---

<<<<<<< HEAD
## 🚦 Getting Started & Deployment

### Prerequisites
- Node.js (v18+)
- Supabase CLI
=======
## 💡 Technical Highlights

- **Optimistic UI**: The interface updates immediately while data syncs in the background, providing a snappy experience.
- **Real-time Sync**: If an Admin updates an application status, the User sees it instantly without refreshing (powered by Supabase Realtime).
- **Type Safety**: End-to-end TypeScript ensures robust code and fewer runtime errors.

---

## 🚦 Getting Started & Deployment

### Prerequisites
- Node.js (v16+)
- Supabase CLI
- A Supabase Project
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

### Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/mmr-burwan.git
    cd mmr-burwan
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

<<<<<<< HEAD
5.  **Run Tests**
    ```bash
    npm run test
    ```

### Deployment

1.  **Frontend**: Deploy to Vercel, Netlify, or any static host.
2.  **Backend**:
    - Link your local project to your Supabase project:
      ```bash
      supabase link --project-ref your-project-id
      ```
    - Push database migrations:
      ```bash
      supabase db push
      ```
    - Deploy Edge Functions:
      ```bash
      supabase functions deploy
      ```
=======
### Deploying Edge Functions

To deploy the email notification system:

1.  **Login to Supabase CLI**
    ```bash
    supabase login
    ```

2.  **Deploy Functions**
    ```bash
    supabase functions deploy send-verification-email --no-verify-jwt
    supabase functions deploy send-rejection-email --no-verify-jwt
    ```

3.  **Set Secrets**
    ```bash
    supabase secrets set RESEND_API_KEY=re_123...
    supabase secrets set FROM_EMAIL=noreply@yourdomain.com
    supabase secrets set SITE_URL=https://your-app-url.com
    ```

4.  **Configure Webhooks**
    In the Supabase Dashboard, set up Database Webhooks to trigger these functions on specific table events (`UPDATE` on `applications`, `INSERT` on `notifications`).
>>>>>>> 91c072db48e4bce55ff1272902c3b3f2f3e5d410

---

## 📄 License

This project is licensed under the MIT License.
