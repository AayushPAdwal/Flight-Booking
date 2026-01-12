import React, { useState } from "react";
// axios is not needed for this version, but you can keep it for future use
// import axios from "axios"; 
import "./Style.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [searchDate, setSearchDate] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);


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

  // ✅ MODIFIED: Using a large local list of fake flights instead of an API call.
  const handleSearch = (e) => {
    e.preventDefault();

    if (fromLocation === toLocation) {
        alert("Departure and destination cities cannot be the same.");
        return;
    }

    setSearchPerformed(true);
    setBookingInfo(null);
    
    // A large list of fake flights for demonstration purposes.
    const allFlights = [
        // Delhi to Mumbai
        { id: 1, airline: "IndiGo", from: "Delhi", to: "Mumbai", time: "08:00 AM", price: 6200 },
        { id: 2, airline: "Vistara", from: "Delhi", to: "Mumbai", time: "11:30 AM", price: 7500 },
        { id: 3, airline: "SpiceJet", from: "Delhi", to: "Mumbai", time: "05:00 PM", price: 5800 },
        { id: 4, airline: "Air India", from: "Delhi", to: "Mumbai", time: "09:15 PM", price: 6800 },
        // Mumbai to Delhi
        { id: 5, airline: "IndiGo", from: "Mumbai", to: "Delhi", time: "07:30 AM", price: 6300 },
        { id: 6, airline: "Akasa Air", from: "Mumbai", to: "Delhi", time: "01:00 PM", price: 6100 },
        { id: 7, airline: "Vistara", from: "Mumbai", to: "Delhi", time: "08:45 PM", price: 7600 },
        // Delhi to Bangalore
        { id: 8, airline: "Vistara", from: "Delhi", to: "Bangalore", time: "06:00 AM", price: 8500 },
        { id: 9, airline: "IndiGo", from: "Delhi", to: "Bangalore", time: "12:00 PM", price: 8200 },
        { id: 10, airline: "Air India", from: "Delhi", to: "Bangalore", time: "07:00 PM", price: 8900 },
        // Bangalore to Delhi
        { id: 11, airline: "SpiceJet", from: "Bangalore", to: "Delhi", time: "09:00 AM", price: 7900 },
        { id: 12, airline: "IndiGo", from: "Bangalore", to: "Delhi", time: "04:30 PM", price: 8300 },
        // Mumbai to Bangalore
        { id: 13, airline: "Vistara", from: "Mumbai", to: "Bangalore", time: "08:30 AM", price: 7100 },
        { id: 14, airline: "Akasa Air", from: "Mumbai", to: "Bangalore", time: "05:00 PM", price: 6900 },
        { id: 15, airline: "IndiGo", from: "Mumbai", to: "Bangalore", time: "10:00 PM", price: 6800 },
        // Bangalore to Mumbai
        { id: 16, airline: "IndiGo", from: "Bangalore", to: "Mumbai", time: "06:45 AM", price: 6700 },
        { id: 17, airline: "Air India", from: "Bangalore", to: "Mumbai", time: "03:15 PM", price: 7200 },
        // Chennai to Kolkata
        { id: 18, airline: "Air India", from: "Chennai", to: "Kolkata", time: "11:00 AM", price: 8200 },
        { id: 19, airline: "IndiGo", from: "Chennai", to: "Kolkata", time: "08:00 PM", price: 7900 },
        // Kolkata to Delhi
        { id: 20, airline: "SpiceJet", from: "Kolkata", to: "Delhi", time: "09:00 PM", price: 7500 },
        { id: 21, airline: "Vistara", from: "Kolkata", to: "Delhi", time: "10:00 AM", price: 8100 },
    ];

    const filteredFlights = allFlights.filter(
      (flight) => flight.from === fromLocation && flight.to === toLocation
    );

    setFlights(filteredFlights);
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
      setPassengers([...passengers, { seat: seatId, class: seatClass, name: "", age: "", phone: "", gender: "" }]);
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
    if (passengers.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    if (passengers.some((p) => !p.name || !p.age || !p.phone || !p.gender)) {
      alert("Please fill all passenger details (Name, Age, Gender, and Phone No.) before continuing.");
      return;
    }
    if (passengers.some((p) => p.phone.length !== 10)) {
        alert("Please ensure all phone numbers are 10 digits long.");
        return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    let totalFare = 0;

    passengers.forEach((p) => {
      totalFare += p.class === "Business" ? 15000 : 6000;
    });
    
    setBookingInfo({
      pnr,
      flight: selectedFlight,
      passengers,
      totalFare,
      date: searchDate,
      time: selectedFlight.time,
    });

    setShowPayment(false);
    setSelectedFlight(null);
    setSelectedSeats([]);
    setPassengers([]);
  };

  const openAboutPage = () => {
    const aboutWindow = window.open("", "_blank");
    aboutWindow.document.write(`
      <html><head><title>About Us</title></head><body><h1>About Us</h1></body></html>
    `);
    aboutWindow.document.close();
  };

  const openContactPage = () => {
    const contactWindow = window.open("", "_blank");
    contactWindow.document.write(`
      <html><head><title>Contact Us</title></head><body><h1>Contact Us</h1></body></html>
    `);
    contactWindow.document.close();
  };

    return (
    <div className="flight-app">
      <header className="header">
        <h1>Air Routes Booking</h1>
        <nav className="nav-buttons">
          <button>Home</button>
          <button onClick={openAboutPage}>About</button>
          <button onClick={openContactPage}>Contact</button>
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
          <select required value={fromLocation} onChange={(e) => setFromLocation(e.target.value)}>
            <option value="">From</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Chennai</option>
            <option>Kolkata</option>
            <option>Bangalore</option>
          </select>
          <select required value={toLocation} onChange={(e) => setToLocation(e.target.value)}>
            <option value="">To</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Bangalore</option>
            <option>Delhi</option>
            <option>Chennai</option>
          </select>
          <input
            type="date"
            required
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {searchPerformed && !selectedFlight && !showPayment && !bookingInfo && (
        <section className="results-section">
          {flights.length > 0 ? (
            <>
              <h3>Available Flights</h3>
              <div className="flight-list">
                {flights.map((f) => (
                  <div key={f.id} className="flight-card">
                    <h4>{f.airline}</h4>
                    <p>{f.from} → {f.to}</p>
                    <p>Time: {f.time}</p>
                    <p>Economy Fare: ₹{f.price}</p>
                    <p>Business Fare: ₹15000</p>
                    <button onClick={() => handleBookNow(f)}>Book Now</button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h3>No flights found for the selected route.</h3>
          )}
        </section>
      )}

      {selectedFlight && !showPayment && (
        <section className="seat-map-section">
          <h3>Select Seats for {selectedFlight.airline}</h3>
          <div className="seat-legend">
            <span className="legend-item business">Business Class</span>
            <span className="legend-item economy">Economy Class</span>
          </div>
          <div className="airplane">
            <div className="cockpit">Cockpit</div>
            <div className="cabin">
              {seatNumbers.map((num) => {
                const seatClass = num <= 2 ? "Business" : "Economy";
                return (
                  <div key={num} className="seat-row">
                    {["A", "B", "C", "D"].map((col) => (
                      <button
                        key={col + num}
                        className={`seat ${seatClass.toLowerCase()} ${selectedSeats.includes(col + num) ? "selected" : ""}`}
                        onClick={() => toggleSeat(col + num, seatClass)}
                      >
                        {col + num}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="tail">Tail</div>
          </div>
          
          {selectedSeats.length > 0 && (
            <div className="passenger-form">
              <h4>Passenger Details</h4>
              {passengers.map((p) => (
                <div key={p.seat} className="passenger-card">
                  <p>Seat: <strong>{p.seat}</strong> ({p.class})</p>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={p.name}
                    onChange={(e) => handlePassengerChange(p.seat, "name", e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={p.age}
                    onChange={(e) => handlePassengerChange(p.seat, "age", e.target.value)}
                    required
                  />
                  
                  <select 
                    className="passenger-gender-select" 
                    value={p.gender} 
                    onChange={(e) => handlePassengerChange(p.seat, "gender", e.target.value)}
                    required
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <input
                    type="tel"
                    placeholder="Phone No."
                    value={p.phone}
                    onChange={(e) => handlePassengerChange(p.seat, "phone", e.target.value.replace(/[^0-9]/g, ''))}
                    required
                    minLength="10"
                    maxLength="10"
                  />
                </div>
              ))}
            </div>
          )}
          <button className="confirm-btn" onClick={confirmBooking}>
            Proceed to Payment
          </button>
        </section>
      )}

      {showPayment && (
        <section className="payment-section">
          <h3>Payment Gateway</h3>
          <div className="payment-options">
            <label> <input type="radio" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Credit/Debit Card </label>
            <label> <input type="radio" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} /> UPI </label>
            <label> <input type="radio" value="netbanking" checked={paymentMethod === "netbanking"} onChange={() => setPaymentMethod("netbanking")} /> Net Banking </label>
          </div>
          <form className="payment-form" onSubmit={handlePayment}>
            {paymentMethod === "card" && (
              <>
                <input type="text" placeholder="Card Holder Name" required />
                <input type="text" placeholder="Card Number" minLength="16" maxLength="16" required />
                <div className="payment-row">
                  <input type="text" placeholder="MM/YY" minLength="5" maxLength="5" required />
                  <input type="text" placeholder="CVV" minLength="3" maxLength="3" required />
                </div>
              </>
            )}
            {paymentMethod === "upi" && ( <input type="text" placeholder="Enter UPI ID (e.g. yourname@okbank)" required className="upi-input" /> )}
            {paymentMethod === "netbanking" && (
              <select required className="netbanking-select">
                <option value="">Select Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
            )}
            <button type="submit" className="confirm-btn"> Pay ₹{passengers.reduce((sum, p) => sum + (p.class === "Business" ? 15000 : 6000), 0)} </button>
          </form>
        </section>
      )}

      {bookingInfo && (
        <section className="confirmation-section">
          <h3>Booking Confirmed!</h3>
          <p>Your flight is confirmed. Have a safe journey!</p>
          <div className="booking-details">
            <p><strong>PNR:</strong> {bookingInfo.pnr}</p>
            <p><strong>Flight:</strong> {bookingInfo.flight.airline} ({bookingInfo.flight.from} → {bookingInfo.flight.to})</p>
            <p><strong>Date:</strong> {new Date(bookingInfo.date).toLocaleDateString('en-GB')}</p>
            <p><strong>Time:</strong> {bookingInfo.time}</p>
            <p><strong>Total Fare:</strong> ₹{bookingInfo.totalFare}</p>
            <h4>Passengers:</h4>
            <ul>
              {bookingInfo.passengers.map((p, i) => (
                <li key={i}>{p.name} (Age: {p.age}, Gender: {p.gender}, Phone: {p.phone}) — Seat {p.seat} [{p.class}]</li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                  <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  <input type="password" placeholder="Password" required />
                  <button type="submit" className="submit-btn">Login</button>
                </form>
              </div>
            ) : (
              <div className="form-content">
                <form onSubmit={handleSignUp}>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <input type="password" placeholder="Confirm Password" required />
                  <button type="submit" className="submit-btn">Sign Up</button>
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

export default App;