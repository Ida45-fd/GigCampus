# GigCampus

GigCampus is a full-stack freelance marketplace platform designed for students and campus communities. The platform connects clients with student freelancers, allowing users to post projects, place bids, communicate through real-time conversations, and manage work efficiently through dedicated dashboards.

Built with Next.js, Prisma, PostgreSQL, and NextAuth, GigCampus provides a modern and scalable architecture for collaborative freelancing.

---

# Features

## Authentication & Authorization

* Secure authentication using NextAuth
* Role-based access control
* User roles:

  * Student
  * Client
  * Admin
* Protected routes and API endpoints

## Project Marketplace

* Clients can create and manage freelance projects
* Students can browse available projects
* Skill-based project listings
* Budget and deadline management
* Project status tracking

## Bidding System

* Students can submit bids on projects
* Clients can accept or reject bids
* Delivery time and proposal support
* Bid tracking system

## Messaging & Conversations

* Real-time conversation architecture
* Direct communication between clients and students
* Project-linked conversations
* Read/unread message handling

## Notifications

* Bid notifications
* Project updates
* Message notifications
* Notification status tracking

## Dashboards

### Student Dashboard

* View active bids
* Manage projects
* Track conversations
* Update profile and skills

### Client Dashboard

* Post projects
* Review bids
* Manage freelancers
* Monitor project progress

---

# Tech Stack

## Frontend

* Next.js 16
* React 18
* TypeScript
* Tailwind CSS
* Radix UI
* Lucide React

## Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL
* NextAuth.js

## Additional Libraries

* React Hook Form
* Zod Validation
* Sonner Toasts
* Recharts
* date-fns

---

# Project Structure

```bash
GigCampus/
├── app/
│   ├── api/
│   ├── auth/
│   ├── chat/
│   ├── dashboard/
│   ├── freelancers/
│   ├── marketplace/
│   └── payments/
├── components/
├── hooks/
├── lib/
├── prisma/
├── public/
├── styles/
└── types/
```

---

# Database Models

The application uses Prisma with PostgreSQL.

Main models include:

* User
* Project
* Bid
* Conversation
* Message
* Notification
* Session
* Account

Enums:

* Role
* ProjectStatus
* BidStatus
* NotificationType

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/gigcampus.git
cd gigcampus
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the root directory.

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gigcampus"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

# Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Database Migrations

```bash
npx prisma migrate dev
```

---

# Running the Project

## Development Mode

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

# API Routes

## Authentication

* `/api/auth/*`
* `/api/auth/register`

## Projects

* `/api/projects`
* `/api/projects/[id]`

## Bids

* `/api/bids/[id]`

## Conversations

* `/api/conversations`
* `/api/conversations/[id]`

## Notifications

* `/api/notifications`
* `/api/notifications/[id]`

---

# UI Components

The project uses reusable UI components with Radix UI and Tailwind CSS.

Important sections:

* Hero Section
* Features Section
* Testimonials Section
* Campus Partners Section
* CTA Section
* Navigation & Footer

---

# Future Improvements

* Real-time WebSocket chat
* Integrated payment gateway
* Freelancer ratings and reviews
* File upload support
* Admin analytics dashboard
* AI-based freelancer recommendations
* Mobile responsive optimization

---

# Scripts

```bash
npm run dev       # Start development server
npm run build     # Build application
npm run start     # Start production server
npm run lint      # Run linter
```

---

# Deployment

The project can be deployed on:

* Vercel
* Netlify
* Railway
* Render

Recommended:

* Vercel for frontend
* Neon/Supabase/PostgreSQL for database

---

# Contributing

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

# License

This project is licensed under the MIT License.

---

# Author

Developed for building a campus-focused freelance ecosystem where students and clients can collaborate efficiently.
