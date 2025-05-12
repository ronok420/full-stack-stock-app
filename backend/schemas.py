# # from . import models, database
# import models
# import database

# from pydantic import BaseModel


# # Base fields shared by create/update/response
# class StockBase(BaseModel):
#     date: str
#     trade_code: str
#     open: float
#     high: float
#     low: float
#     close: float
#     volume: str

# # For POST requests
# class StockCreate(StockBase):
#     pass

# # For PUT requests
# class StockUpdate(StockBase):
#     pass

# # For responses
# class StockOut(StockBase):
#     id: int

#     class Config:
#         orm_mode = True  # allows SQLAlchemy model instances to be returned


from typing import Optional
from pydantic import BaseModel

# Shared base fields (used only for inheritance)
class StockBase(BaseModel):
    date: str
    trade_code: str
    open: float
    high: float
    low: float
    close: float
    volume: str

# For POST requests (all fields required)
class StockCreate(StockBase):
    pass

# ✅ For PUT/PATCH requests (all fields optional)
class StockUpdate(BaseModel):
    date: Optional[str] = None
    trade_code: Optional[str] = None
    open: Optional[float] = None
    high: Optional[float] = None
    low: Optional[float] = None
    close: Optional[float] = None
    volume: Optional[str] = None

# For API response output
class StockOut(StockBase):
    id: int

    class Config:
        orm_mode = True
