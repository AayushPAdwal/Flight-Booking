import React from "react";
import { useLocation, Link } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const { flights = [], searchDate } = location.state || {};

  return (
    <div style={{ padding: "40px" }}>
      <h1>Available Flights</h1>
      <p><strong>Search Date:</strong> {searchDate}</p>

      {flights.length > 0 ? (
        <ul>
          {flights.map((f) => (
            <li key={f.id}>
              <strong>{f.airline}</strong> — {f.from} → {f.to} <br />
              Time: {f.time} | Price: ₹{f.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found.</p>
      )}

      <Link to="/" style={{ color: "blue" }}>← Back to Home</Link>
    </div>
  );
}

export default SearchResults;
