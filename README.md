# Ecommerce MERN — Frontend

The frontend of a full-stack **Ecommerce** application built with the **MERN** stack. This is the client-side single-page application (SPA) built with **React**, **TypeScript**, and **Vite**. It provides a customer-facing storefront (browse, search, cart, checkout, orders) as well as a full-featured **admin dashboard** (analytics charts, product/customer/transaction management, and utility apps).

> The backend (Express + MongoDB) and the Razorpay payment verification run on a separate server referenced via the `VITE_SERVER` environment variable.

---

## ✨ Features

### Customer

- **Home** page showcasing the latest products.
- **Search** with filters (category, price range) and sorting + pagination.
- **Cart** with quantity control and automatic price calculation (subtotal, tax, discount, shipping).
- **Authentication** via **Google Sign-In** using **Firebase Auth**.
- **Shipping** form to capture the delivery address.
- **Checkout / Payment** using **Razorpay** (client-side integration).
- **Orders** list and **order details** tracking.

### Admin Dashboard

- **Dashboard** with key statistics and analytics.
- **Charts** (Bar, Pie, Line) powered by **Chart.js** / **react-chartjs-2**.
- **Products**, **Customers**, and **Transactions** tables (via `@tanstack/react-table`).
- **Management** tools to create/edit/delete products and update transactions.
- **Mini apps**: Coupon page, Stopwatch, and Coin Toss.
- **Role-based access** — admin routes are protected and only accessible to users with the `admin` role.

### General

- Route-based **code splitting** with lazy loading and a loading fallback.
- **Protected routes** for authenticated and admin-only pages.
- Toast notifications with **react-hot-toast**.
- Fully responsive SCSS styling with mixins.
- Optimized for deployment on **Vercel** (SPA rewrites included).

---

## 🧱 Tech Stack

| Category         | Technology                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Framework        | [React 19](https://react.dev/)                                                                                |
| Language         | [TypeScript](https://www.typescriptlang.org/)                                                                 |
| Build Tool       | [Vite](https://vitejs.dev/)                                                                                   |
| Routing          | [React Router DOM](https://reactrouter.com/)                                                                  |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| HTTP Client      | [Axios](https://axios-http.com/)                                                                              |
| Auth             | [Firebase](https://firebase.google.com/) (Google Sign-In)                                                     |
| Payments         | [Razorpay](https://razorpay.com/)                                                                             |
| Charts           | [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)                     |
| Tables           | [@tanstack/react-table](https://@tanstack/react-table-v7.tanstack.com/)                                       |
| Styling          | [Sass (SCSS)](https://sass-lang.com/)                                                                         |
| Notifications    | [react-hot-toast](https://react-hot-toast.com/)                                                               |
| Icons            | [react-icons](https://react-icons.github.io/react-icons/)                                                     |
| Linting          | ESLint (typescript-eslint, react-hooks)                                                                       |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running instance of the backend API (the `VITE_SERVER` URL).
- A **Firebase** project (for Google Authentication).
- A **Razorpay** account (for payments).

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/guptafactory/ecommerce-frontend.git
cd ecommerce-mern-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` and provide the following values:

```env
# Base URL of the backend API server
VITE_SERVER=http://localhost:4000

# Firebase configuration (from your Firebase project settings)
VITE_FIREBASE_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client by Vite.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

---

## 📜 Available Scripts

| Command           | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with HMR.                           |
| `npm run build`   | Type-checks with `tsc` and builds the app for production into `dist/`. |
| `npm run preview` | Serves the production build locally for previewing.                    |
| `npm run lint`    | Runs ESLint to check for code quality issues.                          |

---

## 📁 Project Structure

```
ecommerce-mern-frontend/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images, videos, and other media
│   ├── components/         # Reusable UI components
│   │   └── admin/          # Admin-specific components (charts, tables, etc.)
│   ├── pages/              # Route-level pages
│   │   └── admin/          # Admin pages (dashboard, products, management, apps)
│   ├── redux/
│   │   ├── api/            # RTK Query API slices (user, product, order, dashboard)
│   │   ├── reducer/        # Redux slices (user, cart)
│   │   └── store.ts        # Redux store configuration
│   ├── styles/             # SCSS stylesheets (partials + admin-styles)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper/utility functions
│   ├── App.tsx             # App shell, routing, and auth state
│   ├── firebase.ts         # Firebase initialization
│   └── main.tsx            # Application entry point
├── .env.example            # Example environment variables
├── vercel.json             # Vercel SPA rewrites configuration
├── vite.config.ts          # Vite configuration
└── tsconfig*.json          # TypeScript configurations
```

---

## 🔐 Authentication & Routing

- Authentication state is managed globally via the **user reducer** and Firebase's `onAuthStateChanged` listener (see `src/App.tsx`).
- The `ProtectedRoute` component (`src/components/protectedRoute.tsx`) guards routes:
  - Unauthenticated users are redirected away from protected pages.
  - Admin pages additionally require the user's `role` to be `"admin"`.

### Route Overview

| Path         | Access        | Description                         |
| ------------ | ------------- | ----------------------------------- |
| `/`          | Public        | Home / latest products              |
| `/search`    | Public        | Search & filter products            |
| `/cart`      | Public        | Shopping cart                       |
| `/login`     | Guest only    | Google Sign-In                      |
| `/shipping`  | Authenticated | Shipping details                    |
| `/orders`    | Authenticated | My orders                           |
| `/order/:id` | Authenticated | Order details                       |
| `/pay`       | Authenticated | Razorpay checkout                   |
| `/admin/*`   | Admin only    | Dashboard, charts, management, apps |

---

## 💳 Payments

Payments are handled with **Razorpay**. The Razorpay checkout script is loaded globally in `index.html`. The checkout flow (`src/pages/checkout.tsx`):

1. Receives the Razorpay `key` and `order` from the navigation state.
2. Opens the Razorpay checkout widget.
3. On success, verifies the payment against the backend (`/api/v1/payment/verify`) and creates the order.

---

## ☁️ Deployment

This project is configured for deployment on **Vercel**. The included `vercel.json` rewrites all routes to `index.html` so client-side routing works on page refresh/deep links.

To deploy:

1. Push your code to a Git repository.
2. Import the project into [Vercel](https://vercel.com/).
3. Add the environment variables (from `.env.example`) in the Vercel project settings.
4. Deploy — Vercel will automatically run `npm run build`.

---

## 🔗 Related

- **Backend:** A companion Express + MongoDB API server is required. Point `VITE_SERVER` at its URL.
- **Repository:** [ecommerce-frontend](https://github.com/guptafactory/ecommerce-frontend.git)

---

## 📄 License

This project is private and not currently licensed for public distribution.
