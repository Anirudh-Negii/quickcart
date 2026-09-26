# QuickCart

QuickCart is a full-stack e-commerce application built with React, Node.js, Express, and MongoDB. It provides user authentication and product management through a secure REST API, along with a responsive frontend for interacting with the application.

## Live Demo
<p align="center">
  <a href="https://quickcart001.vercel.app">
    <strong>Visit QuickCart</strong>
  </a>
</p>

## 1. Features

- User registration and login
- JWT-based authentication with access and refresh tokens
- Automatic access token refresh
- User profile
- Product listing and product details
- Add, edit, and delete products
- Product image uploads with ImageKit
- Form and API validation
- Protected API routes
- Responsive design
- Custom 404 page

## 2. Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast, Lucide React & React Spinners

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- Cookie Parser

### Services & Deployment

- ImageKit — Product image storage
- MongoDB Atlas — Database hosting
- Vercel — Frontend deployment
- Render — Backend deployment

## 3. Project Structure

```text
QuickCart/
├── backend/
│   └── src/
│       ├── app/             # Express application setup and middleware
│       ├── config/          # Environment and database configuration
│       ├── controller/      # Request handling and business logic
│       ├── middlewares/     # Authentication and request middleware
│       ├── models/          # MongoDB/Mongoose data models
│       ├── routes/          # API route definitions
│       ├── utils/           # Reusable backend utility functions
│       ├── validators/      # Request validation rules
│       └── server.js        # Backend entry point
│
└── frontend/
    └── src/
        ├── api/             # API client and Axios configuration
        ├── app/             # Main application and routing setup
        ├── components/      # Reusable UI components
        ├── context/         # Global React context and authentication state
        ├── pages/           # Application pages
        └── main.jsx         # Frontend entry point
```
## 4. API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new user account |
| POST | `/api/auth/login` | Public | Authenticate user and issue access + refresh tokens |
| POST | `/api/auth/refresh-token` | Public | Issue a new access token |
| POST | `/api/auth/logout` | Authenticated | Invalidate the refresh token |
| GET | `/api/auth/me` | Authenticated | Return the logged-in user's profile |

> `/api/auth/refresh-token` requires a valid refresh token.

### Products

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/products` | Authenticated | Create a new product |
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/:id` | Public | Get a single product |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

All request inputs are validated using `express-validator`, including request bodies and route parameters. Invalid requests return a `400` response with field-level validation errors.

### ImageKit

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/imagekit/auth` | Authenticated | Generate ImageKit authentication parameters for client-side image uploads |

## 5. Basic Setup and Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Anirudh-Negii/quickcart.git
   cd quickcart
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file in `backend/` with:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string

   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   NODE_ENV=development

   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```
5. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
6. Create a `.env` file in `frontend/` with:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
7. Start the frontend:
   ```bash
   npm run dev
   ```

Make sure the required MongoDB and ImageKit credentials are configured before running the application.

## 6. Future Improvements

- Add shopping cart and checkout functionality
- Add product search, filtering, and sorting
- Add pagination for product listings
- Add order management and order history