# GitHub User Search

A modern, responsive React app to search for GitHub users and view their profile and top repositories.

---

## 🚀 Live Demo

- [Live Preview on Vercel/Netlify](#)
- [GitHub Repository](https://github.com/Kalyanpandaga/github_user_search)

---

## ✨ Features

- 🔍 Search for any GitHub user by username
- 👤 View profile info: avatar, name, bio, location, followers, following
- ⭐ View top 5 repositories (sorted by stars)
- 📱 Responsive, mobile-first UI with Tailwind CSS v4
- 🌙 Dark mode toggle
- ⏳ Debounced search input
- 📄 Pagination for repositories
- 🚦 Graceful error and loading states

---

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS v4
- **Icons:** react-icons
- **API:** GitHub REST API
- **Tooling:** Vite, Node.js

---

## 📦 Setup & Development

### 1. Clone the repo

```sh
git clone https://github.com/Kalyanpandaga/github_user_search.git
cd github_user_search
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the dev server

```sh
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build & Deploy

### Build for production

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

### Deploy

- **Vercel/Netlify:**
  - Connect your GitHub repo: [github_user_search](https://github.com/Kalyanpandaga/github_user_search)
  - Set build command: `npm run build`
  - Set output directory: `dist`
  - Deploy!

---

## ⚙️ Configuration

- **Tailwind v4** with custom dark mode:
  - `@custom-variant dark (&:where(.dark, .dark *));` in `index.css`
  - `darkMode: "class"` in `tailwind.config.js`
- **Vite** with optimized dependencies (see `vite.config.js`).

---

## 🧑‍💻 Author

- [Kalyanpandaga](https://github.com/Kalyanpandaga)

## 📝 Notes

- API rate limits may apply for unauthenticated requests.
