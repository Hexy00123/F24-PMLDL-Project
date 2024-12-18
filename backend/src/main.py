import asyncio
from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io
from src.generator import Generator
from concurrent.futures import ThreadPoolExecutor

# TODO: remove after model is added
from PIL import Image

class PromptBody(BaseModel):
    input: str

app = FastAPI()

generator = Generator()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/is_alive", tags=["IsAlive"])
def is_alive():
    return "Don't worry, I'm ok)"

executor = ThreadPoolExecutor(max_workers=1)

@app.post("/generate", tags=["Generate"])
async def generate(input: str = Form(...), mask: UploadFile = File(None)):
    # TODO: remove after model is added
    print(input)
        
    image_stream = await mask.read()
    image_stream = io.BytesIO(image_stream)
    print('DEBUG: get image stream')
    
    image = Image.open(image_stream)
    # image = image.resize((512, 512))
    print('DEBUG: resized image')

    loop = asyncio.get_event_loop()
    # image = generator.generate(image, input)
    image = await loop.run_in_executor(executor, generator, image, input)

    # image = Image.fromarray(image)
    # image_stream - output, change 'image'
    image_stream = io.BytesIO()
    image.save(image_stream, format='JPEG')
    image_stream.seek(0)
    print('DEBUG: converted image to bytes')
    
    return StreamingResponse(image_stream, media_type="image/jpeg", headers={"Content-Disposition": "inline; filename=responce.jpg"})
