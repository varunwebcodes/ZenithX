---
description: How to deploy Zenith X to Netlify
---

Your Zenith X headphone website is optimized for high-performance scrollytelling. Follow these steps to deploy it:

### 1. Preparation

- The project is configured for **Static Export**.
- The `out` folder will be generated when you run `npm run build`.

### 2. Connect to GitHub (Recommended)

This enables automatic deployments whenever you push code.

- Create a new repository on [GitHub](https://github.com/new).
- Push your local code:
  ```bash
  git init
  git add .
  git commit -m "Initialize Zenith X Deployment"
  git branch -M main
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

### 3. Deploy via Netlify Dashboard

- Log in to [Netlify](https://app.netlify.com/).
- Click **"Add new site"** > **"Import an existing project"**.
- Select **GitHub** and authorize.
- Choose your repository.
- **Build Settings** (Automatic from `netlify.toml`):
  - **Build Command:** `npm run build`
  - **Publish Directory:** `out`

### 4. Manual Drag & Drop

If you prefer not to use GitHub:

1. Run `npm run build` in your terminal.
2. Once finished, find the `out` folder in your project.
3. Drag and drop the `out` folder into the Netlify "Sites" dashboard.

### 🔍 Optimization Note

The `netlify.toml` I created includes:

- **Long-term caching** for `/frames/*` to make the scroll animation buttery smooth.
- **Security headers** to protect your site.
- **Node 20** environment setup.
