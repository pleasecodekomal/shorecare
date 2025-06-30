from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
from dotenv import load_dotenv
from datetime import datetime
import os

from utils.deps import get_current_user

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "shorecare")

router = APIRouter()
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]

# ---------- MODELS ----------

class DriveModel(BaseModel):
    location: str
    date: datetime
    wasteCollectedKg: float
    hoursVolunteered: float

class JoinDriveModel(BaseModel):
    drive_id: str
    name: str | None = None
    phone: str | None = None
    skills: list[str]
    motivation: str | None = None
    availability: str | None = None

# ---------- ROUTES ----------

# Add a drive
@router.post("/drive")
async def add_drive(drive: DriveModel, user_id: str = Depends(get_current_user)):
    drive_doc = {
        "volunteerId": ObjectId(user_id),
        "location": drive.location,
        "date": drive.date,
        "wasteCollectedKg": drive.wasteCollectedKg,
        "hoursVolunteered": drive.hoursVolunteered
    }
    result = await db["volunteer_drives"].insert_one(drive_doc)
    return {"message": "Drive recorded", "id": str(result.inserted_id)}

# Get all drives for current volunteer
@router.get("/drives")
async def get_my_drives(user_id: str = Depends(get_current_user)):
    drives = db["volunteer_drives"].find({"volunteerId": ObjectId(user_id)})
    result = []
    async for d in drives:
        d["_id"] = str(d["_id"])
        d["volunteerId"] = str(d["volunteerId"])
        result.append(d)
    return result

# Join a drive
@router.post("/join-drive")
async def join_drive(data: JoinDriveModel, user_id: str = Depends(get_current_user)):
    drive_obj_id = ObjectId(data.drive_id)

    # Prevent duplicate registration
    already = await db["drive_registrations"].find_one({
        "drive_id": drive_obj_id,
        "volunteer_id": ObjectId(user_id)
    })
    if already:
        raise HTTPException(status_code=400, detail="Already registered for this drive.")

    # Get profile
    profile = await db["volunteer_profiles"].find_one({"_id": ObjectId(user_id)})
    if not profile:
        raise HTTPException(status_code=404, detail="Volunteer profile not found.")

    name = data.name or profile.get("username", "Anonymous")
    phone = data.phone or profile.get("phone", "Unknown")

    await db["drive_registrations"].insert_one({
        "volunteer_id": ObjectId(user_id),
        "drive_id": drive_obj_id,
        "name": name,
        "phone": phone,
        "skills": data.skills[:5],  # Enforce max 5
        "motivation": data.motivation,
        "availability": data.availability,
        "timestamp": datetime.utcnow()
    })

    return {"message": "Successfully registered for the drive!"}
