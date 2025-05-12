const BASE_URL = "http://127.0.0.1:8000"; // Replace with your deployed URL if needed

//  Get all stocks
export async function getStocks() {
  const res = await fetch(`${BASE_URL}/stocks`);
  return await res.json();
}

// Get a single stock by ID
export async function getStockById(id) {
  const res = await fetch(`${BASE_URL}/stocks/${id}`);
  return await res.json();
}

//  Create a new stock entry
export async function createStock(stock) {
  const res = await fetch(`${BASE_URL}/stocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(stock)
  });
  return await res.json();
}

//  Update an existing stock (partial or full)
export async function updateStock(id, stock) {
  const res = await fetch(`${BASE_URL}/stocks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(stock)
  });
  return await res.json();
}

//  Delete a stock by ID
export async function deleteStock(id) {
  const res = await fetch(`${BASE_URL}/stocks/${id}`, {
    method: "DELETE"
  });
  return await res.json();
}
