# GitHub + Vercel (your Windows PC)

You already have the project at:

`C:\Users\ADMIN\Downloads\hiredesk`

## A. GitHub (public code)

1. Open https://github.com and sign in (create a free account if needed).
2. Click **+** → **New repository**.
3. Name: `hiredesk`. **Public**.  
   Do **not** add a README, .gitignore, or license (we already have them).
4. Create repository.
5. GitHub shows commands. In **Git Bash**:

```bash
cd /c/Users/ADMIN/Downloads/hiredesk
git status
git add .
git commit -m "HIREDESK marketplace for BNB Agent Studio" || true
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hiredesk.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME`.

If it asks for a password, use a **Personal Access Token**, not your GitHub login password:

GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → generate → scope **repo**.

Check: `https://github.com/YOUR_GITHUB_USERNAME/hiredesk` shows the files.  
There must be **no** `.env.local` on GitHub.

## B. Vercel (public website)

1. Open https://vercel.com and sign in with **the same GitHub**.
2. **Add New…** → **Project** → import `hiredesk`.
3. Framework: Next.js. Leave defaults. **Deploy**.
4. Wait until you get a URL like `https://hiredesk-xxxx.vercel.app`.
5. Open that URL in a private window. Run the guided demo. No wallet.

Optional env on Vercel (only if you want on-chain attempts on the public site):

Project → Settings → Environment Variables:

`DEMO_ADMIN_PRIVATE_KEY` = your testnet key  

**Production** only. Redeploy after adding. Never put this in the README.

## C. Form

Paste:

- Live URL = the Vercel link  
- Repo = the GitHub link  
- Video = YouTube/Drive link  

into https://forms.gle/9g9XPNFwnYaHAz9L8
