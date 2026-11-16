<div align="center">

# 🔐 Secure JWT Authentication & User Management API

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.x-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-282A36?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Status](https://img.shields.io/badge/Status-Active%20&%20Working-brightgreen?style=flat-square)]()

</div>

An enterprise-grade, secure User Authentication and Management backend built using **Node.js**, **Express.js**, **Prisma ORM**, **PostgreSQL**, **Bcrypt**, and **JSON Web Tokens (JWT)**.

This project demonstrates a robust, secure authentication pipeline featuring password hashing, Bearer token verification middleware, unique JWT identifier (`jti`) generation via Node's native `crypto` module, and protected route architecture.

---

## 🚀 Features

* **`POST` /signup** — Secure user registration with email normalization, duplicate checking, and bcrypt password hashing (10 salt rounds).
* **`POST` /login** — Authenticates credentials, validates hashed passwords, and issues a cryptographically tracked JWT containing a unique `jti`.
* **`GET` /me** — Protected endpoint using custom middleware to retrieve authenticated user account metadata.
* **`GET` /dashboard** — Protected user dashboard endpoint rendering personalized greeting cards with fallback handling.
* **🛡️ JWT Middleware (`requireAuth`)** — Intercepts and parses Bearer tokens from request headers, verifying signatures against environment secrets.
* **⚡ Modern Tooling** — Powered by Prisma ORM for type-safe PostgreSQL database management and automated hot-reloading via `nodemon`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Fast, unopinionated web framework for routing & middleware |
| **Prisma ORM** | Next-generation Object-Relational Mapper for PostgreSQL |
| **PostgreSQL** | Scalable relational database storage |
| **JSON Web Tokens (JWT)** | Stateless session management & verification |
| **Bcrypt** | Secure cryptographic password hashing |
| **Crypto (Node.js)** | Native cryptographic library for generating unique token IDs (`jti`) |

---

## 📁 Project Structure

```text
1_jwt_authentication/
├── prisma/
│   ├── migrations/       # Incremental database migration history
│   └── schema.prisma     # Prisma database schema definition
├── src/
│   ├── db.cjs            # PostgreSQL database connection client setup
│   └── server.cjs        # Main application entry point, routes & middleware
├── .env                  # Environment variables (git-ignored)
├── .env.example          # Environment variables template
├── package.json          # Project metadata & dependencies
└── package-lock.json     # Dependency lockfile
```

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally on your machine.

### **1. Clone the Repository**
```bash
git clone https://github.com/aks662/jwt-auth-node-prisma-postgresql.git
cd 1_jwt_authentication
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add your configuration (referencing `.env.example`):
```env
PORT=3000
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/your_db_name?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### **4. Run Database Migrations**
Initialize and apply your Prisma schema migrations to PostgreSQL:
```bash
npx prisma migrate dev --name init
```

### **5. Run the Server**
Start the development server with hot-reloading via `nodemon`:
```bash
npm run dev
```

Your server will be running live at **`http://localhost:3000`**!

---

## 🔌 API Endpoints Reference

| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/signup` | `POST` | Public | Register a new user account |
| `/login` | `POST` | Public | Authenticate user and receive a JWT Bearer token |
| `/me` | `GET` | Protected | Fetch profile details of the authenticated user |
| `/dashboard` | `GET` | Protected | Access personalized user dashboard greetings |

---

## 👤 Author

**Akshit Rana**  
* B.Tech Computer Science & Engineering (AI/ML)  
* Newton School of Technology, Ajeenkya DY Patil University, Pune