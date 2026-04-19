# CollabCode 🚀

> A real-time collaborative code editor with AI-powered code evaluation, multi-language execution, and live pair programming — built for developers who want to code together, anywhere.

**Live Demo:** [collab-code-virid.vercel.app](https://collab-code-virid.vercel.app)

---

## What is CollabCode?

CollabCode is a full-stack web application that lets multiple developers write, run, and review code together in real time — like Google Docs, but for code. It supports four programming languages, syncs every keystroke across all users in a shared room, and includes an AI assistant that evaluates your code quality and suggests improvements.

---

## Features

### 👥 Real-Time Collaboration
- Multiple users can join a shared room using a unique Room ID
- Every keystroke is synced instantly across all connected clients via WebSockets (Socket.IO)
- Live user avatars in the header show who is currently in the room
- Join/leave notifications appear in real time

### 💻 Multi-Language Code Editor
- Powered by Monaco Editor (the same engine as VS Code)
- Supports JavaScript, Python, C++, and Java
- Syntax highlighting, line numbers, minimap, and error glyph markers
- Real-time JavaScript syntax validation with inline error decorations

### ▶️ Code Execution
- Runs code server-side via the Judge0 API
- Supports stdin input from the user
- Displays stdout and stderr output with error highlighting
- Automatic code preprocessing (e.g. adds missing `#include` for C++, fixes Java class names)

### 🤖 AI Code Evaluation
- One-click AI evaluation powered by Groq (LLM inference)
- Returns a structured report including:
  - Problem understanding (inferred from code)
  - Auto-generated test cases with expected inputs/outputs
  - Score breakdown: Logic, Time Complexity, Space Complexity, Code Quality (each out of 10)
  - Hints for improvement
- Results appear in a draggable, resizable floating window

### 🔐 Google OAuth Authentication
- Sign in with Google to identify yourself in rooms
- Username is persisted and shown as an avatar initial in the header

### 📁 File Handling
- Upload `.js`, `.py`, `.cpp`, `.java`, or `.txt` files directly into the editor
- Download your current code with the correct file extension
- Copy output to clipboard with one click

### 🌗 Dark / Light Theme
- Toggle between dark and light modes with instant theme switching across the entire UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Code Editor | Monaco Editor (`@monaco-editor/react`) |
| Real-Time Sync | Socket.IO (WebSockets) |
| Backend | Node.js, Express |
| Code Execution | Judge0 API (via RapidAPI) |
| AI Evaluation | Groq SDK (LLM inference) |
| Authentication | Google OAuth 2.0 |
| Deployment | Vercel (frontend), Render (backend) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                    │
│                                                      │
│  Monaco Editor ──► Socket.IO Client ──► WebSocket   │
│       │                                     │        │
│  Code Changes                         Room Sync      │
│  Language Changes                     User List      │
└──────────────────────────┬──────────────────────────┘
                           │ HTTP + WebSocket
┌──────────────────────────▼──────────────────────────┐
│                  Server (Express + Socket.IO)         │
│                                                      │
│  /api/execute ──► Judge0 API (code runner)           │
│  /api/evaluate ──► Groq API (AI evaluation)          │
│  /auth/google ──► Google OAuth verification          │
│                                                      │
│  Socket.IO Rooms:                                    │
│    join-room → stores user, broadcasts room-users    │
│    code-change → stores + broadcasts to room         │
│    language-change → stores + broadcasts to room     │
│    disconnect → removes user, updates room           │
└─────────────────────────────────────────────────────┘
```

**Key design decisions:**
- Room state (code, language, users) is stored in-memory on the server so late joiners instantly receive the current state
- Socket is created lazily — only when the Room page mounts — and disconnected cleanly on unmount to avoid ghost connections
- Code preprocessing on the backend handles common boilerplate differences across languages before sending to Judge0

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [RapidAPI](https://rapidapi.com) account with Judge0 CE access
- A [Groq](https://console.groq.com) API key
- A Google OAuth 2.0 Client ID

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
RAPIDAPI_KEY=your_judge0_rapidapi_key
GROQ_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=8000
```

Start the server:
```bash
node server.js
# Server running on http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:8000
```

Start the dev server:
```bash
npm run dev
# http://localhost:5173
```

---

## How It Works — Room Flow

1. User signs in with Google and lands on the Entry page
2. They create or join a room using a Room ID (auto-generated or custom)
3. Their name and Room ID are passed via React Router state to the Room page
4. On mount, a Socket.IO connection is established and `join-room` is emitted
5. The server adds them to the room, sends them the latest code/language state, and broadcasts the updated user list to all clients
6. Every code or language change is emitted via socket and broadcast to all other users in the room
7. On disconnect, the server removes them and notifies the room

---

## Deployment

**Frontend (Vercel):**
- Set environment variable `VITE_BACKEND_URL` to your Render backend URL
- Push to GitHub — Vercel auto-deploys on every push

**Backend (Render):**
- Add all `.env` variables in Render's Environment settings
- Make sure CORS `ALLOWED_ORIGINS` includes your Vercel frontend URL

---

## Project Structure

```
CollabCode/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── RoomPage.jsx      # Main editor + socket logic
│   │   │   └── EntryPage.jsx     # Room creation / join UI
│   │   └── main.jsx
│   └── .env
└── backend/
    ├── server.js                 # Express + Socket.IO + all API routes
    └── .env
```

---

## Future Improvements

- Persistent rooms with database storage (MongoDB/Redis)
- Voice/video chat integration
- Cursor presence (show where each user is typing)
- Chat sidebar within rooms
- Support for more languages (Go, Rust, TypeScript)
- Room password protection

---

## Author

Built by **Tejinder Kaur** — a full-stack project combining real-time systems, AI integration, and developer tooling.
