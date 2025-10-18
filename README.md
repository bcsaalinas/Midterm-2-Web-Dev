# Superhero-pedia

## How to run

1. Clone:

   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd MIDTERM-2-WEB-DEV/server
   ```

2. Copy environment file:

   - Windows (PowerShell):
     ```powershell
     copy .env.example .env
     ```
   - macOS/Linux:
     ```bash
     cp .env.example .env
     ```

3. Install and start server:

   ```bash
   npm install
   npm run dev
   ```

4. Open browser at `http://localhost:3000`.

If the API is hosted elsewhere, add this before the `main.js` script in `client/index.html`:

```html
<script>
  window.__SUPERHERO_API_URL = "https://your-api-domain/api";
</script>
```

## Project structure

```
MIDTERM-2-WEB-DEV/
├── client/            # HTML, CSS, JS modules
├── server/            # Express app
│   ├── lib/           # data fetch and mapping helpers
│   ├── routes.js      # API routes
│   ├── index.js       # server entry point
│   └── .env.example   # environment template
└── README.md
```

## API routes

```
GET /api/heroes/:id
GET /api/heroes/search?q=...
GET /api/heroes
GET /health
```
