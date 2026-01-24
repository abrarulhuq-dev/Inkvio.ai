# Frontend README (Inkvio.ai – Client)

## Overview

The frontend of **Inkvio.ai** is a modern, responsive web application that provides users with an intuitive interface to access multiple AI-powered tools such as article generation, image generation, and content optimization.

It focuses on clean UI/UX, performance, and seamless interaction with backend APIs.

---

## Tech Stack

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **State Management:** React Hooks / Context API
- **Authentication:** Clerk (Frontend SDK)
- **HTTP Client:** Fetch / Axios
- **Deployment:** Vercel

---

## Folder Structure

src/

 ├── components/     # Reusable UI components

 ├── pages/          # Page-level components

 ├── assets/         # Images & static files

 └── App.jsx         # Root component

├── services/       # API service handlers

---

## Environment Variables

Create a `.env` file in the root directory:

VITE_CLERK_PUBLISHABLE_KEY=your_key_here

VITE_API_BASE_URL=backend_url

---

## Running the Project

npm install

npm run dev

---

## Application Flow

1. User logs in using Clerk authentication
2. User accesses dashboard
3. Selects an AI tool
4. Inputs data
5. Frontend sends request to backend API
6. Displays AI-generated response

---

## ✨ Features

- Responsive dashboard UI
- Secure authentication
- Real-time AI responses
- Error and loading state handling

---

## Build for Production

npm run build