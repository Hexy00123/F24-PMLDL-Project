from typing import Annotated
from pydantic import BaseModel
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io

class PromptBody(BaseModel):
    input: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/is_alive", tags="IsAlive")
def predict():
    return "Don't worry, I'm ok)"

@app.post("/generate", tags="Generate")
def predict(prompt_body: Annotated[PromptBody, Body()]):
    # TODO: remove after model is added
    from time import sleep 
    sleep(2)
    
    with open('src/temp_responce.jpg', mode='rb') as file: 
        image = file.read()

    image_stream = io.BytesIO(image)
    # return {'input': prompt_body.input} 
    return StreamingResponse(image_stream, media_type="image/jpeg", headers={"Content-Disposition": "inline; filename=responce.jpg"})

@app.options("/generate", tags="Generate")
def options_generate():
    return {"message": "CORS preflight request handled"}