# 🛠️ BG Tools

45+ free online tools — YouTube, Image, Video, PDF, Text, Calculator aur Resume tools. 100% free, no signup, GitHub Pages par free hosting.

## 🚀 GitHub Pages par Live Karne ke Steps

1. **GitHub par naya repository banayein**
   - github.com par login karein → "New repository" → naam dein (e.g. `bgtools`) → Create.

2. **Files upload karein**
   - Is poore folder ka content us repository mein upload/push karein.
   - Agar Git command line pata hai:
     ```
     git init
     git add .
     git commit -m "BG Tools website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/bgtools.git
     git push -u origin main
     ```
   - Ya GitHub website se seedha "Add file → Upload files" se bhi kar sakte hain.

3. **`_config.yml` mein apna username/repo daalein**
   - `url:` mein apna GitHub Pages URL: `https://YOUR-USERNAME.github.io`
   - `baseurl:` mein apni repo ka naam: `/bgtools` (agar repo ka naam `bgtools` hai to yahi rakhein)
   - `robots.txt` mein bhi sitemap URL update karein.

4. **GitHub Pages ON karein**
   - Repository → Settings → Pages
   - Source: "Deploy from a branch" → Branch: `main` → folder: `/ (root)` → Save.
   - 1-2 minute mein site live ho jayegi: `https://YOUR-USERNAME.github.io/bgtools/`

5. **Bas! Site free mein live hai** ✅ — koi hosting cost nahi, koi server nahi.

## ➕ Naya Tool Add Karna

1. Jis category mein tool add karna hai (e.g. `text-tools/`), usi ke andar naya folder banayein: `text-tools/naya-tool/index.html`
2. Us file mein upar yeh front matter likhein:
   ```
   ---
   layout: default
   title: Naya Tool Ka Naam
   category: Text Tools
   description: "SEO ke liye description"
   ---
   ```
3. Neeche apna HTML + JS likhein (dusre tools ki files dekh kar copy-paste karke modify kar sakte hain).
4. `_includes/sidebar.html` mein us tool ka link add karein taaki wo sidebar mein dikhe.
5. `index.html` (homepage) mein bhi ek link add karein.

## 📁 Structure

```
bgtools/
├── _config.yml          <- Jekyll settings (yahan apna URL daalein)
├── _layouts/default.html <- Common page layout (header, footer, SEO tags)
├── _includes/sidebar.html <- Sidebar menu (naya tool yahan add karein)
├── assets/css/style.css  <- Poori styling
├── assets/js/main.js     <- Sidebar toggle + shared helper functions
├── index.html            <- Homepage
├── youtube-tools/         <- 9 tools
├── image-tools/            <- 8 tools
├── video-tools/             <- 6 tools
├── pdf-tools/                <- 5 tools
├── text-tools/                 <- 6 tools
├── calculator-tools/            <- 5 tools
└── resume-tools/                  <- 3 tools
```

## ℹ️ Notes

- Sabhi Text/Calculator/YouTube/Image/PDF tools **poori tarah browser mein** kaam karte hain — koi file upload server par nahi jaata, isliye 100% free aur private hai.
- Video Tools **ffmpeg.wasm** library use karte hain (badi file hai, pehli baar load hone mein thoda time lagega, internet chahiye CDN se load karne ke liye).
- **Background Remover** aur **AI Image Generator** ke liye AI model/API chahiye hoti hai — abhi "coming soon" page hai. Chahenge to free API (jaise Pollinations.ai ya @imgly/background-removal) se inhe bhi implement kar sakte hain.
- SEO ke liye har page ka apna title, description, aur clean URL hai (e.g. `/text-tools/word-counter/`) — jo Google indexing ke liye achha hai.
