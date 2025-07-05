
# 📚 Readventory - Library Management Frontend

Welcome to the frontend of **Readventory**, a modern and minimal **Library Management System** built with **React**, **TypeScript**, **TailwindCSS**, and **Redux Toolkit**. This app allows users to view, add, borrow, and manage books in a smooth and responsive UI.

---

## 🚀 Live Site

> [Visit Readventory](https://readventory-client.vercel.app)  

---

## 🛠️ Tech Stack

- ⚛️ **React 19** + **React Router v7**
- 🧠 **Redux Toolkit** (RTK) + RTK Query
- 💅 **TailwindCSS** + Radix UI Components
- ⚙️ **Vite** for fast bundling and HMR
- 📜 **TypeScript** for type safety
- 📦 **React Hook Form** + **Zod** validation
- 🗓️ **date-fns** and **react-day-picker**
- 🔔 **sonner** for toast notifications

---

## 📁 Folder Structure

```
src/
│
├── components/         # Reusable UI & modules (form, modal, table, etc.)
├── pages/              # All route-based pages
├── redux/              # RTK slices and API config
├── types.ts            # Global TypeScript types
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Tailwind and global styles
```

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/aburayhan-bpi/readventory-client.git
cd readventory-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

---

## 🔨 Build

To generate a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## ✅ Features

- 📖 View all available books with genre, availability, and metadata
- ➕ Add new books (with form validation)
- 📝 Borrow books with quantity and due date
- 🧾 Borrow summary tracking
- ❌ Delete books with confirmation modal
- ⚙️ Responsive UI, dark mode support
- 🔄 Toast feedback and loading states

---

## 🧪 Linting

To lint the project using ESLint:

```bash
npm run lint
```

---

## 📚 Dependencies

Key libraries used:

| Library | Description |
|--------|-------------|
| `react-hook-form` | Lightweight form state management |
| `@reduxjs/toolkit` | Simplified Redux setup |
| `react-router` | Routing solution |
| `tailwindcss` | Utility-first CSS framework |
| `lucide-react` | Icon library |
| `zod` | Schema validation |
| `sonner` | Toast notifications |

> Check full dependencies in [`package.json`](./package.json)

---

## 🌐 Backend

This is just the frontend. Make sure your backend is running (REST API for books) and configured in the `baseApi.ts` inside `redux/api/`.

---

## 🙋‍♂️ Author

**Md Abu Rayhan**  
Frontend Developer | MERN Stack Developer  
📍 Bogura, Bangladesh  
🌐 [GitHub](https://github.com/aburayhan-bpi)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Designed with 💻 and maintained by [@aburayhan-bpi](https://github.com/aburayhan-bpi)
