const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function apiSignup(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function apiSearch(query) {
  const res = await fetch(`${API_BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function apiSurprise() {
  const res = await fetch(`${API_BASE_URL}/surprise`);
  if (!res.ok) throw new Error("Surprise failed");
  return res.json();
}

export async function apiGetRestaurants() {
  const res = await fetch(`${API_BASE_URL}/restaurants`);
  if (!res.ok) throw new Error("Failed to load restaurants");
  return res.json();
}
