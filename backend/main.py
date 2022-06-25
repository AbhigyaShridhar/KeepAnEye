from fastapi import FastAPI;
from fastapi.staticfiles import StaticFiles
from app.routes.routes import router as appRoutes;
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return "Welcome to the Keep an Eye backend"

app.include_router(appRoutes,prefix='/api')
