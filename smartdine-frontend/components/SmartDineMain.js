import React, { useEffect, useState } from "react";
import { apiSearch, apiSurprise, apiGetRestaurants } from "../api";
import {
  buildMapsUrl,
  buildOrderUrl,
  MOODS,
  QUICK_PROMPTS,
} from "../helpers";

function SmartDineMain({ user, onLogout, theme, toggleTheme }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [surpriseMode, setSurpriseMode] = useState(false);

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [minRating, setMinRating] = useState("any");
  const [recentSearches, setRecentSearches] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [vegPref, setVegPref] = useState("any");
  const [budgetPref, setBudgetPref] = useState("any");

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("smartdine_recent");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
      const storedFavs = localStorage.getItem("smartdine_favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedVeg = localStorage.getItem("smartdine_pref_veg");
      if (storedVeg) setVegPref(storedVeg);
      const storedBudget = localStorage.getItem("smartdine_pref_budget");
      if (storedBudget) setBudgetPref(storedBudget);
    } catch {
      // ignore
    }
  }, []);

  const pushRecentSearch = (baseQuery) => {
    if (!baseQuery.trim()) return;
    setRecentSearches((prev) => {
      const newList = [baseQuery, ...prev.filter((q) => q !== baseQuery)].slice(
        0,
        6
      );
      try {
        localStorage.setItem("smartdine_recent", JSON.stringify(newList));
      } catch {
        // ignore
      }
      return newList;
    });
  };

  const toggleFavorite = (restaurant) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.some((f) => f.id === restaurant.id);
      const updated = exists
        ? prevFavs.filter((f) => f.id !== restaurant.id)
        : [...prevFavs, restaurant];

      try {
        localStorage.setItem("smartdine_favorites", JSON.stringify(updated));
      } catch {
        // ignore
      }

      return updated;
    });
  };

  const buildFinalQuery = (baseQuery) => {
    const parts = [];

    if (selectedMood) {
      const moodObj = MOODS.find((m) => m.key === selectedMood);
      if (moodObj) parts.push(moodObj.query);
    }

    if (selectedBudget === "cheap") {
      parts.push("cheap");
    } else if (selectedBudget === "moderate") {
      parts.push("not too expensive");
    } else if (selectedBudget === "premium") {
      parts.push("fancy place");
    }

    if (budgetPref !== "any") {
      parts.push(budgetPref);
    }

    if (vegPref === "veg") {
      parts.push("pure veg vegetarian");
    } else if (vegPref === "non-veg") {
      parts.push("non veg chicken");
    }

    if (minRating === "4") {
      parts.push("good rating");
    } else if (minRating === "4.5") {
      parts.push("top rated");
    }

    if (baseQuery && baseQuery.trim()) {
      parts.push(baseQuery.trim());
    }

    const finalQuery = parts.join(" ");
    return finalQuery || "food near college";
  };

  const runSearch = async (baseQuery) => {
    setError("");
    setSurpriseMode(false);

    const trimmed = baseQuery.trim();
    if (!trimmed) {
      setError(
        "Type what you're craving, or use a mood / quick card to get started."
      );
      return;
    }

    setLoading(true);
    const finalQuery = buildFinalQuery(trimmed);

    try {
      const data = await apiSearch(finalQuery);
      setResults(data);
      pushRecentSearch(trimmed);
    } catch (err) {
      setError("Could not fetch results. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => runSearch(query);

  const handleSurprise = async () => {
    setError("");
    setSurpriseMode(true);
    setLoading(true);
    setQuery("");
    setSelectedMood(null);
    setSelectedBudget("any");
    setMinRating("any");

    try {
      const data = await apiSurprise();
      setResults([data]);
    } catch (err) {
      setError("Could not fetch surprise. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (text) => {
    setQuery(text);
    runSearch(text);
  };

  const handleRecentClick = (text) => {
    setQuery(text);
    runSearch(text);
  };

  const clearFilters = () => {
    setSelectedMood(null);
    setSelectedBudget("any");
    setMinRating("any");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVegPrefChange = (value) => {
    setVegPref(value);
    localStorage.setItem("smartdine_pref_veg", value);
  };

  const handleBudgetPrefChange = (value) => {
    setBudgetPref(value);
    localStorage.setItem("smartdine_pref_budget", value);
  };

  const toggleAdminPanel = async () => {
    const newState = !showAdmin;
    setShowAdmin(newState);
    if (newState && adminData.length === 0) {
      setAdminLoading(true);
      setAdminError("");
      try {
        const data = await apiGetRestaurants();
        setAdminData(data);
      } catch (err) {
        setAdminError("Could not load restaurant dataset.");
      } finally {
        setAdminLoading(false);
      }
    }
  };

  return (
    <main className="app-main">
      {/* Top bar */}
      <header className="nav">
        <div className="nav-left">
          <div className="logo-badge-small">SD</div>
          <span className="nav-brand">SmartDine</span>
        </div>
        <div className="nav-right">
          <button
            className="nav-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            className="nav-toggle"
            type="button"
            onClick={toggleAdminPanel}
          >
            {showAdmin ? "Hide Admin" : "Admin Panel"}
          </button>
          <span className="nav-user">Hi, {user?.name || "Foodie"} 👋</span>
          <button className="nav-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="hero fade-in-up">
        <div className="hero-text">
          <h1>
            Find <span className="hero-highlight">your next meal</span> in a
            few taps.
          </h1>
          <p>
            Tell SmartDine your mood, budget & cravings. We’ll suggest places
            around your campus area.
          </p>
        </div>
        <div className="hero-image"></div>
      </div>

      {/* Layout */}
      <div className="layout-grid">
        {/* LEFT PANEL */}
        <aside className="side-panel">
          {/* Food Mood */}
          <section className="panel-section">
            <h3 className="panel-title">Food Mood</h3>
            <p className="panel-subtitle">Tap a mood to guide SmartDine</p>
            <div className="mood-chips">
              {MOODS.map((mood) => (
                <button
                  key={mood.key}
                  className={
                    "chip " + (selectedMood === mood.key ? "chip-active" : "")
                  }
                  onClick={() =>
                    setSelectedMood((prev) =>
                      prev === mood.key ? null : mood.key
                    )
                  }
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </section>

          {/* Quick Prompts */}
          <section className="panel-section">
            <h3 className="panel-title">Quick Prompts</h3>
            <div className="quick-prompts">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  className="quick-card"
                  onClick={() => handleQuickPrompt(qp.text)}
                >
                  <div className="quick-title">{qp.title}</div>
                  <div className="quick-text">{qp.text}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Profile / preferences */}
          <section className="panel-section">
            <h3 className="panel-title">Profile & preferences</h3>
            <p className="panel-subtitle">
              Tailor recommendations based on your style.
            </p>
            <div className="profile-block">
              <div className="profile-row">
                <span className="profile-label">Name</span>
                <span className="profile-value">{user?.name || "Guest"}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Email</span>
                <span className="profile-value profile-email">
                  {user?.email}
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Diet</span>
                <div className="profile-pill-row">
                  <button
                    className={
                      "pill-button small " +
                      (vegPref === "any" ? "pill-active" : "")
                    }
                    onClick={() => handleVegPrefChange("any")}
                  >
                    Any
                  </button>
                  <button
                    className={
                      "pill-button small " +
                      (vegPref === "veg" ? "pill-active" : "")
                    }
                    onClick={() => handleVegPrefChange("veg")}
                  >
                    Veg
                  </button>
                  <button
                    className={
                      "pill-button small " +
                      (vegPref === "non-veg" ? "pill-active" : "")
                    }
                    onClick={() => handleVegPrefChange("non-veg")}
                  >
                    Non-veg
                  </button>
                </div>
              </div>

              <div className="profile-row">
                <span className="profile-label">Default budget</span>
                <div className="profile-pill-row">
                  <button
                    className={
                      "pill-button small " +
                      (budgetPref === "any" ? "pill-active" : "")
                    }
                    onClick={() => handleBudgetPrefChange("any")}
                  >
                    Any
                  </button>
                  <button
                    className={
                      "pill-button small " +
                      (budgetPref === "cheap" ? "pill-active" : "")
                    }
                    onClick={() => handleBudgetPrefChange("cheap")}
                  >
                    ₹
                  </button>
                  <button
                    className={
                      "pill-button small " +
                      (budgetPref === "moderate" ? "pill-active" : "")
                    }
                    onClick={() => handleBudgetPrefChange("moderate")}
                  >
                    ₹₹
                  </button>
                  <button
                    className={
                      "pill-button small " +
                      (budgetPref === "premium" ? "pill-active" : "")
                    }
                    onClick={() => handleBudgetPrefChange("premium")}
                  >
                    ₹₹₹
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Favorites */}
          <section className="panel-section">
            <h3 className="panel-title">Favourites ❤️</h3>
            {favorites.length === 0 ? (
              <p className="panel-subtitle">
                Tap the heart on a place to save it here.
              </p>
            ) : (
              <ul className="favorites-list">
                {favorites.slice(0, 6).map((f) => (
                  <li key={f.id} className="favorite-item">
                    <span>{f.name}</span>
                    <span className="favorite-rating">
                      ⭐ {f.rating ? f.rating.toFixed(1) : "N/A"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <section className="panel-section">
              <h3 className="panel-title">Recent searches</h3>
              <div className="recent-searches">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    className="pill-button"
                    onClick={() => handleRecentClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* RIGHT PANEL */}
        <section className="main-panel">
          {/* Search */}
          <section className="search-section">
            <p className="search-label">What are you craving today?</p>
            <div className="search-box">
              <input
                type="text"
                placeholder='Try: "something cheesy but not too expensive"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label className="filter-label">Budget</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="filter-select"
                >
                  <option value="any">Any</option>
                  <option value="cheap">Cheap (₹)</option>
                  <option value="moderate">Moderate (₹₹)</option>
                  <option value="premium">Premium (₹₹₹)</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Minimum rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="filter-select"
                >
                  <option value="any">Any</option>
                  <option value="4">4.0★+</option>
                  <option value="4.5">4.5★+</option>
                </select>
              </div>
              <button className="filter-clear" onClick={clearFilters}>
                Clear filters
              </button>
            </div>

            <div className="button-row">
              <button className="primary-btn" onClick={handleSearch}>
                Ask SmartDine
              </button>
              <button className="secondary-btn" onClick={handleSurprise}>
                Surprise Me 🎲
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
          </section>

          {/* Admin Panel */}
          {showAdmin && (
            <section className="admin-panel fade-in">
              <div className="admin-header">
                <h3>Admin Panel – Dataset overview</h3>
                <p className="admin-subtitle">
                  This shows the core restaurant dataset coming from the backend
                  (FastAPI).
                </p>
              </div>
              {adminLoading && (
                <div className="loading small">Loading restaurants…</div>
              )}
              {adminError && <div className="error-message">{adminError}</div>}
              {!adminLoading && !adminError && adminData.length > 0 && (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Cuisine</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.map((r) => (
                        <tr key={r.id}>
                          <td>{r.name}</td>
                          <td>{(r.cuisine || []).join(", ")}</td>
                          <td>
                            {r.price_level === 1
                              ? "₹"
                              : r.price_level === 2
                              ? "₹₹"
                              : "₹₹₹"}
                          </td>
                          <td>{r.rating?.toFixed(1) || "N/A"}</td>
                          <td>{r.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Results */}
          <section className="results-section">
            <div className="results-header">
              <h2>
                {surpriseMode
                  ? "Your surprise pick"
                  : results.length > 0
                  ? "Recommended for you"
                  : "Suggestions will appear here"}
              </h2>
              {!surpriseMode && results.length > 0 && (
                <p className="results-subtitle">
                  Showing top matches based on your mood, filters & preferences.
                </p>
              )}
            </div>

            {loading && (
              <div className="loading">Thinking about food… 🍽️</div>
            )}

            {!loading && results.length > 0 && (
              <div className="cards-grid">
                {results.map((item, idx) => {
                  const r = item.restaurant || item;
                  const explanation = item.explanation || "";
                  const isFav = favorites.some((f) => f.id === r.id);

                  return (
                    <div className="restaurant-card lift-in" key={r.id || idx}>
                      <div className="card-header">
                        <h3>{r.name}</h3>
                        <span className="rating">
                          ⭐ {r.rating ? r.rating.toFixed(1) : "N/A"}
                        </span>
                      </div>

                      <div className="card-tags">
                        {r.cuisine && r.cuisine.length > 0 && (
                          <span className="pill">
                            {r.cuisine && r.cuisine.join(" • ")}
                          </span>
                        )}
                        <span className="pill">
                          {r.price_level === 1
                            ? "₹ (cheap)"
                            : r.price_level === 2
                            ? "₹₹ (moderate)"
                            : "₹₹₹ (premium)"}
                        </span>
                        {r.location && (
                          <span className="pill">{r.location}</span>
                        )}
                      </div>

                      {r.special_dishes && r.special_dishes.length > 0 && (
                        <p className="special-dish">
                          Must try: <strong>{r.special_dishes[0]}</strong>
                        </p>
                      )}

                      <p className="explanation">{explanation}</p>

                      <div className="card-actions">
                        <button
                          type="button"
                          className={
                            "favorite-btn " + (isFav ? "favorite-active" : "")
                          }
                          onClick={() => toggleFavorite(r)}
                        >
                          {isFav ? "♥ Saved" : "♡ Save"}
                        </button>
                        <a
                          href={buildMapsUrl(r.name, r.location || "")}
                          target="_blank"
                          rel="noreferrer"
                          className="maps-link"
                        >
                          Map
                        </a>
                        <a
                          href={buildOrderUrl(r.name, r.location || "")}
                          target="_blank"
                          rel="noreferrer"
                          className="maps-link"
                        >
                          Order online
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

export default SmartDineMain;
