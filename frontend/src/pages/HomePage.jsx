import { useEffect, useState } from "react";

const HomePage = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("/stock_data.json")
      .then((res) => res.json())
      .then((data) => setStocks(data.slice(0, 100))); // Limit for speed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-lg tracking-tight">
          📈 Stock Market Table Viewer
        </h1>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-blue-100">
          <table className="min-w-full text-base text-left">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 uppercase text-xs sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-5 font-semibold tracking-wider">Date</th>
                <th className="p-5 font-semibold tracking-wider">Trade Code</th>
                <th className="p-5 font-semibold tracking-wider">Open</th>
                <th className="p-5 font-semibold tracking-wider">High</th>
                <th className="p-5 font-semibold tracking-wider">Low</th>
                <th className="p-5 font-semibold tracking-wider">Close</th>
                <th className="p-5 font-semibold tracking-wider">Volume</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item, i) => (
                <tr
                  key={i}
                  className={`border-t transition duration-200 ease-in-out ${
                    i % 2 === 0
                      ? "bg-white hover:bg-blue-50/80"
                      : "bg-blue-50/60 hover:bg-blue-100/80"
                  } hover:scale-[1.01] hover:shadow-md focus-within:bg-blue-200`}
                >
                  <td className="p-5 font-medium text-gray-700">{item.date}</td>
                  <td className="p-5 font-semibold text-blue-700">{item.trade_code}</td>
                  <td className="p-5 text-gray-600">{item.open}</td>
                  <td className="p-5 text-green-700 font-semibold">{item.high}</td>
                  <td className="p-5 text-red-700 font-semibold">{item.low}</td>
                  <td className="p-5 text-gray-700 font-bold">{item.close}</td>
                  <td className="p-5 text-gray-500">{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
