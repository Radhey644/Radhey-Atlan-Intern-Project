# 🧠 QueryPlay - Atlan Frontend Internship Task 2025

A lightweight, interactive **SQL mock query runner** built to provide an intuitive experience for querying and viewing data. This project showcases predefined SQL queries and their corresponding mock data in a sleek and efficient UI.

---

## 📝 Overview

QueryPlay allows users to:
- Enter SQL queries into a code editor-style input.
- Toggle between multiple predefined SQL queries.
- Display results dynamically in an easy-to-read table format.
- Switch between datasets effortlessly using dropdowns.

This project was designed with simplicity and functionality in mind to emulate basic querying environments while maintaining high performance and responsiveness.

---

## 🛠️ Tech Stack

- **Framework:** React.js
- **Styling:** Custom CSS (no Tailwind as per the guidelines)
- **State Management:** React's useState
- **Build Tool:** Vite (for faster development and optimized builds)
- **Mock Data:** JSON-based mock datasets
- **Hosting:** Deployed using [Vercel] (Link provided in deployment section)

### Key Packages and Libraries

- `react-select` - For dropdowns to toggle between predefined queries.
- `react-syntax-highlighter` - To emulate the SQL editor experience.
- `uuid` - For unique key generation in dynamic elements.

---

## ⚡ Performance Details

### Page Load Time
- **Initial Load:** 0.8 seconds (measured using Chrome Developer Tools, Lighthouse, and Vite build statistics).
- **Post-render Snappiness:** Optimized for seamless dropdown toggling and query-result rendering.

### Optimizations
1. **Code Splitting:** Used Vite's native optimization to split the code and reduce bundle size.
2. **Minimal Re-renders:** Leveraged efficient React hooks (`useState`) to reduce unnecessary component re-renders.
3. **Lazy Loading Data:** Only display data that corresponds to the selected query, reducing memory usage.
4. **Efficient Table Rendering:** Used map functions with unique keys for table rows to enhance rendering performance.

---

## 🚀 Features

- 🌗 **Dark and Light Theme Support** – Seamlessly toggle between light and dark mode for a better visual experience.
- 🎨 **Beautiful UI with Glowing Effects** – Visually appealing interface with glowing highlights and smooth animations.
- ✍️ **SQL Query Editor** – Enter or paste queries with syntax highlighting for better readability.
- 📋 **Copy Query to Clipboard** – One-click copy functionality for convenience.
- 📥 **Download Result as CSV** – Export table data directly to a `.csv` file for further use.
- 📛 **Error Handling for Invalid Queries** – Displays a clear error message if the query does not match expected formats.
- 🔄 **Predefined Query Switching** – Quickly toggle between different queries with mock datasets.
- 📊 **Dynamic Data Rendering** – Result tables update live as queries change.

---

## 📈 Deployment

### Hosting Platform
The application is hosted on [Vercel](https://radhey-atlan-intern-project.vercel.app/).


