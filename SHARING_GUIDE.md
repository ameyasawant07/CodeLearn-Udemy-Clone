# 📦 How to Share CodeLearn with Your Partners

## Option 1: Share via ZIP File (Easiest)

### Step 1: Create a ZIP file
On Windows, you can:
1. Right-click the `codelearn` folder
2. Select "Send to" → "Compressed (zipped) folder"
3. Share the created ZIP file

Or use PowerShell:
```powershell
Compress-Archive -Path codelearn -DestinationPath codelearn.zip
```

### Step 2: Share the ZIP
- Upload to Google Drive, Dropbox, or OneDrive
- Share the link with your partners
- Or send via email (if file size allows)

## Option 2: Share via Git Repository

### If you have Git installed:

1. **Initialize Git repository:**
   ```bash
   cd codelearn
   git init
   git add .
   git commit -m "Initial commit - CodeLearn project"
   ```

2. **Push to GitHub/GitLab:**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Share the repository link** with your partners

## Option 3: Share via Cloud Storage

1. Upload the entire `codelearn` folder to:
   - Google Drive
   - Dropbox
   - OneDrive
   - WeTransfer (for large files)

2. Share the folder link with your partners

## 📋 What Your Partners Need to Do

### After receiving the files:

1. **Extract the ZIP** (if shared as ZIP)

2. **Install dependencies:**
   ```bash
   cd codelearn
   npm install
   ```

3. **Run the project:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

## ⚠️ Important Notes

- **Node.js required**: Partners need Node.js installed (v18 or higher)
- **No environment variables needed**: Everything works out of the box
- **Database auto-creates**: The `data/db.json` file will be created automatically
- **Port 3000**: Make sure port 3000 is available

## 📁 Files to Include

Make sure these are included when sharing:
- ✅ All files in `codelearn/` folder
- ✅ `package.json` (for dependencies)
- ✅ All source code in `app/` and `lib/`
- ✅ Configuration files (`.gitignore`, `tsconfig.json`, etc.)

## 🚫 Files to Exclude (Don't Share)

- ❌ `node_modules/` folder (too large, will be reinstalled)
- ❌ `.next/` folder (build files, will be regenerated)
- ❌ `data/db.json` (user data, will be recreated)
- ❌ `.env` files (if any)

## 💡 Quick Share Checklist

- [ ] Remove `node_modules/` folder before sharing
- [ ] Remove `.next/` folder if it exists
- [ ] Create ZIP or upload to cloud
- [ ] Share link/file with partners
- [ ] Tell them to run `npm install` first

## 🎯 Recommended Method

**For Hackathon (Fastest):**
1. Create ZIP file (excluding node_modules)
2. Upload to Google Drive/OneDrive
3. Share link with partners
4. They download, extract, run `npm install`, then `npm run dev`

---

**Good luck with your hackathon! 🚀**

