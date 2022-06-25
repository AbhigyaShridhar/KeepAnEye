from app.server.database import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, server_default='gen_random_uuid()')
    phone = Column(String, nullable=False)
