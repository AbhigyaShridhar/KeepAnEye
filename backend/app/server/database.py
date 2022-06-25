from sqlalchemy.orm import declarative_base
from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_cockroachdb import run_transaction

ALCHEMY_URL = config('ALCHEMY_URL')

Base = declarative_base()

engine = create_engine(ALCHEMY_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
