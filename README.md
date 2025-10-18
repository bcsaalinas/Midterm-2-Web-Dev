# Superhero-pedia

Here is everything you need to the project, just follow the steps below.

## 1. How to run it

1. **Clone**

   ```bash
   git clone + repo url >
   cd MIDTERM-2-WEB-DEV
   ```

2. **Server (Express proxy)**

   ```bash
   cd server
   cp .env.example .env     # defaults to PORT=3000
   npm install
   npm run dev              # starts the API proxy on http://localhost:3000
   ```

3. **Client (plain HTML/JS)**
   - From the project root (or inside `client/`), open `index.html` with a static server:
     - VS Code Live Server, or
     - `npx http-server client`
   - The frontend automatically calls `http://localhost:3000/api/...`, so no extra config needed.

## 2. What’s inside

```
MIDTERM-2-WEB-DEV/
├── client/            # index.html, styles.css, JS modules
├── server/            # Express app
│   ├── lib/           # data fetch + mapping helpers
│   ├── routes.js      # /api routes (heroes, search, directory)
│   ├── index.js       # Express setup, nodemon entry point
│   └── .env.example   # copy to .env before running
└── README.md          # this file
```

## 3. What the app does

- Shows hero spotlight (stats, bio, appearance, connections, portrait).
- Search box handles both ID and name fragments.
- Prev/Next buttons wrap around all 731 heroes.
- “Browse directory” toggle opens an alphabetical list of every hero so you can jump straight to one.
- Smooth scroll + focus when a hero is selected, so you always land on the details card.

## 4. API endpoints served by our Express proxy

| Route                          | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| `GET /api/heroes/:id`          | Full hero details (used by the spotlight). |
| `GET /api/heroes/search?q=...` | Search heroes by name fragment.            |
| `GET /api/heroes`              | Lightweight directory list (id + names).   |
| `GET /health`                  | Quick check: returns `{ status: "ok" }`.   |
