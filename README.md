
#  Bondhon - Emergency Blood Bank & Donor Network

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**Bondhon** is a modern, responsive web application designed to bridge the gap between blood donors and patients in need. It allows users to post emergency blood requests, manage their donor availability, and financially support the platform through integrated fundraising campaigns.

This repository contains the **Frontend** of the application, built with React and Vite.

---

##  Key Features

* ** User Authentication:** Secure JWT-based login and registration system.
* ** Emergency Blood Requests:** * Users can post urgent requests for specific blood groups and locations.
  * Real-time tracking of needed vs. fulfilled blood bags.
  * Donors can accept or withdraw from requests with a single click.
* ** Dynamic Donor Profiles:** * Track vital donor statistics like Age, Blood Group, and Last Donation Date.
  * Automatic "Cooldown Period" or "Available" status based on recent donations.
* ** Fundraising & Payments (SSLCommerz):**
  * Seamless integration with the SSLCommerz payment gateway for financial contributions.
  * Dedicated Donor Dashboard to view transaction history and receipt statuses (Success, Pending, Failed).
* ** Responsive Design:** Fully mobile-friendly interface styled with Tailwind CSS and DaisyUI components.

---

##  Tech Stack

* **Core:** React 18, Vite
* **Routing:** React Router DOM v6
* **Styling & UI:** Tailwind CSS, DaisyUI
* **Icons:** Lucide React
* **Form Handling & Validation:** React Hook Form
* **HTTP Client:** Axios (Custom `apiClient` interceptors for JWT)
* **Notifications:** React Hot Toast

---

##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have Node.js and npm (or yarn) installed.
* [Node.js](https://nodejs.org/) (v16 or higher recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/naim13107/bondhon-blood-bank-frontend.git](https://github.com/naim13107/bondhon-blood-bank-frontend.git)
   cd bondhon-blood-bank-frontend
