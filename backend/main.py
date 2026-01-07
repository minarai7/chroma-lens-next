from fastapi import FastAPI, Response, status, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import os
import uuid
import json
from datetime import datetime
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store uploaded files and analysis results
UPLOAD_DIR = Path("uploads")
ANALYSIS_DIR = Path("analysis")
UPLOAD_DIR.mkdir(exist_ok=True)
ANALYSIS_DIR.mkdir(exist_ok=True)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # Save the uploaded file
    file_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Simulate analysis (replace with real analysis logic later)
    analysis_result = {
        "id": file_id,
        "filename": file.filename,
        "palette": ["#4f8cff", "#e6e6eb", "#171a21", "#0f1115", "#9aa0a6"],
        "hue_histogram": file.filename,
        "harmonies": {
            "complementary": ["#4f8cff", "#ffb14f"],
            "analogous": ["#4f8cff", "#4fdbff", "#4f62ff"],
        },
        "upload_time": datetime.now().isoformat(),  # Add upload time
    }

    # Save analysis result
    analysis_path = ANALYSIS_DIR / f"{file_id}.json"
    with analysis_path.open("w") as f:
        json.dump(analysis_result, f)

    return analysis_result

@app.get("/uploads")
def list_uploads():
    # List all analysis results sorted by upload time (descending)
    files = []
    for analysis_file in ANALYSIS_DIR.iterdir():
        with analysis_file.open() as f:
            files.append(json.load(f))
    files.sort(key=lambda x: x["upload_time"], reverse=True)  # Sort by upload time
    return {"uploads": files}

@app.get("/analysis/{file_id}")
def get_analysis(file_id: str):
    # Retrieve analysis result by ID
    analysis_path = ANALYSIS_DIR / f"{file_id}.json"
    if not analysis_path.exists():
        raise HTTPException(status_code=404, detail="Analysis not found")
    with analysis_path.open() as f:
        return json.load(f)