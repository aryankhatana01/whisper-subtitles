from fastapi import FastAPI, Query, UploadFile, File
import shutil
from pathlib import Path
import utils
from fastapi.middleware.cors import CORSMiddleware
from cors_origins import Origins
import os
from fastapi.responses import FileResponse

app = FastAPI()

origins = Origins.origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_filename = ""

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    path = Path(__file__).parents[1] / "saved_videos" / file.filename
    try:
        with path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        print("Error: ", e)
    global current_filename
    current_filename = file.filename
    return {"filename": file.filename}

@app.get("/predict/")
async def predict(filename: str):
    in_path = Path(__file__).parents[1] / "saved_videos" / filename
    out_path = "result/"
    utils.transcribe(in_path, out_path)
    os.remove(in_path)
    return {
        "STATUS": "SUCCESS",
    }

@app.get("/getSubtitles")
async def get_srt(filename: str):
    filename = f"result/{filename[:-4]}.srt"
    return FileResponse(filename)

@app.get("/")
def read_root():
    return {"Hello": "World"}
