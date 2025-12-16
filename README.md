# FlipEarn — Full-Stack Social Media Marketplace

![FlipEarn Logo](./client/src/assets/logo.svg)

**FlipEarn** is a full-stack social media marketplace where users can buy and sell social media profiles. Built with the **PERN stack** (PostgreSQL, Express, React, Node.js), this platform provides a seamless, secure, and scalable marketplace experience for both users and admins.

---

## 🚀 Project Overview

FlipEarn allows users to:

- Sign up and manage accounts securely via **Clerk Authentication**
- Browse a marketplace of social media profiles
- List their own social profiles for sale
- Purchase profiles with credentials delivered via email
- Manage listings, orders, and messages
- Access premium features with subscription billing and free trials
- Admin panel to verify listings and manage users

Backend handles database operations, authentication, background jobs, and media optimization.

---

## 🎯 Key Features

### Frontend (Client)
- **Home Page**: Hero section, latest listings, responsive layout
- **Marketplace Page**: Browse, filter, and search listings
- **Listing Details Page**: Full profile info, order interface
- **Messages & Chat**: Interact with users
- **User Dashboard**: My Listings, My Orders, Manage Listing
- **Admin Dashboard UI**: Manage users and listings
- **Authentication & Subscription**: Clerk integration for secure login and premium plans
- **Responsive Design**: Optimized for desktop and mobile
- **Media Optimization**: ImageKit integration for optimized images

### Backend (Server)
- **REST API** with Express.js
- **Database**: Neon PostgreSQL (serverless, scalable)
- **Authentication**: Clerk integration for backend verification
- **Background Jobs**: Inngest functions to send emails and process webhooks
- **Image Storage & Transformation**: ImageKit integration
- **Secure & Modular**: Structured for future scaling and extensions

---

## 🛠 Tech Stack

| Layer        | Technology                                                                 |
|--------------|---------------------------------------------------------------------------|
| Frontend     | React.js, Vite, Tailwind CSS, Redux Toolkit                                |
| Backend      | Node.js, Express.js                                                         |
| Database     | Neon PostgreSQL                                                            |
| Authentication | Clerk (Auth & Subscription Billing)                                      |
| Background Jobs | Inngest Functions                                                        |
| Media        | ImageKit (image optimization & transformation)                             |
| Version Control | Git & GitHub                                                            |
| Deployment   | Ready for Vercel / Netlify (frontend) and any Node host for backend       |

---

## ⚡ Getting Started (Frontend + Backend)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/FlipEarn.git
cd FlipEarn

2️⃣ Frontend Setup
cd client
npm install
cp .env.example .env
npm run dev


Visit http://localhost:5173

3️⃣ Backend Setup
cd server
npm install
cp .env.example .env
npm run dev


Backend runs on http://localhost:5000 (default)

Update .env files with your own API keys and credentials. .env should never be committed.
