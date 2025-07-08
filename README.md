# 🌐 ACS Future School

This is a full-featured web application developed using modern frontend and backend technologies. It includes user authentication, class booking, real-time update integration, and more. The project is optimized for performance, usability, and scalability.

---

## 🚀 Live Site
> [ACS Future School](https://acs-future-school1.web.app/)

---

## 🛠️ Technologies Used

### 🔹 Frontend:
- **React**
- **React Router**
- **Tailwind CSS** 
- **DaisyUI** – Tailwind-based UI components
- **Lottie React** – for animated illustrations
- **Swiper** – for carousels and sliders
- **React Icons** – for iconography
- **React Hook Form** – for form handling and validation
- **SweetAlert2** – for beautiful alert messages

### 🔹 Backend:
- **Firebase Authentication** – for user auth and token management
- **MongoDB** (with Mongoose or native driver)
- **Express.js** – server-side API handling
- **Axios** – for secure HTTP requests

---

## 📁 Project Structure (Frontend)

src/
│
├── components/ # Reusable UI components
├── pages/ # Route-based page components
├── hooks/ # Custom hooks (e.g. useAuth, useAxiosSecure)
├── routes/ # Route definitions
├── layout/ # Main layouts
├── assets/ # Images, icons, lottie files
└── main.jsx # Entry point

---

## 🔐 Authentication
- Firebase Authentication used for secure login/signup.
- JWT issued from backend and stored securely.
- `axiosSecure` interceptor adds token to every secure request.

---

## 📦 Features Implemented

- 🔒 Authentication (Login / Signup)
- 🏫 Add / Update / Delete Classes
- 📺 YouTube Video Embed support
- 🌟 Featured Classes Section
- 📝 Real-Time Reviews with Ratings
- 🌙 Dark/Light Mode Support
- 📆 Class Scheduling
- 📊 Dashboard with Stats
- ✅ Form Validation with React Hook Form
- 🧠 Data Fetching using TanStack Query
- 🎉 Animations with Lottie
- 📲 Responsive UI (Mobile-first design)
- 🏫Admin, teacher and student role base rendering

---

## ⚙️ Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/tmdsifat98/acs-project-client

# Install dependencies
npm install

# Run the app
npm run dev
```
