from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..views.user.model import User

import jwt
import json
from typing import Dict

security = HTTPBearer()

def encode(phone: str) -> str:
    payload = {
        "phone": phone
    }
    return jwt.encode(payload, "secret", algorithm="HS256")

def decode(code: str) -> Dict:
  return jwt.decode(code, "secret", algorithms=["HS256"])

async def hasAccess(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = decode(token)
        if payload: return payload
        else: raise HTTPException(
            status_code=401,
            detail='Invalid token'
            )
    except:
        raise HTTPException(
            status_code=401,
            detail='Invalid token'
            )
