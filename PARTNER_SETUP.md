# 👋 Welcome to CodeLearn Project!

## Quick Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

### Step 1: Extract Files
If you received a ZIP file, extract it to a folder.

### Step 2: Install Dependencies
Open terminal/command prompt in the `codelearn` folder and run:

```bash
npm install
```

This will install all required packages (takes 1-2 minutes).

### Step 3: Start the Server
```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### Step 4: Open in Browser
Navigate to: **http://localhost:3000**

## 🎯 What You Can Do

1. **Browse the Homepage** - See featured courses and problems
2. **Create Account** - Click "Sign Up" to register
3. **Enroll in Courses** - Browse courses and enroll (free for demo)
4. **Watch Videos** - Access course content after enrollment
5. **Solve Problems** - Try coding challenges with the built-in editor
6. **View Dashboard** - Track your progress and submissions

## 📁 Project Structure

```
codelearn/
├── app/              # All pages and API routes
│   ├── api/         # Backend API
│   ├── courses/     # Course pages
│   ├── problems/    # Problem pages
│   └── dashboard/   # User dashboard
├── lib/             # Database and utilities
└── data/            # Database file (auto-created)
```

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter

## ⚠️ Troubleshooting

**Port 3000 already in use?**
- Close other applications using port 3000
- Or change port: `npm run dev -- -p 3001`

**Module not found errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database errors?**
- The `data/db.json` file is auto-created on first run
- Make sure the `data/` folder has write permissions

## 🎨 Features

- ✅ User authentication (register/login)
- ✅ Course enrollment and video playback
- ✅ Coding problems with code editor
- ✅ Multiple programming languages
- ✅ Progress tracking dashboard
- ✅ Responsive design (works on mobile)

## 📚 Tech Stack

- Next.js 14
- React + TypeScript
- Tailwind CSS
- Monaco Editor (VS Code editor)
- JWT Authentication

## 🚀 Ready to Code!

Everything is set up. Start the server and begin exploring!

**Need help?** Check the main README.md or QUICKSTART.md files.

---

**Happy Coding! 🎉**

