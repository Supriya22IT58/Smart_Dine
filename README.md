# SmartDine – Food Discovery Assistant

SmartDine is a web-based AI assistant that helps Indian college students and young professionals decide **what to eat**, **where to go**, and **what fits their mood and budget**.

Users can type natural queries like:

- “something cheesy but not too expensive”
- “healthy breakfast near hostel”
- “comfort food after a rough day”

SmartDine then recommends nearby restaurants with explanations and also offers a **“Surprise Me”** option for indecisive users.

---

## Features

- Directory of curated local eateries (static dataset).
- Conversational search bar that understands cravings & budget using keyword-based NLP.
- Contextual explanations for each recommendation: *why* a place is suggested.
- “Surprise Me 🎲” button for random but sensible picks.
- Integration with **Google Places API** to fetch real restaurants near the college location.
- **View on Google Maps** link for each recommendation.
- Responsive, visually appealing UI built with React.

---

## Tech Stack

### Frontend
- React (Create React App)
- HTML, CSS (custom styling)

### Backend
- Python
- FastAPI
- Requests, python-dotenv

### External Services
- **Google Places API (New)** – Nearby Search

---

## System Architecture

- The **React frontend** runs on `http://localhost:3000` and provides:
  - Search input for natural language queries.
  - Buttons for **Ask SmartDine** and **Surprise Me**.
  - Cards displaying recommended restaurants + Google Maps link.

- The **FastAPI backend** runs on `http://127.0.0.1:8000` and exposes:
  - `POST /search` – Processes the user query, scores local restaurants, calls Google Places, merges results, and returns ranked recommendations.
  - `GET /surprise` – Returns a fun, high-rated random suggestion from the local dataset.
  - `GET /restaurants` – Returns the static list of local eateries (mainly for testing).

- The backend:
  1. Uses a **manual dataset** of 10–20 restaurants with fields like cuisine, tags, budget, rating.
  2. Applies a **rule-based scoring** system to match mood/keywords (cheesy, spicy, healthy, breakfast, cheap, fancy, etc.).
  3. Calls **Google Places Nearby Search** around the college coordinates using the query as a keyword.
  4. Converts Google results into the common `Restaurant` model.
  5. Combines & sorts local + Google results by score and returns the top 10.

---

## Folder Structure

```text
smartdine/
  smartdine-backend/
    main.py
    .env
    venv/ (optional virtualenv)
  smartdine-frontend/
    src/
      App.js
      App.css
      index.js
      index.css
    package.json
