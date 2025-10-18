# Superhero-pedia

Simple full-stack web app that lets you explore information about superheroes and villains using the SuperHero API. Built with Node.js, Express, Bootstrap, and Vanilla JavaScript.

## Live Site

https://midterm-2-web-Dev.onrender.com

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd MIDTERM-2-WEB-DEV/server
```

### 2. Copy the Environment File

```bash
cp .env.example .env
```

Fill it with your SuperHero API key.

### 3. Install Dependencies and Start the Server

```bash
npm install
npm run dev
```

Or alternatively:

```bash
npx nodemon index.js
```

### 4. Open Your Browser

Navigate to: `http://localhost:3000`

## Features

- Shows one hero at a time
- Navigate with Next/Previous buttons (wraps around)
- Search heroes by name
- Displays comprehensive hero information (powerstats, appearance, biography, etc.)
- Handles missing data with default images and placeholders

## Project Structure

```
MIDTERM-2-WEB-DEV/
├── client/           # Frontend (HTML, CSS, JS)
├── server/           # Backend (Express)
│   ├── lib/          # API + data helpers
│   ├── routes.js     # Routes
│   ├── index.js      # Server entry
│   └── .env.example
└── README.md
```

## API Routes

- `GET /api/heroes/:id`
- `GET /api/heroes/search?q=`
- `GET /health`

---

Made with love and hella console.logs.
