# 💳 FinLedger — Banking Transaction System API

FinLedger is a backend-focused banking transaction system built using Node.js, Express.js, and MongoDB.
The project simulates real-world banking workflows such as secure authentication, account handling, transaction processing, token invalidation, and transaction safety mechanisms.

The system was designed with a strong focus on backend architecture, transaction integrity, and secure API handling rather than only CRUD operations.

---

# 🚀 Core Features

## 🔐 Authentication & Security

* User Registration & Login
* JWT-based Authentication
* Secure Password Hashing using bcrypt
* Logout API with Token Blacklisting
* Token Reuse Prevention
* Protected Routes & Middleware Validation

---

## 🏦 Banking Functionalities

* Create Multiple Bank Accounts per User
* Deposit & Withdraw Money
* Transfer Money Between Accounts
* Account Balance Tracking
* Transaction History Management
* Insufficient Balance Detection

---

## 📧 Notification System

* Welcome Email after User Registration
* Email Notifications after Every Transaction
* Secure Mail Handling using Nodemailer

---

## ⚡ Transaction Safety Features

### Idempotency Key Handling

Each financial transaction uses a unique **Idempotency Key** to avoid duplicate transaction execution.

A unique UUID-based key is generated for every transaction request.
If the same request is retried due to timeout or network failure, duplicate money transfers are prevented.

This mimics how real banking systems prevent double debit/double credit scenarios.

---

### Real Banking Timeout Simulation

A transaction timeout of **100 seconds** was introduced to simulate real-world banking transaction delays and processing behavior.

This helped in testing:

* retry handling
* transaction consistency
* duplicate request prevention
* API stability under delayed execution

---

### Insufficient Balance Validation

If a transfer request amount exceeds the available account balance, the API immediately returns:

```json
{
  "message": "Insufficient Balance"
}
```

This validation is handled at the backend transaction layer to maintain data consistency.

---

# 👤 User vs Account Architecture

The project separates **Users** and **Bank Accounts** intentionally.

## Why?

A registered user may:

* exist without owning any bank account
* own multiple accounts simultaneously

Example:

* Savings Account
* Salary Account
* Business Account

This separation improves scalability and reflects how actual banking systems model entities internally.

---

# 🔑 Access Token & Refresh Token Understanding

## Access Token

* Short-lived token
* Used for API authentication
* Sent with every protected request

## Refresh Token

* Longer-lived token
* Used to generate new access tokens
* Improves security by reducing repeated login requests

The project currently focuses mainly on access-token-based authentication with token invalidation and blacklist handling.

---

# 🚫 Token Blacklisting System

To improve logout security, tokens are blacklisted after logout.

This prevents:

* token reuse
* unauthorized access after logout
* session hijacking risks

---

## 🧹 TTL-Based Automatic Cleanup

Blacklisted tokens automatically expire after **3 days** using MongoDB TTL (Time-To-Live) indexing.

Benefits:

* reduces unnecessary database storage
* avoids garbage data accumulation
* improves database efficiency
* enables automatic cleanup without manual cron jobs

---

# 🧠 Problem Solved During Development

One major issue faced during development was:

## Transaction Not Persisting in Database

In some scenarios, transactions appeared successful on the client side but were not properly stored in MongoDB.

This could potentially lead to:

* inconsistent account balances
* financial mismatches
* incorrect transaction history

The issue was resolved by improving:

* async transaction handling
* database write flow
* validation sequence
* backend-side verification

This significantly improved transaction reliability.

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JWT
* bcryptjs

## Utilities & Tools

* Nodemailer
* dotenv
* UUID
* Postman
* nodemon

---

# 📂 Project Structure

```bash
src/
│
├── controllers/
├── routes/
├── middlewares/
├── models/
├── services/
├── utils/
├── config/
└── app.js
```

---

# 📬 API Testing

The APIs were tested using Postman.

A complete Postman collection is included in the repository for easy API testing and understanding.

Example API Request:

```json
{
  "email": "demo@finledger.com",
  "password": "Password@123"
}
```

---

# 🌐 Deployment

## Backend Deployment

The backend API is deployed using Render.

## Frontend Deployment

The frontend dashboard (under development) will be deployed using Vercel.

---

# 🔮 Future Improvements

* Redis-based caching
* Refresh token rotation
* Rate limiting
* Docker containerization
* AI-powered financial insights
* Fraud detection layer
* Real-time notifications
* Swagger API Documentation

---

# ▶️ Run Locally

```bash
npm install
npm run dev
```

---

# 📌 Project Goal

The goal of this project was not only to build banking APIs, but to understand how backend systems handle:

* transaction integrity
* authentication security
* timeout handling
* token lifecycle management
* scalable account architecture
* real-world API behavior

This project helped in gaining practical backend engineering understanding beyond basic CRUD implementation.
