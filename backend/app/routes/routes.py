from sys import prefix
from fastapi import Depends, APIRouter

from app.utils.jwtHandler import hasAccess

from ..views.user.controller import userRouter

router = APIRouter()

router.include_router(
    userRouter,
    prefix='/user',
)
