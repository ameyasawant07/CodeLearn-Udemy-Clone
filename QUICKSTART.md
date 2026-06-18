# Quick Start Guide - CodeLearn Hackathon Project

## 🚀 Get Running in 2 Minutes

1. **Install dependencies:**
   ```bash
   cd codelearn
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Create an account:**
   - Click "Sign Up" in the top right
   - Register with any email/password
   - You'll be automatically logged in

## 🎯 Key Features to Demo

### Course Platform (Udemy-style)
- **Browse Courses**: Visit `/courses` to see all available courses
- **Enroll**: Click on any course and enroll (free for demo)
- **Watch Videos**: After enrollment, access the learning interface with video player
- **Progress Tracking**: See your enrolled courses in the dashboard

### Coding Problems (LeetCode-style)
- **Problem List**: Visit `/problems` to see all coding challenges
- **Filter by Difficulty**: Use the filter buttons (Easy/Medium/Hard)
- **Solve Problems**: Click any problem to open the code editor
- **Submit Solutions**: Write code and submit to see results
- **Multiple Languages**: Switch between JavaScript, Python, and Java

### Dashboard
- **View Stats**: See enrolled courses, solved problems, submissions
- **Track Progress**: Monitor your learning journey
- **Recent Activity**: View your latest submissions

## 📁 Project Structure

```
codelearn/
├── app/
│   ├── api/              # Backend API routes
│   ├── courses/          # Course pages
│   ├── problems/         # Problem pages
│   ├── dashboard/        # User dashboard
│   └── page.tsx          # Home page
├── lib/
│   ├── db.ts            # Database functions
│   ├── auth.ts          # Authentication
│   └── api.ts           # API helpers
└── data/
    └── db.json          # JSON database (auto-created)
```

## 🎨 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Code Editor**: Monaco Editor (same as VS Code)
- **Backend**: Next.js API Routes
- **Database**: JSON file (for demo - easily replaceable)
- **Auth**: JWT with bcrypt

## 💡 Demo Tips

1. **Create multiple accounts** to show user isolation
2. **Enroll in courses** and show the video player
3. **Solve problems** in different languages
4. **Show the dashboard** with progress tracking
5. **Demonstrate responsive design** on mobile

## 🔧 Customization

- **Add more courses**: Edit `lib/db.ts` → `getInitialCourses()`
- **Add more problems**: Edit `lib/db.ts` → `getInitialProblems()`
- **Change colors**: Edit `tailwind.config.js`
- **Add features**: Extend the API routes in `app/api/`

## ⚠️ Important Notes

- Code execution is **simulated** for demo purposes
- In production, use a proper sandboxed code execution service
- Database is JSON-based for simplicity
- Video URLs use sample videos (replace with your own)

## 🚨 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database not working?**
- The `data/db.json` file is auto-created on first run
- Make sure the `data/` directory has write permissions

## 🎉 Ready to Demo!

Everything is set up and ready to go. Good luck with your hackathon! 🚀

