from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_router
from volunteer_data import router as data_router
from volunteer_drive import router as drive_router

# ✅ Initialize FastAPI app first
app = FastAPI(
    title="Volunteer Backend"
)

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your routers AFTER app is created
app.include_router(auth_router, prefix="/api")
app.include_router(data_router, prefix="/api")
app.include_router(drive_router, prefix="/api")

# ✅ Test root route
@app.get("/")
def root():
    return {"message": "Volunteer backend running"}
