# ChatGPT Clone

Abstract
--------
This repository contains a small, student-developed implementation of a ChatGPT-like web application. It was created as a learning project to explore modern web application design, streaming API interactions, and end-to-end integration between a React frontend and a FastAPI backend. The implementation is intentionally modest: it demonstrates core concepts and engineering trade-offs rather than providing a production-ready conversational AI service.

Motivation
----------
I built this project to gain hands-on experience with:
- Architecting a web application that streams model outputs to the client,
- Managing persistent conversational state in a lightweight database,
- Integrating third-party language model APIs (OpenAI) from a backend service,
- Building responsive user interfaces with React and TailwindCSS.

Key features
------------
- A chat interface that streams model responses to the browser as they arrive.
- Sidebar with conversation history allowing switching between chats.
- Ability to select different AI models (as supported by the configured API).
- Support for English and Persian (Farsi) message content.
- Message persistence in SQLite so conversations survive server restarts.
- Responsive layout suitable for desktop and mobile viewports.

Tech stack and architecture
---------------------------
- Frontend: React (JavaScript), TailwindCSS, react-markdown for rendering model output.
- Backend: FastAPI (Python) serving a small REST/streaming API.
- Persistence: SQLite for a minimal, file-backed database useful during development.
- External services: OpenAI API (requires a valid API key supplied via environment variables).

How to run (development)
------------------------
Prerequisites: Node.js, Python (3.8+ recommended), pip, and an OpenAI API key.

Backend

```bash
cd backend
pip install -r requirements.txt

# Copy the example env file and set your OpenAI API key in .env
cp .env.example .env
# Edit .env and set OPENAI_API_KEY

# Run the FastAPI server (development mode)
uvicorn server:app --reload --port 8000
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the frontend at the address printed by the dev server (commonly http://localhost:5173).

Notes on configuration
----------------------
- This project expects an OpenAI API key to be provided in the backend .env file. Do not commit secrets to version control.
- SQLite is used here for simplicity; for multi-user or production deployments, use a server-backed RDBMS and apply proper migrations.

What I learned (concise)
------------------------
- Streaming HTTP techniques and client-side handling of incremental responses.
- Simple database schema design for chat history and conversation management.
- State management patterns in React for conversational UIs.
- Practical considerations for integrating external ML/LLM APIs.

Limitations and honesty
-----------------------
This repository is an educational artifact and not a production system. Important limitations include:
- No user authentication or access control is implemented — the app is single-user by design.
- Limited error handling and input validation.
- No rate-limiting or robust safeguards against abusive or expensive model usage.
- Minimal logging, monitoring, and deployment automation.

Because this was built while learning, some parts of the code prioritize clarity and pedagogy over performance and security. I have documented these trade-offs in the source where relevant.

Potential next steps (research & engineering directions)
-------------------------------------------------------
- Add user accounts, sessions, and secure credential storage.
- Replace SQLite with PostgreSQL (or another production-ready DB) and add migrations.
- Improve error handling and implement server-side rate limiting.
- Add automated tests for backend endpoints and critical frontend flows.
- Explore instrumentation (metrics, logs) and CI/CD for deployment.

If you use this project for reference
------------------------------------
- Treat it as a learning example. Review and harden any code before using it in a shared or production environment.
- If you reuse substantial parts of the code, please include attribution.

Contributing
------------
Contributions are welcome in the form of issues and pull requests. If you submit changes that improve security, reliability, or clarity, please include tests or a short explanation of the change.

License
-------
This repository is released under the MIT License.

Contact
-------
For questions about the implementation or to request clarifications for an application review, open an issue or contact the author via the GitHub profile.
