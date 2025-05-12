from sqlalchemy.orm import Session
# from . import models, schemas
import models, schemas


# Read all stocks
def get_stocks(db: Session, skip: int = 0, limit: int = None):
    query = db.query(models.Stock).offset(skip)
    if limit is not None:
        query = query.limit(limit)
    return query.all()

# Read one stock by ID
def get_stock(db: Session, stock_id: int):
    return db.query(models.Stock).filter(models.Stock.id == stock_id).first()

# Create a stock
def create_stock(db: Session, stock: schemas.StockCreate):
    db_stock = models.Stock(**stock.dict())
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock

# Update a stock
# def update_stock(db: Session, stock_id: int, updated_stock: schemas.StockUpdate):
#     db_stock = get_stock(db, stock_id)
#     if db_stock:
#         for key, value in updated_stock.dict().items():
#             setattr(db_stock, key, value)
#         db.commit()
#         db.refresh(db_stock)
#     return db_stock
def update_stock(db: Session, stock_id: int, updated_stock: schemas.StockUpdate):
    db_stock = get_stock(db, stock_id)
    if db_stock:
        # Only update fields that were sent in the request
        for key, value in updated_stock.dict(exclude_unset=True).items():
            setattr(db_stock, key, value)
        db.commit()
        db.refresh(db_stock)
    return db_stock


# Delete a stock
def delete_stock(db: Session, stock_id: int):
    db_stock = get_stock(db, stock_id)
    if db_stock:
        db.delete(db_stock)
        db.commit()
    return db_stock
