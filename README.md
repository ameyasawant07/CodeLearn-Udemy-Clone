# CodeLearn - LeetCode + Udemy Clone

A full-stack platform combining Udemy-style courses with LeetCode-style coding problems.

## Features

### Course Platform (Udemy-style)

- Browse and enroll in courses
- Video lessons with progress tracking
- Course categories and ratings
- Instructor Information

### Coding Problems (LeetCode-style)

- Problem list with difficulty levels
- Code editor with syntax highlighting (Monaco Editor)
- Multiple language support (JavaScript, Python, Java)
- Test case execution
- Submission tracking
- Acceptance Rates and Statistics

### User Features

- User authentication (JWT)
- Personal dashboard
- Progress tracking
- Course enrollment
- Problem Solving History

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: JSON file (for demo - easily replaceable with MongoDB/PostgreSQL)
- **Code Editor**: Monaco Editor
- **Authentication**: JWT with bcrypt

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
codelearn/
├── app/
│   ├── api/          # API routes
│   ├── courses/      # Course pages
│   ├── problems/     # Problem pages
│   ├── dashboard/    # User dashboard
│   └── page.tsx      # Home page
├── lib/
│   ├── db.ts         # Database functions
│   ├── auth.ts       # Authentication
│   └── api.ts        # API helpers
└── data/
    └── db.json       # JSON database (auto-generated)
```

## Demo Accounts

You can create accounts through the registration page. All data is stored locally in `data/db.json`.

## Notes

- This is a demo/hackathon project
- Code execution is simulated (for production, use a proper sandboxed execution service)
- Database is JSON-based for simplicity (easily replaceable)
- Video URLs use sample videos (replace with your own)

## Future Enhancements

- Real code execution engine
- Payment integration
- Course creation for instructors
- Discussion forums
- Leaderboards
- Certificates
- Mobile app
