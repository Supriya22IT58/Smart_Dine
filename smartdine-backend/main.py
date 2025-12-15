from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import random

app = FastAPI(title="SmartDine API")

# CORS – allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Models ----------------

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class SearchRequest(BaseModel):
    query: str

class User(BaseModel):
    name: str
    email: str
    token: str | None = None

class Restaurant(BaseModel):
    id: int
    name: str
    cuisine: List[str]
    price_level: int
    rating: float
    location: str
    tags: List[str]
    special_dishes: List[str]
    vibe: str


# ---------------- Dataset ----------------

RESTAURANTS: List[Restaurant] = [
    Restaurant(
        id=1,
        name="Sree Annapoorna Sweets & Restaurant",
        cuisine=["South Indian", "Veg"],
        price_level=2,
        rating=4.5,
        location="R.S. Puram, Coimbatore",
        tags=["breakfast", "idli", "dosa", "veg", "family"],
        special_dishes=["Ghee Roast Dosa", "Filter Coffee"],
        vibe="Classic Coimbatore veg spot known for clean flavors and quick service."
    ),
    Restaurant(
        id=2,
        name="Haribhavanam",
        cuisine=["South Indian", "Non-veg"],
        price_level=2,
        rating=4.4,
        location="Gandhipuram, Coimbatore",
        tags=["non-veg", "spicy", "biryani", "family"],
        special_dishes=["Mutton Meals", "Chicken Pallipalayam"],
        vibe="Perfect for spicy, flavorful non-veg meals."
    ),
    Restaurant(
        id=3,
        name="Kovai Biriyani Hotel",
        cuisine=["Biryani", "South Indian"],
        price_level=1,
        rating=4.2,
        location="Peelamedu, Avinashi Road",
        tags=["biryani", "cheap", "student favourite"],
        special_dishes=["Chicken Biryani", "Bucket Biryani"],
        vibe="Budget-friendly spot famous for heavy portions."
    ),
    Restaurant(
        id=4,
        name="That's Y Food",
        cuisine=["Continental", "Fusion"],
        price_level=3,
        rating=4.6,
        location="Race Course, Coimbatore",
        tags=["premium", "pasta", "burgers", "date night"],
        special_dishes=["Alfredo Pasta", "BBQ Chicken Burger"],
        vibe="Trendy premium café with cozy ambience."
    ),
    Restaurant(
        id=5,
        name="K R Bakes",
        cuisine=["Bakery", "Snacks"],
        price_level=1,
        rating=4.1,
        location="Gandhipuram Bus Stand",
        tags=["snacks", "tea", "coffee", "budget"],
        special_dishes=["Veg Puff", "Honey Cake"],
        vibe="Quick roadside bakery good for tea breaks."
    ),
    Restaurant(
        id=6,
        name="The French Door Café & Restaurant",
        cuisine=["Continental", "Cafe"],
        price_level=3,
        rating=4.7,
        location="R.S. Puram, Coimbatore",
        tags=["premium", "coffee", "dessert", "brunch"],
        special_dishes=["Pancake Stack", "Hot Chocolate"],
        vibe="Aesthetic café with European-style dishes."
    ),
    Restaurant(
        id=7,
        name="Shree Aksshayam",
        cuisine=["Veg", "South Indian"],
        price_level=2,
        rating=4.4,
        location="Saibaba Colony, Coimbatore",
        tags=["veg", "family", "breakfast"],
        special_dishes=["Mini Tiffin", "Curd Rice"],
        vibe="Calm vegetarian family restaurant."
    ),
    Restaurant(
        id=8,
        name="Rayappas Restaurant",
        cuisine=["South Indian", "Meals"],
        price_level=1,
        rating=4.0,
        location="Avinashi Road, Peelamedu",
        tags=["cheap", "meals", "veg"],
        special_dishes=["Meals", "Parotta Kurma"],
        vibe="Homely taste, perfect for daily meals."
    ),
    Restaurant(
        id=9,
        name="Idly Italy",
        cuisine=["South Indian", "Breakfast"],
        price_level=1,
        rating=4.3,
        location="Avinashi Road, Near PSG Tech",
        tags=["idli", "dosa", "cheap"],
        special_dishes=["Podi Idly", "Kaara Dosa"],
        vibe="Student favourite for hot idlis."
    ),
    Restaurant(
        id=10,
        name="Lassi Shop",
        cuisine=["Juices", "Desserts"],
        price_level=1,
        rating=4.1,
        location="Peelamedu, Hope College",
        tags=["dessert", "sweet", "milkshake", "budget"],
        special_dishes=["Dry Fruit Lassi", "Chocolate Thickshake"],
        vibe="Refreshing spot for shakes."
    ),
    Restaurant(
        id=11,
        name="Burger Lounge",
        cuisine=["Burgers", "Fast Food"],
        price_level=2,
        rating=4.2,
        location="Brookefields Mall",
        tags=["burger", "cheesy"],
        special_dishes=["Chicken Steak Burger", "Cheese Lava Burger"],
        vibe="Good burgers & fries."
    ),
    Restaurant(
        id=12,
        name="Buhari Hotel",
        cuisine=["South Indian", "Non-veg"],
        price_level=2,
        rating=4.3,
        location="Gandhipuram, Cross Cut Road",
        tags=["non-veg", "biryani", "spicy"],
        special_dishes=["Chicken 65", "Mutton Biryani"],
        vibe="Iconic spicy non-veg dishes."
    ),
    Restaurant(
        id=13,
        name="A2B – Adyar Ananda Bhavan",
        cuisine=["South Indian", "Veg"],
        price_level=2,
        rating=4.4,
        location="Avinashi Road (Opp. KMCH)",
        tags=["veg", "dessert", "breakfast"],
        special_dishes=["Ghee Pongal", "Cashew Burfi"],
        vibe="Reliable chain restaurant with clean veg meals."
    ),
    Restaurant(
        id=14,
        name="Junior Kuppanna",
        cuisine=["South Indian", "Non-veg"],
        price_level=3,
        rating=4.5,
        location="Avinashi Road Flyover",
        tags=["non-veg", "spicy"],
        special_dishes=["Mutton Pallipalayam", "Chicken Chukka"],
        vibe="Authentic Kongu-style non-veg dishes."
    ),
    Restaurant(
        id=15,
        name="Barbeque Nation",
        cuisine=["BBQ", "Buffet"],
        price_level=3,
        rating=4.6,
        location="Fun Republic Mall, Peelamedu",
        tags=["premium", "buffet"],
        special_dishes=["Live Grill Starters", "Kulfi Counter"],
        vibe="Perfect for celebrations."
    ),
    Restaurant(
        id=16,
        name="Cream Stone Ice Cream",
        cuisine=["Desserts", "Ice Cream"],
        price_level=2,
        rating=4.5,
        location="Gandhipuram, Cross Cut Road",
        tags=["dessert", "ice cream"],
        special_dishes=["Ferrero Rocher Ice Cream", "Oreo Overload"],
        vibe="Premium ice cream with stone-mixed flavors."
    ),
    Restaurant(
        id=17,
        name="Sree Subam Mess",
        cuisine=["South Indian", "Home-style"],
        price_level=1,
        rating=4.0,
        location="Peelamedu, Behind Fun Mall",
        tags=["veg", "budget"],
        special_dishes=["Sambar Rice", "Curd Rice"],
        vibe="Simple homestyle taste."
    ),
    Restaurant(
        id=18,
        name="Café Coffee Day (CCD)",
        cuisine=["Cafe", "Coffee"],
        price_level=2,
        rating=4.2,
        location="Avinashi Road, Near PSG Tech",
        tags=["coffee", "study", "dessert"],
        special_dishes=["Cappuccino", "Devil's Own"],
        vibe="Relaxed café perfect for study sessions."
    )
]

# ---------------- Utility Functions ----------------

def analyze_query(query: str) -> Dict[str, Any]:
    """
    Parses the free text query and extracts:
    - moods / cravings
    - budget preference
    - diet preference
    - also some 'portion' / 'occasion' style hints (filling, light, date-night, quick-bite)
    """
    q = query.lower()
    moods = []

    # flavour / item moods
    if "cheesy" in q or "cheese" in q:
        moods.append("cheesy")
    if "spicy" in q:
        moods.append("spicy")
    if "healthy" in q or "light" in q:
        moods.append("healthy")
    if "comfort" in q or "home" in q or "homely" in q:
        moods.append("comfort")
    if "biryani" in q:
        moods.append("biryani")
    if "sweet" in q or "dessert" in q or "ice cream" in q:
        moods.append("dessert")
    if "coffee" in q:
        moods.append("coffee")
    if "breakfast" in q or "tiffin" in q:
        moods.append("breakfast")
    if "burger" in q:
        moods.append("burger")

    # portion / occasion style hints
    extra_prefs = {
        "filling": False,
        "light": False,
        "quick": False,
        "date_night": False,
        "study": False,
        "celebration": False,
    }

    if "filling" in q or "full" in q or "heavy" in q:
        extra_prefs["filling"] = True
    if "light" in q or "snack" in q:
        extra_prefs["light"] = True
    if "quick" in q or "fast" in q or "grab" in q:
        extra_prefs["quick"] = True
    if "date" in q or "date night" in q:
        extra_prefs["date_night"] = True
    if "study" in q or "work" in q or "laptop" in q:
        extra_prefs["study"] = True
    if "birthday" in q or "celebration" in q or "party" in q or "treat" in q:
        extra_prefs["celebration"] = True

    # budget
    budget = None
    if "cheap" in q or "budget" in q or "broke" in q or "low cost" in q:
        budget = "cheap"
    elif "expensive" in q or "premium" in q or "fancy" in q:
        budget = "premium"
    elif "moderate" in q or "not too expensive" in q or "okay price" in q:
        budget = "moderate"

    # diet
    diet = None
    if "veg" in q and "non" not in q:
        diet = "veg"
    if "non veg" in q or "non-veg" in q or "chicken" in q or "mutton" in q:
        diet = "non-veg"

    reasons = []
    # we keep this as a generic explanation list, and build more natural language later
    if moods:
        reasons.append("you mentioned " + ", ".join(moods))
    if budget:
        reasons.append("you prefer " + budget + " places")
    if diet:
        reasons.append("your diet is " + diet)
    if extra_prefs["filling"]:
        reasons.append("you wanted something filling")
    if extra_prefs["light"]:
        reasons.append("you asked for something light / snacky")
    if extra_prefs["quick"]:
        reasons.append("you wanted a quick bite")
    if extra_prefs["date_night"]:
        reasons.append("you were thinking of a date-night place")
    if extra_prefs["study"]:
        reasons.append("you wanted a place to sit and study / work")
    if extra_prefs["celebration"]:
        reasons.append("you mentioned a celebration / treat")

    return {
        "moods": moods,
        "budget": budget,
        "diet": diet,
        "extra_prefs": extra_prefs,
        "reasons": reasons,
    }


def score_restaurant(r: Restaurant, qinfo: Dict[str, Any], query: str) -> float:
    q = query.lower()
    score = 0.0

    text_blob = " ".join([
        r.name.lower(),
        " ".join(r.cuisine).lower(),
        " ".join(r.tags).lower(),
        " ".join(r.special_dishes).lower(),
        r.vibe.lower(),
    ])

    # Query keyword matches
    for word in q.split():
        if word in text_blob:
            score += 1.0

    # Mood match
    for mood in qinfo["moods"]:
        if mood in text_blob:
            score += 3.0

    # Extra prefs signals
    extra = qinfo.get("extra_prefs", {})
    if extra.get("filling") and ("meals" in text_blob or "biryani" in text_blob or "buffet" in text_blob or "mess" in text_blob):
        score += 3.0
    if extra.get("light") and ("snacks" in text_blob or "bakery" in text_blob):
        score += 2.0
    if extra.get("quick") and ("snacks" in text_blob or "fast food" in text_blob or "quick" in text_blob):
        score += 2.0
    if extra.get("date_night") and ("date night" in text_blob or "premium" in text_blob or "café" in text_blob):
        score += 3.0
    if extra.get("study") and ("study" in text_blob or "cafe" in text_blob or "coffee" in text_blob):
        score += 2.0
    if extra.get("celebration") and ("buffet" in text_blob or "celebrations" in text_blob or "birthday" in text_blob):
        score += 3.0

    # Budget match
    if qinfo["budget"] == "cheap" and r.price_level == 1:
        score += 3.0
    if qinfo["budget"] == "moderate" and r.price_level == 2:
        score += 3.0
    if qinfo["budget"] == "premium" and r.price_level == 3:
        score += 3.0

    # Diet match
    if qinfo["diet"] == "veg" and "veg" in text_blob:
        score += 2.0
    if qinfo["diet"] == "non-veg" and "non-veg" in text_blob:
        score += 2.0

    # Rating bonus
    score += r.rating * 0.4

    return score


def describe_match_reason(r: Restaurant, qinfo: Dict[str, Any]) -> List[str]:
    """
    Build human sentences like:
    - "you wanted cheap and filling"
    - "you were craving biryani"
    - "you asked for veg options"
    """
    text_blob = " ".join([
        " ".join(r.cuisine).lower(),
        " ".join(r.tags).lower(),
        " ".join(r.special_dishes).lower(),
        r.vibe.lower(),
    ])

    reasons: List[str] = []

    # budget + filling style
    if qinfo["budget"] == "cheap" and r.price_level == 1:
        if qinfo["extra_prefs"].get("filling") and any(word in text_blob for word in ["meals", "biryani", "mess", "heavy", "portion"]):
            reasons.append("you wanted something cheap and filling")
        else:
            reasons.append("you were looking for a cheap place")
    elif qinfo["budget"] == "premium" and r.price_level == 3:
        reasons.append("you were okay with a more premium treat")
    elif qinfo["budget"] == "moderate" and r.price_level == 2:
        reasons.append("you wanted something moderately priced")

    # diet
    if qinfo["diet"] == "veg" and "veg" in text_blob:
        reasons.append("you asked for veg options")
    if qinfo["diet"] == "non-veg" and "non-veg" in text_blob:
        reasons.append("you wanted good non-veg")

    # moods
    moods = qinfo["moods"]
    if "biryani" in moods and "biryani" in text_blob:
        reasons.append("you were craving biryani")
    if "dessert" in moods and ("dessert" in text_blob or "ice cream" in text_blob or "sweet" in text_blob):
        reasons.append("you wanted something sweet")
    if "coffee" in moods and "coffee" in text_blob:
        reasons.append("you specifically mentioned coffee")
    if "breakfast" in moods and ("breakfast" in text_blob or "idli" in text_blob or "dosa" in text_blob or "tiffin" in text_blob):
        reasons.append("you were searching for a breakfast / tiffin place")
    if "cheesy" in moods and ("burger" in text_blob or "cheese" in text_blob):
        reasons.append("you were in the mood for something cheesy")
    if "spicy" in moods and "spicy" in text_blob:
        reasons.append("you wanted spicy food")

    # occasion / vibe related
    extras = qinfo.get("extra_prefs", {})
    if extras.get("study") and ("study" in text_blob or "cafe" in text_blob or "coffee" in text_blob):
        reasons.append("you wanted a place to sit with your laptop / study")
    if extras.get("date_night") and ("date night" in text_blob or "premium" in text_blob or "cozy" in text_blob or "café" in text_blob):
        reasons.append("you were looking for a date-night friendly place")
    if extras.get("light") and ("snacks" in text_blob or "bakery" in text_blob):
        reasons.append("you asked for something light / snacky")
    if extras.get("quick") and ("snacks" in text_blob or "fast food" in text_blob):
        reasons.append("you wanted a quick bite")
    if extras.get("celebration") and ("buffet" in text_blob or "celebration" in text_blob):
        reasons.append("you mentioned a celebration / treat")

    return reasons


def build_explanation(r: Restaurant, qinfo: Dict[str, Any]) -> str:
    """
    Build a SmartDine-style explanation like:
    "Try Sharma's Dhaba because you wanted cheap and filling, and their thali is legendary."
    adapted to the restaurant data we have.
    """
    user_reasons = describe_match_reason(r, qinfo)

    # If we couldn't derive specific reasons, fall back to generic ones from qinfo or rating
    if not user_reasons and qinfo.get("reasons"):
        user_reasons = qinfo["reasons"]

    explanation_core: str
    if user_reasons:
        # Take up to 2 top reasons to keep the sentence short
        picked = user_reasons[:2]
        explanation_core = "because " + " and ".join(picked)
    else:
        explanation_core = f"because it's rated {r.rating:.1f}★ and matches your vibe"

    # price description
    if r.price_level == 1:
        price_txt = "cheap and student-friendly"
    elif r.price_level == 2:
        price_txt = "moderately priced"
    else:
        price_txt = "a bit premium but great for treats"

    # dish / vibe highlight as the "legendary" part
    legendary_bit = ""
    if r.special_dishes:
        # e.g. "their Chicken Biryani is kind of legendary among regulars"
        legendary_bit = f"their {r.special_dishes[0]} is quite popular among regulars"
    else:
        legendary_bit = r.vibe

    return (
        f"Try {r.name} near {r.location} "
        f"{explanation_core}, and since it's {price_txt}, "
        f"{legendary_bit}."
    )


# ---------------- API Endpoints ----------------

@app.post("/signup", response_model=User)
def signup(req: SignupRequest):
    return User(name=req.name, email=req.email, token="demo-token")


@app.post("/login", response_model=User)
def login(req: LoginRequest):
    username = req.email.split("@")[0].title()
    return User(name=username, email=req.email, token="demo-token")


@app.get("/restaurants", response_model=List[Restaurant])
def get_restaurants():
    return RESTAURANTS


@app.post("/search")
def search(req: SearchRequest):
    query = req.query.strip()
    if not query:
        return []

    qinfo = analyze_query(query)
    scored = [(score_restaurant(r, qinfo, query), r) for r in RESTAURANTS]
    scored.sort(key=lambda x: x[0], reverse=True)

    top = [r for s, r in scored[:8] if s > 0]

    if not top:
        top = sorted(RESTAURANTS, key=lambda r: r.rating, reverse=True)[:5]

    return [
        {
            "restaurant": r.dict(),
            "explanation": build_explanation(r, qinfo)
        }
        for r in top
    ]


@app.get("/surprise")
def surprise():
    r = random.choice(RESTAURANTS)
    explanation = build_explanation(r, {
        "moods": [],
        "budget": None,
        "diet": None,
        "extra_prefs": {
            "filling": False,
            "light": False,
            "quick": False,
            "date_night": False,
            "study": False,
            "celebration": False,
        },
        "reasons": ["you wanted a random surprise pick"]
    })
    return {
        "restaurant": r.dict(),
        "explanation": explanation
    }