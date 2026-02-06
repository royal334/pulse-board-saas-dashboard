# PulseBoard — SaaS Analytics Dashboard

PulseBoard is a modern SaaS-style analytics dashboard designed for startups and internal teams to monitor users, activity, and key performance metrics. It demonstrates real-world product architecture, secure authentication, and clean dashboard UI using modern web technologies.

---

## 🚀 Live Demo
https://your-live-url.com

---

## ✨ Features

- Secure Authentication (Firebase Auth)
- Protected Dashboard Routes
- SaaS Analytics Overview (Users, Revenue, Growth)
- User Management Dashboard
- Profile & Account Settings
- Password Reset via Email
- Notification Preferences
- Light / Dark Mode Toggle
- Responsive, Clean SaaS UI
- Firestore Real-Time Database Integration

---

## 🧠 Project Purpose

This project was built to simulate a real SaaS product environment, showcasing:

- Frontend architecture for scalable dashboards
- Authentication & protected routing
- Firestore data modeling
- Product-focused UI development
- Clean and maintainable full-stack structure

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend / BaaS**
- Firebase Authentication
- Firestore Database

**Other Tools**
- Recharts (Charts)
- Vercel (Deployment)
- Git / GitHub

saas-dashboard/
├── app/
│   ├── dashboard/              # Protected dashboard routes
│   │   ├── page.tsx            # Main dashboard overview
│   │   ├── users/              # User management
│   │   ├── analytics/          # Analytics pages
│   │   └── settings/           # User settings
│   ├── sign-in/                # Login page
│   ├── sign-up/                # Registration page
│   └── layout.tsx              # Root layout
├── components/
│   ├── dashboard/              # Dashboard UI components
│   ├── ui/                     # Reusable UI primitives
│   └── charts/                 # Chart components
├── lib/
│   ├── firebase.ts             # Firebase configuration
│   ├── auth.ts                 # Auth utilities
│   ├── user.service.ts         # User management functions
│   ├── theme-provider.tsx      # Theme management
│   └── utils.ts                # Utility functions
├── public/
├── .env.local                  # Environment variables
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm
- Firebase Account

git clone https://github.com/your-username/pulse-board-saas-dashboard.git
cd pulse-board-saas-dashboard

2. Install dependencies:
npm install
# or
yarn install
# or
pnpm install

3. Set up Firebase:
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Add a Web app to your Firebase project
- Copy the Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Flow

1. **Sign Up** - Create a new account
2. **Sign In** - Login with email and password
3. **Protected Routes** - Dashboard requires authentication
4. **Password Reset** - Reset password via email
5. **Logout** - Sign out of the application

---

## 📊 Dashboard Features

### Main Dashboard
- Overview of key metrics
- Recent activity feed
- Quick stats cards

### User Management
- View all users
- Add new users
- Edit user details
- Delete users

### Analytics
- User growth charts
- Activity trends
- Revenue metrics (if applicable)

### Settings
- Profile information
- Notification preferences
- Theme settings

---

## 🎨 UI/UX Features

- Modern SaaS design system
- Light & dark mode
- Responsive layout
- Clean typography
- Intuitive navigation

---

## 🏗️ Firebase Data Model

```
users/
├── {userId}/
│   ├── name: string
│   ├── email: string
│   ├── role: "admin" | "user"
│   ├── createdAt: timestamp
│   └── ...
```

---

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Configure environment variables in Vercel settings
4. Deploy!

---

## 📝 Usage Examples

### Add a new user
```typescript
import { addUser } from "@/lib/user.service";

await addUser("John Doe", "[EMAIL_ADDRESS]", "user");
```

### Fetch all users
```typescript
import { fetchUsers } from "@/lib/user.service";

const users = await fetchUsers();
```

### Delete a user
```typescript
import { deleteUser } from "@/lib/user.service";

await deleteUser("user-id");
