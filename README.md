# 🚀 PatternCode

PatternCode is a feature-rich, interactive LeetCode-style learning platform designed to help programmers master pattern printing logic. It supports code execution in multiple languages, live validation against test cases, streak tracking, and badges for gamified learning.

---

## 🌟 Key Features

* **49 Built-in Pattern Problems:** Ranging from Star and Number patterns to Hollow shapes, Pyramids, and complex Math-based patterns.
* **Interactive Code Editor:** Write solutions in **Python, Java, C++, or C** with code skeleton template preloading.
* **Real Cloud Compiler (OnlineCompiler.io):** Executing code securely in sandboxes and returning exact compiler output.
* **Firebase Authentication:** Secure email/password and Google login integrations.
* **Neon PostgreSQL Database:** Persistence for users, submissions, badges, and problem stats.
* **Streak & Achievement System:** Track daily solving streaks and earn unique milestone badges.
* **Admin Dashboard:** Add and manage pattern problems and test cases directly through a GUI.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, TailwindCSS, Monaco Editor |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Neon.tech) |
| **Auth** | Firebase Auth |
| **Execution** | OnlineCompiler.io API |

---

## 🚀 Local Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+)
* [Docker Desktop](https://www.docker.com/products/docker-desktop) *(Optional: only needed if self-hosting Judge0 locally)*

### 1. Clone the project
```bash
git clone https://github.com/HPMISHRAA/patterncode.git
cd patterncode
```

### 2. Configure Environment Variables
Create a `.env` file in the **client** directory:
```env
# client/.env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
...
```

Create a `.env` file in the **server** directory:
```env
# server/.env
PORT=5000
DATABASE_URL=your_postgres_neon_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
ONLINE_COMPILER_KEY=your_onlinecompiler_api_key
```

### 3. Install & Start Development Servers
From the root folder, start the backend server:
```bash
cd server
npm install
npm run dev
```

In a new terminal window, start the React client:
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Database Schema & Seeds
The SQL script to set up database tables is located at `server/src/db/schema.sql`. You can populate the initial problems, test cases, and default achievements by running:
```bash
cd server
node src/db/seed.js
```
