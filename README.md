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

### 1. **Frontend Slow with 1000+ Rows**
- Problem: Table and charts lagged heavily with large data.
- ✅ Solution: Added:
  - `use-debounce` for search input
  - `react-window` for table virtualization
  - `useMemo()` for heavy calculations
  - Lazy loading charts with `React.lazy` and `Suspense`
  - Loading spinners for visual feedback

### 2. **Supabase Data Seeding**
- Problem: JSON file had messy strings like `"open": "4,320.5"`
- ✅ Solution: Cleaned string inputs before inserting using `float(str().replace(",", ""))`

### 3. **Inline Editing + CRUD Conflicts**
- Problem: Table would re-render entire rows while editing
- ✅ Solution: Isolated row state, memoized `StockRow`, and handled edits with local `formData`

### 4. **Maintaining UI Quality and Performance**
- Problem: Wanted both performance and modern look
- ✅ Solution:
  - Used Tailwind 4 with gradients, rounded layouts, glass effect
  - Modularized all components: `AddForm`, `StockRow`, `Pagination`, `DashboardLayout`, etc.

---

## 🧠 What I Learned

- Advanced full-stack integration (React + FastAPI + Supabase)
- Real-world performance optimizations (virtualization, debouncing, lazy loading)
- Clean code architecture using reusable components
- Effective UI/UX techniques using Tailwind 4
- API data cleaning and seeding strategies

---

## 📌 Future Improvements

- ✅ Authentication with JWT (login/signup)
- ✅ Server-side pagination
- ✅ Export charts/data to PDF or Excel
- ✅ Mobile-friendly responsive views

---



---

