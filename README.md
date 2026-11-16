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

This project demonstrates a robust, secure authentication pipeline featuring password hashing, Bearer token verification middleware, unique JWT identifier (`jti`) generation via Node's native `crypto` module, and protected route architecture[cite: 1].

---

## 🚀 Features

* **`POST` /signup** — Secure user registration with email normalization, duplicate checking, and bcrypt password hashing (10 salt rounds)[cite: 1].
* **`POST` /login** — Authenticates credentials, validates hashed passwords, and issues a cryptographically tracked JWT containing a unique `jti`[cite: 1].
* **`GET` /me** — Protected endpoint using custom middleware to retrieve authenticated user account metadata[cite: 1].
* **`GET` /dashboard** — Protected user dashboard endpoint rendering personalized greeting cards with fallback handling[cite: 1].
* **🛡️ JWT Middleware (`requireAuth`)** — Intercepts and parses Bearer tokens from request headers, verifying signatures against environment secrets[cite: 1].
* **⚡ Modern Tooling** — Powered by Prisma ORM for type-safe PostgreSQL database management and automated hot-reloading via `nodemon`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js**[cite: 1] | JavaScript runtime environment |
| **Express.js**[cite: 1] | Fast, unopinionated web framework for routing & middleware |
| **Prisma ORM**[cite: 1] | Next-generation Object-Relational Mapper for PostgreSQL |
| **PostgreSQL**[cite: 1] | Scalable relational database storage |
| **JSON Web Tokens (JWT)**[cite: 1] | Stateless session management & verification |
| **Bcrypt**[cite: 1] | Secure cryptographic password hashing |
| **Crypto (Node.js)**[cite: 1] | Native cryptographic library for generating unique token IDs (`jti`) |

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