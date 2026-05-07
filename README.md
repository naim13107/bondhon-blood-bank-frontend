# 🩸 Bondhon — Blood Bank Frontend

A modern, fully responsive web application that connects blood donors with patients in need. Built with **React 19** and **Vite**, powered by the [Bondhon Backend API](https://github.com/naim13107/Bondhon-BloodBank-Backend).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bondhon--blood--bank.vercel.app-red?style=flat-square&logo=vercel)](https://bondhon-blood-bank.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-1AD1A5?style=flat-square)](https://daisyui.com/)

---

## 🌐 Live Demo

👉 **[https://bondhon-blood-bank.vercel.app/](https://bondhon-blood-bank.vercel.app/)**

**Backend API:** [https://bloodbank-teal.vercel.app/api/v1/](https://bloodbank-teal.vercel.app/api/v1/)

---

## ✨ Features

### 🔐 Authentication
- JWT-based secure login and registration
- Persistent sessions with automatic token refresh via Axios interceptors
- Protected routes for authenticated users

### 🆘 Emergency Blood Requests
- Post urgent requests specifying blood group, location, and quantity needed
- Real-time tracking of required vs. fulfilled blood bags
- Donors can accept or withdraw from requests with a single click

### 🧑‍⚕️ Donor Profiles
- Register as a blood donor with blood group, age, and availability status
- Automatic cooldown detection based on last donation date
- Browse all available donors and filter by blood group

### 💳 Fundraising & Payments
- Integrated **SSLCommerz** payment gateway for financial contributions
- Donor dashboard with full transaction history
- Payment receipt statuses: Success, Pending, and Failed

### 📱 Responsive Design
- Fully mobile-friendly interface
- Smooth UI with Swiper carousels, toast notifications, and icon support

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4, DaisyUI v5 |
| HTTP Client | Axios (with JWT interceptors) |
| Forms | React Hook Form |
| Notifications | React Hot Toast |
| Icons | Lucide React, React Icons |
| Carousel | Swiper |
| Deployment | Vercel |

---

## 📁 Project Structure

```
bondhon-blood-bank-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, Cards, etc.)
│   ├── pages/              # Page-level components (Home, Donors, Requests, Dashboard, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── context/            # Auth context / global state
│   ├── api/                # Axios instance and API helpers
│   └── main.jsx            # App entry point
├── index.html
├── package.json
├── vite.config.js
├── vercel.json             # Vercel SPA routing config
└── eslint.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/naim13107/bondhon-blood-bank-frontend.git
cd bondhon-blood-bank-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://bloodbank-teal.vercel.app/api/v1
```

> For local backend development, replace with `http://127.0.0.1:8000/api/v1`

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🗂️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — hero section, platform overview |
| `/donors` | Browse all registered blood donors |
| `/donors/:id` | Individual donor profile |
| `/requests` | View all emergency blood requests |
| `/requests/:id` | Blood request detail page |
| `/dashboard` | Authenticated user dashboard (my requests, transactions) |
| `/login` | Login page |
| `/register` | Registration page |
| `/payment/success` | SSLCommerz payment success handler |
| `/payment/fail` | SSLCommerz payment failure handler |

---

## 🔌 API Integration

This frontend consumes the [Bondhon Backend REST API](https://github.com/naim13107/Bondhon-BloodBank-Backend).

A custom **Axios instance** handles:
- Base URL configuration
- Automatic JWT `Authorization` header injection
- Token refresh on 401 responses
- Error interceptors

```js
// Example usage
import apiClient from './api/apiClient';

const donors = await apiClient.get('/donors/');
const request = await apiClient.post('/requests/', { blood_group: 'O+', ... });
```

---

## ☁️ Deployment (Vercel)

The app is deployed as a **Single Page Application (SPA)** on Vercel. The `vercel.json` ensures all routes are served by `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy your own:

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Set `VITE_API_BASE_URL` in environment variables
4. Deploy 🎉

---

## 📦 Key Dependencies

```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.13.1",
  "axios": "^1.13.5",
  "tailwindcss": "^4.2.1",
  "daisyui": "^5.5.19",
  "react-hook-form": "^7.71.2",
  "react-hot-toast": "^2.6.0",
  "lucide-react": "^0.575.0",
  "swiper": "^12.1.2"
}
```

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| [Bondhon Backend](https://github.com/naim13107/Bondhon-BloodBank-Backend) | Django REST API — authentication, donors, blood requests, payments |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source. Feel free to use it for educational or personal purposes.

---

## 👤 Author

**Md.Naim-Ul-Haque** — [@naim13107](https://github.com/naim13107)

---

> *Bondhon (বন্ধন) — meaning "bond" in Bengali — connecting lives through the gift of blood.*
