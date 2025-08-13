Here’s your **final `README.md`** file ready to copy into your project:

````markdown
# Backend API

A Node.js backend service using PostgreSQL, Sequelize, and JWT authentication.  
Includes AI-powered description generation via OpenAI.

---

## Requirements

- **Node.js:** v18.20.8
- **npm:** v10.8.2
- **PostgreSQL:** v14+

---

## Installation

```bash
# Clone repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
```
````

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

# JWT Secrets
JWT_SECRET=hafizirshadsecret
JWT_REFRESH_SECRET=hafizirshadreferesh

# AI Keys
GEMINI_API_KEY=<optional-gemini-api-key>
OPENAI_API_KEY=<your-openai-api-key>

# Database
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=rootUser
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432

# App Environment
NODE_ENV=development
NEXT_BACKEND_URL=http://localhost:5000
```

> **Note:** Gemini API is not used due to quota limits.
> OpenAI API is currently used for generating descriptions.

---

## Database Setup

Run migrations and seed data:

```bash
# Run migrations
node scripts/migrate.js

# Seed database
node scripts/seed.js
```

---

## Running the Server

```bash
# Start backend server
node index.js
```

The server will be available at:
**[http://localhost:5000](http://localhost:5000)**

---

## Scripts

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `node index.js`           | Start backend server           |
| `node scripts/migrate.js` | Run database migrations        |
| `node scripts/seed.js`    | Seed database with sample data |

---

## AI Integration

- **Primary**: [OpenAI](https://platform.openai.com/) – Requires `OPENAI_API_KEY`
- **Optional**: [Google Gemini](https://aistudio.google.com/) – `GEMINI_API_KEY` (currently unused due to quota limits)
