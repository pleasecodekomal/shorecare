from fastapi import APIRouter, HTTPException, Body
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from pydantic import BaseModel
from dotenv import load_dotenv
from bson import ObjectId

import jwt
import os
from datetime import datetime, timedelta

# Load env
load_dotenv()
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://komal2:mangoes@cluster0.2w2lrmf.mongodb.net/shorecare?retryWrites=true&w=majority&appName=Cluster0"
)
MONGO_DB = os.getenv("MONGO_DB", "shorecare")
SECRET_KEY = os.getenv("VOLUNTEER_SECRET_KEY", "dev_secret")

print("✅ Loaded VOLUNTEER_SECRET_KEY:", SECRET_KEY)

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]

# ---------- MODELS ----------
class RegisterModel(BaseModel):
    username: str
    email: str
    phone: str
    password: str

class LoginModel(BaseModel):
    username: str
    password: str


# ---------- REGISTER ----------
@router.post("/register")
async def register(user: RegisterModel):
    try:
        print("🔁 Register request received:", user)

        existing = await db["volunteer_profiles"].find_one({"username": user.username})
        if existing:
            raise HTTPException(status_code=400, detail="Username exists")

        hashed = pwd_context.hash(user.password)
        user_doc = {
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "password": hashed,
            "isVerified": False
        }
        result = await db["volunteer_profiles"].insert_one(user_doc)
        user_id = str(result.inserted_id)

        verify_token = jwt.encode(
            {
                "id": user_id,
                "purpose": "verify",
                "exp": datetime.utcnow() + timedelta(minutes=15)
            },
            SECRET_KEY,
            algorithm=ALGORITHM
        )

        verification_link = f"http://localhost:5173/verify?role=volunteer&token={verify_token}"
        print("✅ Verification link:", verification_link)

        return {"message": "Volunteer registered. Check your email to verify.", "link": verification_link}
    
    except Exception as e:
        print("❌ Registration error:", e)
        raise HTTPException(status_code=500, detail="Internal server error during registration")


# ---------- LOGIN ----------
@router.post("/login")
async def login(user: LoginModel):
    user_doc = await db["volunteer_profiles"].find_one({"username": user.username})
    if not user_doc:
        raise HTTPException(status_code=400, detail="Invalid login")

    if not pwd_context.verify(user.password, user_doc["password"]):
        raise HTTPException(status_code=400, detail="Invalid login")

    if not user_doc.get("isVerified", False):
        raise HTTPException(status_code=403, detail="Account not verified. Please check your email.")

    token = jwt.encode(
        {"id": str(user_doc["_id"]), "role": "volunteer"},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("✅ Login token generated:", token)
    return {"token": token}


# ---------- VERIFY ----------
@router.post("/verify")
async def verify_account(token: str = Body(...)):
    print("✅ /verify endpoint hit (Volunteer).")
    print("Received token:", token)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("✅ Decoded payload:", payload)

        if payload.get("purpose") != "verify":
            raise HTTPException(status_code=400, detail="Invalid token purpose")

        user_id = payload["id"]

        result = await db["volunteer_profiles"].update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"isVerified": True}}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="User not found or already verified")

        print("✅ Volunteer verified:", user_id)
        return {"message": "Your Volunteer account has been verified!"}

    except jwt.ExpiredSignatureError:
        print("❌ Token expired!")
        raise HTTPException(status_code=400, detail="Verification link expired")

    except jwt.InvalidTokenError:
        print("❌ Invalid token!")
        raise HTTPException(status_code=400, detail="Invalid token")
