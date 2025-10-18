🦸‍♂️ Superhero-pedia

Simple full-stack web app that lets you explore information about superheroes and villains using the SuperHero API
.
Built with Node.js, Express, Bootstrap, and Vanilla JavaScript.

🔗 Live Site

👉 https://midterm-2-web-Dev.onrender.com

🧩 How to run locally

Clone the repo

git clone https://github.com/<your-username>/<your-repo>.git
cd MIDTERM-2-WEB-DEV/server

Copy the environment file

cp .env.example .env

Fill it with your SuperHero API key.

Install dependencies and start the server

npm install
npm run dev

or

npx nodemon index.js

Open your browser at
http://localhost:3000

🧠 What it does

Shows one hero at a time

Lets you go Next / Previous (wraps around)

Lets you Search by name

Displays hero info (powerstats, appearance, biography, etc.)

Handles missing data with default images and placeholders

🗂️ Project structure
MIDTERM-2-WEB-DEV/
├── client/ # Frontend (HTML, CSS, JS)
├── server/ # Backend (Express)
│ ├── lib/ # API + data helpers
│ ├── routes.js # Routes
│ ├── index.js # Server entry
│ └── .env.example
└── README.md

🧾 API routes
GET /api/heroes/:id
GET /api/heroes/search?q=
GET /health

Made with love and hella console.logs.
