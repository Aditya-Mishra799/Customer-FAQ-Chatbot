# Customer Support Chatbot

A full-stack application to answer customer queries which uses `llama-3.1-8b-instant` to generate the responses. This model is provided by `**Groq**` platform.
Must have a Groq API key.
[Groq](https://groq.com/)

## Features
- Maintains context based on past 6 messages.
- Streams agent response as soon as they are generated.

## Deployed Links 
- [Frontend](https://mini-faq-chatbot.vercel.app/)
- [Backend](https://customer-faq-chatbot.vercel.app/)

## Tech Stack

### Frontend
- React 19
- Lucide React for icons
- CSS Modules for styling

### Backend
- Node.js with Express 5
- PostgreSQL for database

## Project Structure

```
.
├── backend/
│   ├── migrations/          # Database migrations
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── utils/           # Utility functions
│   └── package.json
├── init.sql  # sql code for database
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (use `.env.example` as template):
```env
PORT=5000
NODE_ENV=development

DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

#comma separated origins
ALLOWED_ORIGINS=http://localhost:5173

GROQ_API_KEY=your_api_key_for_groq
LLM_MODEL=your_ai_model
```

4. Run the database migrations:
```bash
psql -U your_db_user -d your_db_name -f init.sql
```

5. Start the backend server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_BASE_URL=http://localhost:5000
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Database Schema

### Tables

1. **conversations** - Has an idd for a particular conversation which is added in the cookie on first request.
2. **chats** - all the chat belonging to a conversation

## API Endpoints

### Conversations
- `POST /api/conversation/message` - Add a new user query to conversation and stream the agent response. It has limit of 20 requests per minute
- `GET /api/conversation` - Get all chats for a conversation based on id in cookie, if no id is present a new conversation will be created and cookie with conversation_id will be set.

## Usage

1. Load the frontend.
2. Old chats will be loaded if a conversation (cookie) exists.
3. Send a query message with length greater than 5 and less than 300.
4. AI response will be streamed.
