from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

# from backend import models, schemas, crud
# from backend.database import SessionLocal, engine, Base
import models, schemas, crud
from database import SessionLocal, engine, Base

# import models, schemas, crud
# from database import SessionLocal, engine, Base


# Create tables
Base.metadata.create_all(bind=engine)

# App init
app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ROUTES
@app.get("/stocks", response_model=list[schemas.StockOut])
def read_stocks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_stocks(db, skip=skip, limit=limit)

@app.get("/stocks/{stock_id}", response_model=schemas.StockOut)
def read_stock(stock_id: int, db: Session = Depends(get_db)):
    stock = crud.get_stock(db, stock_id)
    if not stock:
        raise HTTPException(status_code=404, detail="Stock not found")
    return stock

@app.post("/stocks", response_model=schemas.StockOut)
def create_stock(stock: schemas.StockCreate, db: Session = Depends(get_db)):
    return crud.create_stock(db, stock)

@app.put("/stocks/{stock_id}", response_model=schemas.StockOut)
def update_stock(stock_id: int, stock: schemas.StockUpdate, db: Session = Depends(get_db)):
    db_stock = crud.update_stock(db, stock_id, stock)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return db_stock

@app.delete("/stocks/{stock_id}")
def delete_stock(stock_id: int, db: Session = Depends(get_db)):
    db_stock = crud.delete_stock(db, stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return {"message": "Stock deleted"}
