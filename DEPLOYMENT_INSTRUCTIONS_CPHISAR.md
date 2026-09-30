# cphisar.com - Live Deployment Guide (oviPanel / cPanel)

Website **cphisar.com** is fully configured to run smoothly on both **Local Development** and **Live Production Server (oviPanel / cPanel)**.

---

## 🛠️ Key Environment Configurations Done

1. **Smart Dynamic API URL (`frontend/src/api.js`)**:
   - **Local Dev (`npm run dev`)**: Connects automatically to `http://localhost:5003`.
   - **Live Production (`cphisar.com`)**: Connects automatically to relative `/api` or `https://cphisar.com`. No hardcoded localhost URLs!

2. **CORS & Static Hosting (`backend/server.js`)**:
   - Configured CORS for `https://cphisar.com`, `https://www.cphisar.com`, `http://localhost:5003` and `http://localhost:5173`.
   - Built-in static file serving: Express will automatically serve the React frontend build (`frontend/dist` or `backend/public`) if placed on the server.

3. **Apache SPA Routing (`frontend/public/.htaccess`)**:
   - Automatically included in `frontend/dist/.htaccess` during build so page refreshes (`/about`, `/contact`, `/admin`) never give 404 errors on oviPanel / cPanel.

---

## 🚀 Option 1: Deploy as a Unified Node.js App on oviPanel (Recommended)

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Copy Built Files**:
   - Copy all files from `frontend/dist/` into `backend/public/`.
3. **Upload Backend to oviPanel**:
   - Upload the `backend` folder to your server folder on oviPanel.
4. **Create Node.js Application in oviPanel**:
   - **Node.js Version**: 18.x or 20.x
   - **Application Root**: `backend`
   - **Application URL**: `cphisar.com` (or `www.cphisar.com`)
   - **Application Startup File**: `server.js`
5. **Set Environment Variables in oviPanel**:
   ```env
   PORT=5003
   NODE_ENV=production
   FRONTEND_URL=https://cphisar.com
   MONGO_URI=mongodb+srv://jakharantim1710_db_user:X70QYFTzdAd2PRiN@cluster0.xevwfcs.mongodb.net/connaughtplace?appName=Cluster0
   JWT_SECRET=connaught_place_hisar_super_secret_jwt_key_2026
   ```
6. **Run Npm Install & Start**:
   - Click **Run NPM Install** in oviPanel Node.js App Manager.
   - Click **Start Application**.

---

## 🚀 Option 2: Deploy Frontend on `public_html` & Backend as Node App

1. **Frontend Deployment**:
   - Run `cd frontend && npm run build`.
   - Upload all files from `frontend/dist/` (including `.htaccess`) directly into `public_html` in oviPanel File Manager.

2. **Backend Deployment**:
   - Upload `backend` folder outside `public_html` (e.g. `/home/username/backend`).
   - Setup Node.js app in oviPanel pointing to `server.js`.
   - Add `.htaccess` reverse proxy in `public_html` if proxying `/api` to port 5003:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteRule ^api/(.*) http://127.0.0.1:5003/api/$1 [P,L]
     </IfModule>
     ```

---

## 💻 Local Development (Runs as normal)

- **Backend**: `cd backend && npm run dev` (Runs on `http://localhost:5003`)
- **Frontend**: `cd frontend && npm run dev` (Runs on `http://localhost:5173`)
