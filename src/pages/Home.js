import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style.css";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setActiveTab("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toggleModal();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toggleModal();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const fakeFlights = [
      { id: 1, airline: "IndiGo", from: "Delhi", to: "Mumbai", time: "10:00 AM", price: 6000 },
      { id: 2, airline: "Air India", from: "Delhi", to: "Mumbai", time: "2:00 PM", price: 6500 },
      { id: 3, airline: "SpiceJet", from: "Delhi", to: "Mumbai", time: "6:00 PM", price: 5800 },
      { id: 4, airline: "Vistara", from: "Delhi", to: "Mumbai", time: "9:00 PM", price: 7200 },
      { id: 5, airline: "Go First", from: "Delhi", to: "Pune", time: "8:00 AM", price: 5500 },
      { id: 6, airline: "AirAsia", from: "Delhi", to: "Bangalore", time: "11:00 AM", price: 6300 },
      { id: 7, airline: "Akasa Air", from: "Delhi", to: "Hyderabad", time: "3:00 PM", price: 6100 }
    ];
    setFlights(fakeFlights);
    navigate("/results", { state: { flights: fakeFlights, searchDate } });
  };

  const handleBookNow = (flight) => {
    if (!isLoggedIn) {
      toggleModal();
      return;
    }
    setSelectedFlight(flight);
    setSelectedSeats([]);
    setPassengers([]);
  };

  const seatNumbers = [1, 2, 3, 4, 5, 6];

  const toggleSeat = (seatId, seatClass) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
      setPassengers(passengers.filter((p) => p.seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setPassengers([...passengers, { seat: seatId, class: seatClass, name: "", age: "" }]);
    }
  };

  const handlePassengerChange = (seat, field, value) => {
    setPassengers(
      passengers.map((p) =>
        p.seat === seat ? { ...p, [field]: value } : p
      )
    );
  };

  const confirmBooking = () => {
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    let totalFare = 0;

    passengers.forEach((p) => {
      totalFare += p.class === "Business" ? 15000 : 6000;
    });

    const now = new Date();
    const bookingDate = now.toLocaleDateString();
    const bookingTime = now.toLocaleTimeString();

    setBookingInfo({ pnr, flight: selectedFlight, passengers, totalFare, flightDate: searchDate, bookingDate, bookingTime });
    setSelectedFlight(null);
    setSelectedSeats([]);
    setPassengers([]);
  };

  return (
    <div className="flight-app">
      <header className="header">
        <h1>Air Routes Booking</h1>
        <nav className="nav-buttons">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {isLoggedIn ? (
            <span className="welcome">Welcome, User</span>
          ) : (
            <button className="login-btn" onClick={toggleModal}>
              Login / Sign Up
            </button>
          )}
        </nav>
      </header>

      <section className="hero">
        <h2>Your Journey Begins Here</h2>
        <p>Find the best flights at the best prices</p>
        <a href="#search" className="cta-button">Book Now</a>
      </section>

      <section className="search-section" id="search">
        <h3>Search Flights</h3>
        <form className="flight-form" onSubmit={handleSearch}>
          <select required>
            <option value="">From</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
          </select>
          <select required>
            <option value="">To</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Chennai</option>
            <option>Pune</option>
            <option>Hyderabad</option>
          </select>
          <input
            type="date"
            required
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {bookingInfo && (
        <section className="confirmation-section">
          <h3>Booking Confirmed!</h3>
          <p><strong>PNR:</strong> {bookingInfo.pnr}</p>
          <p><strong>Flight:</strong> {bookingInfo.flight.airline} ({bookingInfo.flight.from} → {bookingInfo.flight.to})</p>
          <p><strong>Flight Date:</strong> {bookingInfo.flightDate}</p>
          <p><strong>Booking Date:</strong> {bookingInfo.bookingDate}</p>
          <p><strong>Booking Time:</strong> {bookingInfo.bookingTime}</p>
          <p><strong>Total Fare:</strong> ₹{bookingInfo.totalFare}</p>
          <h4>Passengers:</h4>
          <ul>
            {bookingInfo.passengers.map((p, i) => (
              <li key={i}>{p.name} (Age: {p.age}) — Seat {p.seat} [{p.class}]</li>
            ))}
          </ul>
        </section>
      )}

      {/* Login / Signup Modal */}
      {showModal && (
        <div className="login-modal">
          <div className="login-box">
            <div className="tabs">
              <button className={activeTab === "login" ? "tab active" : "tab"} onClick={() => setActiveTab("login")}>Login</button>
              <button className={activeTab === "signup" ? "tab active" : "tab"} onClick={() => setActiveTab("signup")}>Sign Up</button>
            </div>

            {activeTab === "login" ? (
              <div className="form-content">
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button className="submit-btn">Login</button>
                </form>
              </div>
            ) : (
              <div className="form-content">
                <form onSubmit={handleSignUp}>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <input type="password" placeholder="Confirm Password" required />
                  <button className="submit-btn">Sign Up</button>
                </form>
              </div>
            )}

            <button className="close-btn" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 AirRoutesBooking. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
