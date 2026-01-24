# Backend README (Inkvio.ai – Server)

##  Overview

The backend of **Inkvio.ai** handles authentication, API requests, AI integrations, and data storage. It acts as a secure bridge between the frontend and external AI services.

---

##  Tech Stack

- **Runtime:** Node.js 
- **Framework:** Express.js 
- **Database:** Neon 
- **Authentication:** Clerk (Server SDK)
- **AI APIs:** OpenAI, Google Gemini
- **Deployment:** Render

---

##  Folder Structure

server/

├── routes/        # API routes

├── controllers/  # Business logic

├── services/     # AI & external services

├── models/       # Database models

├── middleware/   # Auth & error handling

├── config/       # Environment config

└── server.js      # Server entry point

---

##  Environment Variables

Create a `.env` file:

PORT=5000

DATABASE_URL=your_neon_uri

CLERK_SECRET_KEY=your_clerk_secret

OPENAI_API_KEY=your_openai_key

GEMINI_API_KEY=your_gemini_key

---

## Running the Server

npm install

npm run dev

---

##  API Security

- Protected routes using Clerk middleware
- Environment variable protection
- Basic rate limiting

---

##  API Endpoints (Sample)

POST /api/article/generate

POST /api/image/generate

GET  /api/user/history

---

##  Testing

- Manual API testing using Postman
- Auth flow validation
- Error handling tests

---

##  Deployment

- Backend deployed on Render
- MongoDB Atlas used for database
- Environment variables configured securely

---

##  Notes

- Never expose API keys in frontend
- Backend validates all requests
- AI prompt handling is centralized

---

##  Conclusion

The frontend and backend of Inkvio.ai work together to deliver a secure, scalable, and efficient AI-powered SaaS platform, demonstrating real-world full-stack development practices.