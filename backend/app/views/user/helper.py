from profanity_check import predict_prob

from twilio.rest import Client

from typing import Dict

from .model import User

import jwt

from decouple import config

from sqlalchemy.orm import Session

from app.utils.jwtHandler import encode

#helper functions

def isExplicit(content: str) -> Dict:
    """
    Function to check the level of profanity in a string
    if the prediction is found to be greater than or equal
    to 0.7, the string is marked as "explicit"
    """
    try:
        content = [content]
        flag = predict_prob(content) >= 0.7
        return {
            "explicit": flag.tolist()[0]
        }
    except Exception as e:
        return {
            "message": str(e)
        }

#twilio
account_sid = config('account_sid')
auth_token = config('auth_token')
OTP_token = config('OTP_token')
number = config('number')

client = Client(account_sid, auth_token)
verify = client.verify.services(OTP_token)

def sendOTP(phone: str) -> Dict:
    """
    Sends a one time password to the given number
    """
    try:
        verify.verifications.create(to=phone, channel='sms')
        return {
            "message": "OTP sent"
        }
    except:
        return {
            "message": "Invalid number"
        }

def verifyNumber(phone: str, otp: str) -> bool:
    """
    verifies the otp for a given number
    """
    try:
        res = verify.verification_checks.create(to=phone, code=otp)
        return res.status == 'approved'
    except:
        return False

def notify(contact: str, url: str) -> Dict:
    """
    sends a notification to the given phone number
    """
    try:
        client.messages.create(
          body=f'Your kid might be looking at something fishy. The url which raised this warning is: "{url}"',
          from_=number,
          to=contact
        )
        return {
            "message": "notification sent successfully"
        }
    except Exception as e:
        return {
            "message": "message failed",
            "error": str(e)
        }

#database
def addUser(phone: str, db: Session):
    """
    checks if the given phone number exists in the database,
    if not than adds the number to the db
    """
    users = db.query(User).filter(User.phone==phone).all()
    if len(users) == 0:
        user = User(phone=phone)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    else:
        return users[0]

#controller helpers

def authUser(phone: str, OTP: str, db: Session) -> Dict:
    try:
        if verifyNumber(phone, OTP):
            return {
                "message": "verification successfull",
                "user": addUser(phone, db),
                "token": encode(phone)
            }
        else:
            return {
                "message": "Verification failed"
            }
    except Exception as e:
        return {
            "message": "something went wrong",
            "error": str(e)
        }
