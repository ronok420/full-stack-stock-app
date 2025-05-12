from sqlalchemy import Column, Integer, String, Float
# from backend.database import Base, engine
from database import Base, engine


class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    trade_code = Column(String, nullable=False)
    open = Column(Float, nullable=True)
    high = Column(Float, nullable=True)
    low = Column(Float, nullable=True)
    close = Column(Float, nullable=True)
    volume = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)
