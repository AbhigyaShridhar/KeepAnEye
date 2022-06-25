from fastapi import  Depends, APIRouter
from sqlalchemy.orm import Session
from app.server.database import get_db
from app.utils.jwtHandler import hasAccess
from .helper import sendOTP, authUser, notify, isExplicit

userRouter = APIRouter()

@userRouter.get('/current')
def call(key = Depends(hasAccess)):
    return {
        "phone": key["phone"]
    }

@userRouter.post('/otp')
def call(phone: str):
    return sendOTP(phone)

@userRouter.post('/auth')
def call(phone: str, OTP: str, db: Session = Depends(get_db)):
    return authUser(phone, OTP, db)

@userRouter.post('/check')
def call(content: str, key = Depends(hasAccess)):
    return isExplicit(content)

@userRouter.post('/notify')
def call(url: str, key = Depends(hasAccess)):
    return notify(key["phone"], url)
