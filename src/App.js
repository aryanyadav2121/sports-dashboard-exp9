import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function MatchCard({ sport, teams, score, details, icon }) {
  return (
    <div className="card">
      <h2>{icon} {sport}</h2>
      <h3>{teams}</h3>
      <p className="score">{score}</p>
      <p className="live">● LIVE</p>
      <p>{details}</p>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);

  // Get score records from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/items")
      .then((response) => {
        setItems(response.data);
        console.log("Data received from MongoDB:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const refreshScores = () => {
    alert("Scores Updated Successfully!");
  };

  // Send login details to MongoDB
  const loginUser = async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
      setMessage("Please enter username and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          username: username,
          password: password
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error saving login details.");
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <h1>🏆 Sports Score Dashboard</h1>

        <nav>
          <a href="#matches">Matches</a>
          <a href="#stats">Statistics</a>
          <a href="#login">Login</a>
        </nav>
      </header>

      <main>
        <h2 id="matches">🔥 Live Matches</h2>

        <div className="cards">
          <MatchCard
            icon="🏏"
            sport="Cricket"
            teams="India vs Australia"
            score="245/6 - 198/10"
            details="India leads by 47 runs"
          />

          <MatchCard
            icon="⚽"
            sport="Football"
            teams="India vs Japan"
            score="2 - 1"
            details="67 Minutes"
          />

          <MatchCard
            icon="🏀"
            sport="Basketball"
            teams="Lakers vs Bulls"
            score="98 - 94"
            details="3rd Quarter"
          />
        </div>

        <h2 id="stats">📊 Statistics</h2>

        <div className="cards">
          <div className="card">
            <h2>12</h2>
            <p>Live Matches</p>
          </div>

          <div className="card">
            <h2>38</h2>
            <p>Today's Matches</p>
          </div>

          <div className="card">
            <h2>25K+</h2>
            <p>Live Viewers</p>
          </div>
        </div>

        <br />

        <button onClick={refreshScores}>
          Refresh Scores
        </button>

        <h2>📡 MongoDB Data</h2>

        {items.length === 0 ? (
          <p>No score records found in MongoDB.</p>
        ) : (
          items.map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.team}</h3>
              <p className="score">{item.score}</p>
              <p>{item.status}</p>
            </div>
          ))
        )}

        <div className="login-box" id="login">
          <h2>🔐 Login</h2>

          <form onSubmit={loginUser}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
            />

            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p id="message">{message}</p>
        </div>
      </main>

      <footer>
        Sports Score Dashboard | Advanced Web Technology
      </footer>
    </div>
  );
}

export default App;