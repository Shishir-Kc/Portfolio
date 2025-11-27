from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import AClient

from . import crud, schemas
from .database import get_supabase

app = FastAPI()

origins = [
    "http://localhost:3000",
    # Add other allowed origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/emails/", response_model=schemas.Email)
async def create_email(email: schemas.EmailCreate, supabase: AClient = Depends(get_supabase)):
    db_email = await crud.get_email_by_email(supabase, email=email.email)
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await crud.create_email(supabase=supabase, email=email)

@app.get("/emails/", response_model=list[schemas.Email])
async def read_emails(supabase: AClient = Depends(get_supabase)):
    return await crud.get_emails(supabase)

@app.post("/user-info/", response_model=schemas.UserInfo)
async def create_user_info(
    user_info: schemas.UserInfoCreate, supabase: AClient = Depends(get_supabase)
):
    return await crud.create_user_info(supabase=supabase, user_info=user_info)

@app.get("/user-info/", response_model=list[schemas.UserInfo])
async def read_all_user_info(supabase: AClient = Depends(get_supabase)):
    return await crud.get_all_user_info(supabase)

@app.get('/')
def server():
    return {
        'response':"hello"
    }