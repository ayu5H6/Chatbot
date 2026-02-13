# MERN Generative AI Chatbot

A minimal, production-grade Generative AI chatbot built using the MERN stack.  
The application provides a ChatGPT-like interface where users can send prompts and receive AI-generated responses, with conversation history persisted in MongoDB.

This project is intentionally kept simple while following correct full-stack architecture and best practices.

---

## Features

- Interactive chat UI (modern AI chat style)
- User and AI messages displayed distinctly
- Enter-to-send + Send button
- Typing indicator (“AI is typing…”)
- Persistent chat history using MongoDB
- Session-based conversation continuity
- Clean separation of frontend, backend, and AI logic

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Google Gemini API (official SDK)

---

## Architecture Overview

React (UI)
↓
Express API (Chat Routes)
↓
Gemini API (AI Response)
↓
MongoDB (Chat History)


- Each browser gets a unique `sessionId`
- Messages are stored per session
- Old conversations automatically reload on refresh

---

## Setup Instructions

### Backend



cd backend
npm install
npm start


Server runs on:


http://localhost:5000
