import os
import torch
import shutil
import base64
import uuid
import logging
import soundfile as sf
import torchaudio
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
from typing import Optional

# Import HeartLib pipeline
from heartlib import HeartMuLaGenPipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global model variable
pipe = None
MODEL_PATH = "./ckpt"
VERSION = "3B"
ASSETS_DIR = "./assets"
TEMP_DIR = "./temp_generations"

os.makedirs(TEMP_DIR, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pipe
    logger.info("Loading HeartMuLa model...")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"Using device: {device}")
    
    try:
        pipe = HeartMuLaGenPipeline.from_pretrained(
            MODEL_PATH,
            device=device,
            dtype=torch.bfloat16,
            version=VERSION,
        )
        logger.info("Model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise e
    yield
    logger.info("Shutting down...")

app = FastAPI(lifespan=lifespan)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated files
app.mount("/files", StaticFiles(directory=TEMP_DIR), name="files")

class GenerationRequest(BaseModel):
    lyrics: Optional[str] = ""
    tags: str
    duration_s: int = 10
    temperature: float = 1.0
    topk: int = 50
    cfg_scale: float = 1.5
    seed: Optional[int] = None  # For reproducible generations

class GenerationResponse(BaseModel):
    id: str
    url: str
    filename: str

def save_audio(wav, filename):
    path = os.path.join(TEMP_DIR, filename)
    try:
         torchaudio.save(path, wav, 48000)
    except Exception:
        # Fallback for Windows/Nightly issue
        wav_np = wav.cpu().float().numpy()
        if wav_np.ndim == 2:
            wav_np = wav_np.T
        sf.write(path, wav_np, 48000)
    return path

@app.post("/generate", response_model=GenerationResponse)
async def generate_music(req: GenerationRequest):
    global pipe
    if not pipe:
        raise HTTPException(status_code=503, detail="Model not initialized")

    try:
        # Validate/Process inputs
        lyrics = req.lyrics if req.lyrics else ""
        tags = req.tags
        
        # Set seed for reproducibility
        if req.seed is not None:
            torch.manual_seed(req.seed)
            if torch.cuda.is_available():
                torch.cuda.manual_seed_all(req.seed)
            logger.info(f"Using seed: {req.seed}")
        
        # Calculate max_audio_length_ms
        max_audio_length_ms = req.duration_s * 1000

        logger.info(f"Generating: tags='{tags}', duration={req.duration_s}s")

        file_id = str(uuid.uuid4())
        filename = f"{file_id}.wav"
        save_path = os.path.join(TEMP_DIR, filename)

        # Run model - it saves the file and returns the output dict
        output = pipe(
            {
                "lyrics": lyrics,
                "tags": tags,
            },
            max_audio_length_ms=max_audio_length_ms,
            topk=req.topk,
            temperature=req.temperature,
            cfg_scale=req.cfg_scale,
            save_path=save_path,
        )
        
        return {
            "id": file_id,
            "url": f"/files/{filename}",
            "filename": filename
        }

    except Exception as e:
        logger.error(f"Generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": pipe is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
