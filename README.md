# 📊 Stock Analytics App (React + FastAPI + Supabase)

A full-stack stock management and analytics platform featuring real-time data editing, interactive visualizations, and blazing-fast frontend performance.

---

## 🚀 Features

- ✅ Full CRUD using FastAPI backend + Supabase PostgreSQL
- ✅ React frontend with TailwindCSS 4 & Vite
- ✅ Inline row editing and deletion
- ✅ Add new stock via form
- ✅ Advanced line + bar charts (close price, volume, SMA, RSI)
- ✅ Lazy loading, debounced search, and virtualization for speed
- ✅ Modular component architecture
- ✅ Dashboard with cards, navigation, and analytics

---

## 📂 Folder Structure

```
stock-analytics-app/
├── backend/                 # FastAPI Backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   ├── crud.py
│   ├── seed_data.py
├── frontend/                # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
```

---

## 🛠️ How to Run This Project

### 🔹 Step 1: Clone the Repo

```bash
git clone https://github.com/ronok420/full-stack-stock-app.git
cd full-stack-stock-app
```

---

### 🔹 Step 2: Backend Setup (FastAPI + Supabase)

1. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

2. Set up `.env` file:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
```

3. Seed data:

```bash
python seed_data.py
```

4. Start backend server:

```bash
python uvicorn main:app --reload
```

- Visit: `http://localhost:8000/docs`

---

### 🔹 Step 3: Frontend Setup (Vite + Tailwind 4)

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start development server:

```bash
npm run dev
```

- Visit: `http://localhost:5173`

---

## 🤯 Challenges Faced

1. **Frontend Slow with 1000+ Rows**  
   - **Problem**: Table and charts lagged heavily with large data sets.  
   - **Solution**:  
     - Debounced search (`use-debounce`)  
     - Virtualized table (`react-window`)  
     - Memoized calculations (`useMemo`)  
     - Lazy-loaded components (`React.lazy` + `Suspense`)  
     - Loading spinners for async feedback  

2. **Supabase Data Seeding**  
   - **Problem**: JSON had strings like `"4,320.5"` causing parse errors.  
   - **Solution**: Clean numeric strings via `float(str().replace(",", ""))` before insertion.  

3. **Inline Editing + CRUD Conflicts**  
   - **Problem**: Editing rows triggered full table re-renders, losing local state.  
   - **Solution**:  
     - Isolated row state in `StockRow`  
     - Memoized row components to prevent unnecessary re-renders  

4. **Full-Page Reload on Navigation**  
   - **Problem**: Each click on Dashboard, Analytics, or Data Table caused a full page reload, resetting state and harming UX.  
   - **Solution**:  
     - Implemented a global `StocksContext` with React Context API to hold stock data in memory  
     - Wrapped `<Routes>` in `BrowserRouter` and used `<Link>/<NavLink>` for client-side navigation  
     - Removed any calls to `window.location` or hard redirects  
     - Ensured data is fetched **once** at app start and shared across all pages  

5. **Maintaining UI Quality and Performance**  
   - **Problem**: Balancing rich Tailwind UI with snappy interactions.  
   - **Solution**:  
     - Used Tailwind 4 for gradients, glass effects, and responsive design  
     - Modularized components: `AddForm`, `StockRow`, `Pagination`, `DashboardLayout`, etc.  


---

## 🧠 What I Learned

- **Advanced State Management:** How to set up and use React Context (`StocksContext`) to share data across pages and prevent unnecessary full-page reloads.  
- **Client-Side Routing:** Proper use of `BrowserRouter`, `<Routes>` and `<NavLink>` for smooth, zero-reload navigation in a single-page app.  
- **Performance Optimizations:**  
  - Virtualizing large tables with `react-window`  
  - Debouncing user input with `use-debounce`  
  - Memoizing heavy computations using `useMemo`  
  - Lazy loading routes and components with `React.lazy` and `Suspense`  
- **Modular Component Architecture:** Breaking the UI into small, reusable pieces (`AddForm`, `StockRow`, `Pagination`, `DashboardLayout`, etc.) for maintainability and scalability.  
- **Data Cleaning & Seeding:** Strategies for cleaning messy JSON data (e.g. removing commas) before inserting into Supabase PostgreSQL.  
- **UX Feedback Patterns:** Implementing loading spinners and disabled states to communicate async operations (fetching, saving, deleting).  
- **Full-Stack Integration:** Best practices for connecting a React/Tailwind frontend to a FastAPI backend with Supabase as the database.  



---

## 📌 Future Improvements

- ✅ Authentication with JWT (login/signup)
- ✅ Server-side pagination
- ✅ Export charts/data to PDF or Excel
- ✅ Mobile-friendly responsive views

---



---

