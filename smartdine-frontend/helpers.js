export const buildMapsUrl = (name, location) => {
  const query = encodeURIComponent(`${name} ${location}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const buildOrderUrl = (name, location) => {
  const query = encodeURIComponent(`${name} ${location} order online`);
  return `https://www.google.com/search?q=${query}`;
};

export const MOODS = [
  { key: "cheesy", label: "Cheesy Cravings", query: "cheesy" },
  { key: "spicy", label: "Spicy Mood", query: "spicy" },
  { key: "healthy", label: "Healthy & Light", query: "healthy" },
  { key: "comfort", label: "Comfort Food", query: "comfort food" },
  { key: "breakfast", label: "Breakfast", query: "breakfast" },
  { key: "biryani", label: "Biryani Love", query: "biryani" },
  { key: "dessert", label: "Sweet Tooth", query: "dessert" },
  { key: "coffee", label: "Coffee & Chai", query: "coffee" },
];

export const QUICK_PROMPTS = [
  {
    title: "I’m broke 💸",
    text: "cheap filling food near college",
  },
  {
    title: "Group outing 👯",
    text: "good place for friends hangout with snacks",
  },
  {
    title: "Study & coffee ☕",
    text: "quiet cafe with coffee and light snacks",
  },
  {
    title: "Sweet cravings 🍰",
    text: "dessert place with chocolate and ice cream",
  },
];
