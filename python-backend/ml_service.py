from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import random
import time

# Initialize FastAPI app
app = FastAPI(title="JobPortal ML Service")

# IMPORTANT: Allow React Frontend (running on port 5173) to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
class AnalysisResult(BaseModel):
    score: int
    extractedSkills: List[str]
    recommendedRole: str

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"status": "ML Service Operational", "version": "v2.0"}

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(None)):
    """
    Simulates parsing a resume PDF and running ML scoring.
    """
    # Simulate heavy ML processing time (1.5 seconds)
    time.sleep(1.5) 
    
    # Mock Logic: In a real app, you would use 'pdfplumber' or 'spacy' here.
    
    possible_skills = ["Python", "FastAPI", "Machine Learning", "Leadership", "Docker", "Kubernetes", "AWS"]
    
    # Randomly pick 3-5 skills
    mock_skills = random.sample(possible_skills, k=random.randint(3, 5))
    
    # Random score between 70 and 98
    mock_score = random.randint(70, 98)
    
    return {
        "score": mock_score,
        "extractedSkills": mock_skills,
        "recommendedRole": "Senior AI Engineer"
    }

# To run this file:
# uvicorn ml_service:app --reload --port 8000