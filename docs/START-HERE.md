# You are new. Do this.

This project is a normal website. You do not need Git Bash as a special tool — any terminal works. On Windows, **Git Bash** is the window that comes with [Git for Windows](https://git-scm.com/download/win).

## 1. See it on your computer

```bash
cd hiredesk
npm install
npm run dev
```

Open http://localhost:3000

Click **Guided demo** → HF-Sentinel → Hire → **REVOKE AUTHORITY**.

## 2. Save your work (Git)

Git is a notebook of every change. You already have a first commit if we made one. After you change files:

```bash
cd hiredesk
git status
git add .
git commit -m "Describe what you changed in one line"
```

## 3. Put it on GitHub (public — required for the hackathon)

1. Create a free account at https://github.com
2. Click **New repository**. Name it `hiredesk`. Public. **Do not** add a README (we already have one).
3. GitHub will show commands. In Git Bash, from the `hiredesk` folder:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hiredesk.git
git push -u origin main
```

Use **your** GitHub username, not the word YOUR_USERNAME.

If GitHub asks you to sign in, use a **Personal Access Token** as the password:
GitHub → Settings → Developer settings → Personal access tokens.

## 4. What not to upload

Never commit a `.env` file or private keys. `.gitignore` already blocks `.env`.
