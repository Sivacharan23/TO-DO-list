# To-Do List with Smart Quote Giver

A feature-rich To-Do List web application that includes full **CRUD operations** (Create, Read, Update, Delete) and a **Smart Quote Giver** to inspire productivity. Built using modern web technologies, this app is lightweight, interactive, and responsive.

## Features

### ✅ To-Do List Functionality
- **Add Tasks:** Create new tasks with optional priority or due date
- **View Tasks:** View all current tasks in a responsive list
- **Edit Tasks:** Modify task titles, details, or status
- **Delete Tasks:** Remove tasks individually or in bulk
- **Mark as Complete:** Toggle task completion with a checkbox
- **Persistent Storage:** Tasks are saved in `localStorage` so they persist across sessions

### Smart Quote Giver
- Displays a **motivational or productivity quote** each time the page loads or a task is completed
- Quotes are pulled from a static list or fetched dynamically from a quote API
- Encourages focus and positivity throughout task management

## Technologies Used

- **TypeScript** – Logic and type-safe structure
- **JavaScript** – DOM manipulation and interaction
- **HTML** – Semantic structure of the app
- **CSS / Tailwind (optional)** – Styling and layout
- **localStorage** – Persistent data storage in the browser

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-smart-quotes.git
   cd todo-smart-quotes
open index.html
todo-smart-quotes/
├── index.html         # Main UI
├── style.css          # Optional: custom styles or Tailwind CDN
├── app.ts / app.js    # TypeScript/JavaScript logic
├── quotes.json        # (Optional) Static quotes file
