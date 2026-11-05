# TechNova — E-Commerce Store

A full-stack e-commerce application for smart watches and tech accessories. The project includes a React storefront, JWT authentication, password reset emails, a shopping cart, checkout, order storage, and basic admin views.

## Live Demo

| Service | URL |
| --- | --- |
| Frontend | https://ecommerce-eosin-three.vercel.app |
| Backend API | https://e-commerce-1-mzmg.onrender.com |

> The frontend is deployed on Vercel and the API is deployed on Render. The API may take a few seconds to wake up after inactivity.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the repository](#clone-the-repository)
  - [Set up the backend](#set-up-the-backend)
  - [Set up the frontend](#set-up-the-frontend)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [Deployment](#deployment)
- [Important Notes](#important-notes)
- [Troubleshooting](#troubleshooting)

## Overview

TechNova is split into two applications:

- **`backend/`** — an Express and MongoDB REST API handling authentication, password resets, orders, and admin data.
- **`udemy/`** — a React + Vite single-page application containing the storefront, cart, checkout, and account screens.

The frontend communicates with the backend through Axios. The backend stores users and orders in MongoDB and uses Nodemailer for password reset emails.

## Features

- Responsive landing page with hero slider and promotional timer
- Product catalogue and product cards
- Shopping cart with quantity controls
- User registration and login
- JWT-based authentication
- Forgot-password and reset-password flow via email
- Checkout form with shipping address, shipping method, and order summary
- Order persistence in MongoDB
- Contact, returns, payment-security, support, and terms pages
- Custom 404 page
- Basic admin views for users and shipping/order information
- Toast and modal feedback using SweetAlert2 and MUI

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React 18 | UI library |
| Vite 5 | Development server and production build |
| React Router DOM 6 | Client-side routing |
| Material UI (MUI) | UI components and icons |
| Axios | API requests |
| react-use-cart | Cart state |
| SweetAlert2 | Alerts and confirmations |
| Swiper / Flickity | Sliders and carousels |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express | HTTP server and routing |
| MongoDB / Mongoose | Database and models |
| bcryptjs | Password hashing |
| JSON Web Token | Authentication tokens |
| Nodemailer | Password reset emails |
| CORS | Cross-origin requests |
| dotenv | Environment variable loading |

## Project Structure

```text
E-commerce/
├── backend/
│   ├── config/
│   │   └── email.js              # Nodemailer transporter
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── shippingController.js
│   │   └── userController.js
│   ├── Middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── shippingSchema.js     # Order model
│   │   └── userschema.js         # User model
│   ├── routes/
│   │   ├── adminRouter.js
│   │   ├── routes.js
│   │   └── shippingRouter.js
│   ├── mongoose.js               # MongoDB connection
│   ├── server.js                 # Express entry point
│   └── package.json
├── udemy/
│   ├── public/
│   ├── src/
│   │   ├── Admin/
│   │   ├── api/
│   │   │   └── axios.js          # Axios instance and API base URL
│   │   ├── Components/
│   │   │   ├── Auth/
│   │   │   ├── HOME/
│   │   │   ├── navbar/
│   │   │   ├── offers/
│   │   │   └── Static/
│   │   ├── Pages/
│   │   ├── utils/
│   │   │   ├── alerts.js         # SweetAlert2 helpers
│   │   │   └── apiError.js       # Safe API error messages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json               # SPA routing for Vercel
│   ├── vite.config.js
│   └── package.json
└── README.md
```

> `udemy/` is the frontend application directory. The name is historical; all frontend commands should be run from inside that folder.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm
- Git
- A MongoDB database (local MongoDB or MongoDB Atlas)
- A Gmail account with an app password if you want password reset emails to work

### Clone the repository

```bash
git clone https://github.com/vincentius9990/E-commerce.git
cd E-commerce
```

This repository does not have a root `package.json`. Install dependencies separately in `backend/` and `udemy/`.

### Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` using the variables described in [Environment Variables](#environment-variables).

Start the development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

For production, start it with:

```bash
node server.js
```

### Set up the frontend

Open a second terminal:

```bash
cd udemy
npm install
```

Create `.env.development` inside `udemy/`:

```env
VITE_API_URL=http://127.0.0.1:3000
```

Start the frontend:

```bash
npm run dev
```

Vite will print the local URL, usually:

```text
http://localhost:5173
```

## Environment Variables

### Backend — `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `_mongoose` | Yes | MongoDB connection string. The leading underscore is part of the variable name used in `mongoose.js`. |
| `SECRET_KEY` | Yes | Secret used to sign and verify JWT tokens. |
| `GMAIL_USER` | Yes for email | Gmail address used by Nodemailer. |
| `GMAIL_APP_PASSWORD` | Yes for email | Gmail app password. A normal Gmail password will not work. |
| `FRONTEND_URL` | Yes for email | Frontend origin used to build password-reset links. |

Example:

```env
_mongoose=mongodb+srv://<username>:<password>@<cluster>/<database>
SECRET_KEY=<long-random-secret>
GMAIL_USER=you@example.com
GMAIL_APP_PASSWORD=<gmail-app-password>
FRONTEND_URL=http://localhost:5173
```

### Frontend — `udemy/.env.development` / `udemy/.env.production`

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL of the backend API. |

Development example:

```env
VITE_API_URL=http://127.0.0.1:3000
```

Production example:

```env
VITE_API_URL=https://e-commerce-1-mzmg.onrender.com
```

> `VITE_API_URL` is read at **build time**, not runtime. If you change it in Vercel, you must redeploy the frontend.
>
> `.env` files are intentionally ignored by Git. For Vercel, add `VITE_API_URL` under **Project Settings → Environment Variables**. The Axios instance also has a production fallback to the deployed Render API.

## Available Scripts

### Frontend — run inside `udemy/`

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run serve` | Preview the production build locally with Vite |

### Backend — run inside `backend/`

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Nodemon |
| `node server.js` | Start the API without Nodemon |

## API Reference

Local base URL:

```text
http://localhost:3000
```

Production base URL:

```text
https://e-commerce-1-mzmg.onrender.com
```

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/register` | Create a user account | No |
| `POST` | `/login` | Log in and receive a JWT | No |
| `POST` | `/forgot-password` | Send a password reset email | No |
| `POST` | `/reset-password/:token` | Reset a password using a valid token | No |
| `POST` | `/ship` | Store a checkout/order | No |
| `GET` | `/ship` | Retrieve stored orders | No |
| `GET` | `/admin` | Retrieve users without password fields | Bearer token |

Example login request:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your-password"}'
```

Successful login response:

```json
{
  "message": "login successful",
  "token": "<jwt-token>"
}
```

Authenticated requests use:

```http
Authorization: Bearer <jwt-token>
```

## Frontend Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/shop` | Product catalogue |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/login` | Login |
| `/register` | Registration |
| `/forgot-password` | Request a password reset |
| `/reset-password/:token` | Reset password with token |
| `/reset-password` | Reset password fallback |
| `/contact` | Contact page |
| `/returns` | Returns page |
| `/payment-security` | Payment security information |
| `/support` | Support page |
| `/terms` | Terms page |
| `/sidebar` | Admin/sidebar view |
| `*` | Custom 404 page |

The frontend uses React Router with `BrowserRouter`. `udemy/vercel.json` rewrites all routes to `index.html` so direct visits and refreshes work on Vercel.

> The dedicated `/admin` route is currently commented out in `App.jsx`. The admin sidebar and its Users/ShippingInfo views are reachable at `/sidebar`.

## Deployment

### Frontend — Vercel

Recommended project settings:

| Setting | Value |
| --- | --- |
| Root Directory | `udemy` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

Add the environment variable:

```text
VITE_API_URL=https://e-commerce-1-mzmg.onrender.com
```

Then redeploy. `udemy/vercel.json` handles SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend — Render

Recommended settings:

| Setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

Add all backend environment variables in the Render dashboard. If you use MongoDB Atlas, make sure the Render service can connect to the cluster.

### Database

- Use MongoDB Atlas for a hosted database, or a local MongoDB instance for development.
- Update `_mongoose` in `backend/.env` with the correct connection string.

## Important Notes

- The checkout/payment form is a **demo**. It does not process real payments and the current order model stores payment-related fields. Do not enter real card details.
- The admin/order endpoints are intentionally simple and should be hardened with proper authorization before real production use.
- Product images are served from `udemy/public/IMAGES` or external image URLs.
- The landing page product grid fetches sample products from `https://dummyjson.com`.
- `.env` files and `node_modules` are ignored by Git. Do not commit secrets.

## Troubleshooting

### Direct routes such as `/login` return a 404 on Vercel

Make sure Vercel's **Root Directory** is set to `udemy` and that `udemy/vercel.json` is present. The rewrite sends unknown paths to `index.html` so React Router can handle them.

### Frontend requests go to the Vercel URL instead of the API

`VITE_API_URL` was missing when the frontend was built. Add it in Vercel's environment variables and redeploy. Vite bakes environment variables into the bundle at build time.

The Axios fallback in `udemy/src/api/axios.js` also points production builds at:

```text
https://e-commerce-1-mzmg.onrender.com
```

### React error #31 when an API request fails

This happens when an error object is rendered directly. The project uses `udemy/src/utils/apiError.js` to convert API errors into strings before displaying them.

### Password reset emails are not sending

Check that:

- `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set correctly.
- The Gmail account has 2-Step Verification enabled.
- The app password was generated for Gmail, not the normal account password.
- `FRONTEND_URL` points to the deployed frontend URL.

## License

No license file is currently included in this repository.
