# ChatGPT Clone

This is my attempt at building a ChatGPT-like application while learning web development. It's been a great project to understand how modern web apps work with APIs, databases, and real-time features.

## What I Built

- Chat interface that streams responses in real-time
- Sidebar that shows chat history (you can switch between conversations)
- Different AI models to choose from
- Supports both English and Persian text
- Messages are saved in a database so they persist
- Responsive design that works on mobile

---

## Tech Stack I Used

**Frontend:**

- React with JavaScript
- TailwindCSS for styling
- React Markdown for rendering responses

**Backend:**

- FastAPI (Python)
- SQLite database
- OpenAI API

---

## How to Run This

You'll need Node.js, Python, and an OpenAI API key.

**Backend:**

```bash
cd backend
pip install -r requirements.txt

# Copy .env.example to .env and add your OpenAI API key
cp .env.example .env

# Start the server
uvicorn server:app --reload --port 8000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Then go to http://localhost:5173

---

## What I Learned

- How to work with streaming APIs
- Database design and SQLite
- State management in React
- Building responsive UIs
- Handling real-time data
- Working with external APIs

## Things That Could Be Better

This is still a learning project, so there are definitely things I'd improve:

- Better error handling
- User authentication
- More advanced features
- Better mobile experience
