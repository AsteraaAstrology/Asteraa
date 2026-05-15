from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.schemas import HoroscopeCreate

from astrology_lib.compatibility import calculate_compatibility

import shutil
import os
import uuid
import json
import cv2
import numpy as np
from datetime import datetime

app = FastAPI()


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# FOLDERS
# =====================================================

UPLOAD_FOLDER = "uploads"
DATA_FOLDER = "data"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DATA_FOLDER, exist_ok=True)

# =====================================================
# JSON FILES
# =====================================================

BLOG_FILE = os.path.join(DATA_FOLDER, "blogs.json")
HOROSCOPE_FILE = os.path.join(DATA_FOLDER, "horoscopes.json")

# =====================================================
# DEFAULT BLOGS
# =====================================================

default_blogs = [

    {
        "id": 1,
        "title": "Understanding Nakshatra Compatibility",
        "category": "Marriage Astrology",
        "content": "Nakshatra compatibility helps determine emotional understanding, spiritual harmony, and long-term relationship balance in Vedic astrology.",
        "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },

    {
        "id": 2,
        "title": "Power of Moon Signs",
        "category": "Moon Astrology",
        "content": "Moon signs reveal emotions, inner personality, intuition, and mental stability according to Vedic astrology.",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },

    {
        "id": 3,
        "title": "Best Zodiac Love Matches",
        "category": "Love Compatibility",
        "content": "Certain zodiac combinations naturally create deeper emotional and romantic harmony.",
        "image": "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46"
    }

]

# =====================================================
# CREATE JSON FILES
# =====================================================

if not os.path.exists(BLOG_FILE):

    with open(BLOG_FILE, "w", encoding="utf-8") as f:
        json.dump(default_blogs, f, indent=4)

if not os.path.exists(HOROSCOPE_FILE):

    with open(HOROSCOPE_FILE, "w", encoding="utf-8") as f:
        json.dump([], f, indent=4)

# =====================================================
# STATIC FILES
# =====================================================

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_FOLDER),
    name="uploads"
)

# =====================================================
# HELPERS
# =====================================================

def read_blogs():

    with open(BLOG_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_blogs(data):

    with open(BLOG_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def read_horoscopes():

    with open(HOROSCOPE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_horoscopes(data):

    with open(HOROSCOPE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def detect_hand(image):

    try:

        # Resize image
        image = cv2.resize(image, (500, 500))

        # Convert to HSV
        hsv = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2HSV
        )

        # Skin color range
        lower_skin = np.array(
            [0, 20, 70],
            dtype=np.uint8
        )

        upper_skin = np.array(
            [20, 255, 255],
            dtype=np.uint8
        )

        # Create mask
        mask = cv2.inRange(
            hsv,
            lower_skin,
            upper_skin
        )

        # Blur
        mask = cv2.GaussianBlur(
            mask,
            (5, 5),
            0
        )

        # Remove noise
        kernel = np.ones((5, 5), np.uint8)

        mask = cv2.morphologyEx(
            mask,
            cv2.MORPH_CLOSE,
            kernel
        )

        # Find contours
        contours, _ = cv2.findContours(
            mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        if len(contours) == 0:
            return False

        # Largest contour
        largest = max(
            contours,
            key=cv2.contourArea
        )

        area = cv2.contourArea(largest)

        # Hand area threshold
        if area > 15000:
            return True

        return False

    except:
        return False


import random

def analyze_palm(image):

    personalities = [
        "Creative and intuitive",
        "Highly emotional and caring",
        "Strong leadership personality",
        "Independent and confident",
        "Calm and intelligent",
        "Spiritual and thoughtful",
        "Energetic and ambitious",
        "Practical and disciplined",
        "Sensitive and artistic",
        "Analytical and focused"
    ]

    careers = [
        "Success in business and leadership",
        "Suitable for artistic professions",
        "Strong communication skills",
        "Growth in technology field",
        "Good future in management",
        "Creative career opportunities",
        "Stable financial future",
        "Strong entrepreneurial ability",
        "Success through hard work",
        "Natural teaching abilities"
    ]

    loves = [
        "Emotionally balanced relationship",
        "Deep romantic connection",
        "Loyal and supportive partner",
        "Strong emotional understanding",
        "Marriage stability indicated",
        "Passionate love life",
        "Long-term compatibility",
        "Needs emotional communication",
        "Balanced relationship energy",
        "Supportive married life"
    ]

    healths = [
        "Good vitality and energy",
        "Strong mental health",
        "Need proper rest and balance",
        "Healthy lifestyle indicated",
        "Good emotional balance",
        "Strong physical endurance",
        "Stress management important",
        "Generally positive health",
        "Strong recovery abilities",
        "Energetic personality"
    ]

    return {

        "lifeLine": {
            "type": random.choice(["deep", "clear", "long"]),
            "prediction": random.choice([
                "Strong vitality",
                "Long healthy life",
                "Energetic personality",
                "Stable life journey"
            ])
        },

        "headLine": {
            "type": random.choice(["clear", "curved", "straight"]),
            "prediction": random.choice([
                "Logical thinker",
                "Creative mindset",
                "Focused personality",
                "Strong intelligence"
            ])
        },

        "heartLine": {
            "type": random.choice(["strong", "deep", "balanced"]),
            "prediction": random.choice([
                "Emotionally expressive",
                "Loyal in relationships",
                "Deep emotional connection",
                "Balanced emotions"
            ])
        },

        "personality": random.choice(personalities),

        "career": random.choice(careers),

        "love": random.choice(loves),

        "health": random.choice(healths)
    }

# =====================================================
# AUTO REMOVE OLD HOROSCOPES
# =====================================================

def clean_old_horoscopes():

    horoscopes = read_horoscopes()

    today = datetime.now().strftime("%Y-%m-%d")

    updated = [
        item for item in horoscopes
        if item.get("date") == today
    ]

    save_horoscopes(updated)

# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():

    return {
        "website": "Asteraa",
        "message": "Asteraa Backend Running"
    }

# =====================================================
# GET ALL BLOGS
# =====================================================

@app.get("/blogs")
def get_blogs():

    blogs = read_blogs()

    return {
        "success": True,
        "blogs": blogs
    }

# =====================================================
# GET SINGLE BLOG
# =====================================================

@app.get("/blogs/{blog_id}")
def get_single_blog(blog_id: int):

    blogs = read_blogs()

    for blog in blogs:

        if blog["id"] == blog_id:

            return {
                "success": True,
                "blog": blog
            }

    return {
        "success": False,
        "message": "Blog not found"
    }

# =====================================================
# ADD BLOG
# =====================================================

@app.post("/add-blog")
async def add_blog(

    title: str = Form(...),
    category: str = Form(...),
    content: str = Form(...),

    image: UploadFile = File(...)
):

    try:

        blogs = read_blogs()

        extension = image.filename.split(".")[-1]

        unique_name = f"{uuid.uuid4()}.{extension}"

        image_path = os.path.join(
            UPLOAD_FOLDER,
            unique_name
        )

        with open(image_path, "wb") as buffer:

            shutil.copyfileobj(
                image.file,
                buffer
            )

        new_blog = {

            "id": int(datetime.now().timestamp()),

            "title": title,

            "category": category,

            "content": content,

            "image": f"https://asteraa.onrender.com/uploads/{unique_name}",

            "created_at": datetime.now().strftime("%d %B %Y")
        }

        blogs.insert(0, new_blog)

        save_blogs(blogs)

        return {
            "success": True,
            "message": "Blog Added Successfully",
            "blog": new_blog
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }

# =====================================================
# DELETE BLOG
# =====================================================

@app.delete("/delete-blog/{blog_id}")
def delete_blog(blog_id: int):

    blogs = read_blogs()

    blog_to_delete = None

    for blog in blogs:

        if blog["id"] == blog_id:
            blog_to_delete = blog
            break

    if not blog_to_delete:

        return {
            "success": False,
            "message": "Blog not found"
        }

    # DELETE IMAGE

    image_url = blog_to_delete.get("image", "")

    if "/uploads/" in image_url:

        image_name = image_url.split("/uploads/")[1]

        image_path = os.path.join(
            UPLOAD_FOLDER,
            image_name
        )

        if os.path.exists(image_path):

            os.remove(image_path)

    updated_blogs = [

        blog for blog in blogs
        if blog["id"] != blog_id
    ]

    save_blogs(updated_blogs)

    return {
        "success": True,
        "message": "Blog Deleted Successfully"
    }

# =====================================================
# ADD HOROSCOPE
# =====================================================

@app.post("/add-horoscope")
def add_horoscope(data: HoroscopeCreate):

    clean_old_horoscopes()

    horoscopes = read_horoscopes()

    today = datetime.now().strftime("%Y-%m-%d")

    # REMOVE SAME ZODIAC OLD ENTRY

    updated_horoscopes = [

        item for item in horoscopes
        if item["zodiac"].lower() != data.zodiac.lower()
    ]

    new_horoscope = {

        "id": int(datetime.now().timestamp()),

        "zodiac": data.zodiac,

        "horoscope": data.horoscope,

        "date": today
    }

    updated_horoscopes.append(new_horoscope)

    save_horoscopes(updated_horoscopes)

    return {
        "success": True,
        "message": "Horoscope Added Successfully",
        "horoscope": new_horoscope
    }

# =====================================================
# GET ALL HOROSCOPES
# =====================================================

@app.get("/horoscopes")
def get_horoscopes():

    clean_old_horoscopes()

    return {
        "success": True,
        "horoscopes": read_horoscopes()
    }

# =====================================================
# GET SINGLE HOROSCOPE
# =====================================================

@app.get("/horoscope/{zodiac}")
def get_single_horoscope(zodiac: str):

    clean_old_horoscopes()

    horoscopes = read_horoscopes()

    for item in horoscopes:

        if item["zodiac"].lower() == zodiac.lower():

            return {
                "success": True,
                "horoscope": item
            }

    return {
        "success": False,
        "message": "Horoscope not found"
    }

# =====================================================
# DELETE HOROSCOPE
# =====================================================

@app.delete("/delete-horoscope/{horoscope_id}")
def delete_horoscope(horoscope_id: int):

    horoscopes = read_horoscopes()

    updated_horoscopes = [

        item for item in horoscopes
        if item["id"] != horoscope_id
    ]

    save_horoscopes(updated_horoscopes)

    return {
        "success": True,
        "message": "Horoscope Deleted Successfully"
    }

# =====================================================
# COMPATIBILITY API
# =====================================================

@app.get("/match")
def match(

    bride_name: str,
    bride_dob: str,

    groom_name: str,
    groom_dob: str
):

    return calculate_compatibility(

        bride_name,
        bride_dob,

        groom_name,
        groom_dob
    )
@app.post("/scan-palm")
async def scan_palm(
    image: UploadFile = File(...)
):

    try:

        image_bytes = await image.read()

        np_array = np.frombuffer(
            image_bytes,
            np.uint8
        )

        image_data = cv2.imdecode(
            np_array,
            cv2.IMREAD_COLOR
        )

        hand_found = detect_hand(image_data)

        if not hand_found:

            return {
                "success": False,
                "message": "No hand detected"
            }

        analysis = analyze_palm(image_data)

        return {
            "success": True,
            "analysis": analysis
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }
            
# =====================================================
# RUN SERVER
# =====================================================

import uvicorn

PORT = int(os.environ.get("PORT", 8080))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=PORT
    )