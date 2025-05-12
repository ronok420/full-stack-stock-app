import json
from sqlalchemy.orm import Session
from database import SessionLocal, Base, engine
from models import Stock

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def load_json_to_db():
    with open("stock_market_data.json", "r") as f:
        data = json.load(f)

    db: Session = SessionLocal()
    for item in data:
        try:
            stock = Stock(
                date=item.get("date"),
                trade_code=item.get("trade_code"),
                open=float(str(item.get("open", "0")).replace(",", "")),
                high=float(str(item.get("high", "0")).replace(",", "")),
                low=float(str(item.get("low", "0")).replace(",", "")),
                close=float(str(item.get("close", "0")).replace(",", "")),
                volume=item.get("volume", "0")
            )
            db.add(stock)
        except Exception as e:
            print(f"Skipping row due to error: {e}")
    db.commit()
    db.close()

if __name__ == "__main__":
    load_json_to_db()
