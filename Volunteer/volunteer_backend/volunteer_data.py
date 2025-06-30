from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
from dotenv import load_dotenv
import os

from utils.deps import get_current_user

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "shorecare")

router = APIRouter()
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]

# ---------- MODELS ----------

class VolunteerDataModel(BaseModel):
    skills: list[str] = []
    badges: list[str] = []
    xp: int = 0
    totalCleanups: int = 0
    wallContributions: int = 0
    quizzesWon: int = 0

class FeedbackModel(BaseModel):
    comment: str
    from_user: str

class ProfileUpdateModel(BaseModel):
    bio: str | None = None
    location: str | None = None
    skills: list[str] | None = None


# ---------- ROUTES ----------

# Create/Init volunteer data
@router.post("/data")
async def create_data(data: VolunteerDataModel, user_id: str = Depends(get_current_user)):
    existing = await db["volunteer_data"].find_one({"volunteerId": ObjectId(user_id)})
    if existing:
        raise HTTPException(status_code=400, detail="Volunteer data already exists")
    
    result = await db["volunteer_data"].insert_one({
        "volunteerId": ObjectId(user_id),
        **data.dict(),
        "feedback": []
    })
    return {"message": "Volunteer data created", "id": str(result.inserted_id)}

# Get dashboard data
@router.get("/dashboard")
async def get_dashboard(user_id: str = Depends(get_current_user)):
    data = await db["volunteer_data"].find_one({"volunteerId": ObjectId(user_id)})
    if not data:
        raise HTTPException(status_code=404, detail="Volunteer data not found")

    data["_id"] = str(data["_id"])
    data["volunteerId"] = str(data["volunteerId"])
    return data

# Update volunteer dashboard data
@router.put("/data/update")
async def update_data(update: VolunteerDataModel, user_id: str = Depends(get_current_user)):
    result = await db["volunteer_data"].update_one(
        {"volunteerId": ObjectId(user_id)},
        {"$set": update.dict()}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Update failed or nothing changed")
    return {"message": "Volunteer data updated"}

# Add feedback to profile
@router.post("/feedback")
async def add_feedback(fb: FeedbackModel, user_id: str = Depends(get_current_user)):
    result = await db["volunteer_data"].update_one(
        {"volunteerId": ObjectId(user_id)},
        {"$push": {"feedback": {"comment": fb.comment, "from": fb.from_user}}}
    )
    return {"message": "Feedback added"}

# Fetch volunteer profile
@router.get("/profile")
async def get_profile(user_id: str = Depends(get_current_user)):
    user = await db["volunteer_profiles"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "username": user["username"],
        "email": user["email"],
        "phone": user["phone"],
        "isVerified": user.get("isVerified", False),
        "skills": user.get("skills", []),
        "bio": user.get("bio", ""),
        "location": user.get("location", "")
    }

# Update volunteer profile (bio, location, skills)
@router.put("/profile/update")
async def update_profile(update: ProfileUpdateModel, user_id: str = Depends(get_current_user)):
    update_data = {k: v for k, v in update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nothing to update")

    result = await db["volunteer_profiles"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Profile update failed or no change")

    return {"message": "Profile updated"}
