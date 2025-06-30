from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from pymongo import MongoClient
from dotenv import load_dotenv
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline
import os
import torch
import asyncio
from diffusers.schedulers.scheduling_dpmsolver_multistep import DPMSolverMultistepScheduler

# --- Load .env ---
load_dotenv()

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://komal2:mangoes@cluster0.2w2lrmf.mongodb.net/shorecare?retryWrites=true&w=majority&appName=Cluster0"
)
DB_NAME = os.getenv("MONGO_DB", "shorecare")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db["ngo_ai"]

# --- Load Models ---
qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
gen_pipeline = pipeline("text2text-generation", model="google/flan-t5-small")

# ✅ Stable Diffusion for images

device = "cuda" if torch.cuda.is_available() else "cpu"
dtype = torch.float16 if device == "cuda" else torch.float32

print(f"🔹 Detected device: {device}")
print(f"🔹 Using dtype: {dtype}")

image_pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=dtype
)
image_pipe.scheduler = DPMSolverMultistepScheduler.from_config(image_pipe.scheduler.config)

image_pipe.to(device)

# --- FastAPI App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Ask endpoint ---
@app.post("/ask")
async def ask(question: str = Body(..., embed=True)):
    faqs = list(collection.find({"type": "faq"}))
    context = ' '.join([f"{item['question']} {item['answer']}" for item in faqs])

    print("🔹 Loaded FAQs from DB:", faqs)
    print("🔹 Combined context:", context)

    result = qa_pipeline(question=question, context=context)
    return {"answer": result['answer']}

# --- Draft endpoint ---
@app.post("/draft")
async def draft(prompt: str = Body(..., embed=True)):
    prompts = list(collection.find({"type": "prompt"}))

    context = ""
    for item in prompts:
        if prompt.lower() in item['prompt'].lower():
            context = item['context']
            break

    if not context:
        context = (
            "We are organizing a community beach cleanup drive this weekend. "
            "The invite should be warm, motivational and include date, place and benefits. "
            "Encourage families and volunteers to join."
        )

    full_prompt = f"Task: {prompt}\n\nContext:\n{context}\n\nWrite this as a friendly, warm invite."

    print("🔹 Prompt received:", prompt)
    print("🔹 Matched context:", context)
    print("🔹 Full prompt sent:", full_prompt)

    result = gen_pipeline(full_prompt, max_length=250)
    return {"draft": result[0]["generated_text"]}

# --- Image generation endpoint ---
@app.post("/image")
async def generate_image(prompt: str = Body(..., embed=True)):
    print(f"🔹 Generating image on {device} with dtype {dtype} for prompt: {prompt}")

    loop = asyncio.get_event_loop()

    def run_generation():
        return image_pipe(
            prompt=prompt,
            num_inference_steps=25,   # 👈 reduce steps for speed
            guidance_scale=7.5,
            height=384, 
            width=384      
        ).images[0]

    image = await loop.run_in_executor(None, run_generation)

    save_path = "generated_image.png"
    image.save(save_path)

    print(f"🔹 Image saved to {save_path}")

    return {"message": "✅ Image generated!", "file": save_path}

# --- Optional video generation placeholder ---
@app.post("/video")
async def generate_video(prompt: str = Body(..., embed=True)):
    print(f"🔹 Video prompt received: {prompt}")

    loop = asyncio.get_event_loop()

    def simulate_video_generation():
        # Simulate AnimateDiff work
        import time
        time.sleep(5)
        return f"Awareness clip generated for: {prompt}"

    result = await loop.run_in_executor(None, simulate_video_generation)

    return {"message": f"✅ {result}"}
