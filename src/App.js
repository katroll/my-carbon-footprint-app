import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import UserInfo from "./Components/UserInfo/UserInfo";
import NavBar from "./Components/NavBar/NavBar";
import Estimate from "./Components/Emissions/Estimate";
import defaultImage from "./images/default-profile.png";

function App() {
  //Initial state
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    image: { defaultImage },
  });

  const [shippingHistory, setShippingHistory] = useState([]);
  const [flightHistory, setFlightHistory] = useState([]);
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [electricityHistory, setElectricityHistory] = useState([]);

  //Fetches User Data
  const userAPI = "https://vast-bastion-53494.herokuapp.com/users";
  useEffect(() => {
    let isAPISubscribed = true;
    fetch(userAPI)
      .then((r) => r.json())
      .then((userData) => {
        if (isAPISubscribed) {
          setUser(userData[1]);
          setLoggedIn(true);
        }
      });
    return () => {
      isAPISubscribed = false;
    };
  }, []);

  useEffect(() => {
    fetch("https://vast-bastion-53494.herokuapp.com/shipping_histories")
      .then((resp) => resp.json())
      .then((data) => setShippingHistory(data));

    fetch("https://vast-bastion-53494.herokuapp.com/flight_histories")
      .then((resp) => resp.json())
      .then((data) => setFlightHistory(data));

    fetch("https://vast-bastion-53494.herokuapp.com/vehicle_histories")
      .then((resp) => resp.json())
      .then((data) => setVehicleHistory(data));

    fetch("https://vast-bastion-53494.herokuapp.com/electricity_histories")
      .then((resp) => resp.json())
      .then((data) => setElectricityHistory(data));
  }, []);

  function handleDeleteData(location, item) {
    fetch(`https://vast-bastion-53494.herokuapp.com/${location}/${item.id}`, {
      method: "DELETE",
    });

    let update;
    switch (location) {
      case "shipping_histories":
        update = shippingHistory.filter((shipping) => shipping.id !== item.id);
        setShippingHistory(update);
        break;
      case "flight_histories":
        update = flightHistory.filter((flight) => flight.id !== item.id);
        setFlightHistory(update);
        break;
      case "electricity_histories":
        update = electricityHistory.filter(
          (electricity) => electricity.id !== item.id
        );
        setElectricityHistory(update);
        break;
      case "vehicle_histories":
        update = vehicleHistory.filter((vehicle) => vehicle.id !== item.id);
        setVehicleHistory(update);
        break;
      default:
        console.log("deleted!!");
    }
  }

  function handleShippingSaveData(shipment) {
    fetch(`https://vast-bastion-53494.herokuapp.com/shipping_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: shipment.date,
        weight: shipment.weight,
        distance: shipment.distance,
        method: shipment.method,
        carbon_lb: shipment.carbon_lb,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setShippingHistory([...shippingHistory, data]));
  }

  function handleFlightSaveData(flight) {
    fetch(`https://vast-bastion-53494.herokuapp.com/flight_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: flight.date,
        passengers: flight.passengers,
        departure: flight.departure,
        destination: flight.destination,
        carbon_lb: flight.carbon_lb,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setFlightHistory([...flightHistory, data]));
  }

  function handleVehicleSaveData(vehicle) {
    fetch(`https://vast-bastion-53494.herokuapp.com/vehicle_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: vehicle.date,
        distance_value: vehicle.distance_value,
        distance_unit: vehicle.distance_unit,
        vehicle_make: vehicle.vehicle_make,
        vehicle_model: vehicle.vehicle_model,
        vehicle_year: vehicle.vehicle_year,
        carbon_lb: vehicle.carbon_lb,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setVehicleHistory([...vehicleHistory, data]));
  }

  function handleElectricitySaveData(electricity) {
    fetch(`https://vast-bastion-53494.herokuapp.com/electricity_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: electricity.date,
        country: electricity.country,
        state: electricity.state,
        electricity_value: electricity.electricity_value,
        carbon_lb: electricity.carbon_lb,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setElectricityHistory([...electricityHistory, data]));
  }

  return (
    <div className="App">
      <div className="background"></div>
      <NavBar
        user={user}
        loggedIn={loggedIn}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
      <Switch>
        <Route
          path="/login"
          component={() => (
            <Login setUser={setUser} setLoggedIn={setLoggedIn} />
          )}
        />
        <Route path="/about" component={About} />
        <Route
          path="/user"
          component={() => (
            <UserInfo
              user={user}
              setUser={setUser}
              onDeleteData={handleDeleteData}
              flightHistory={flightHistory}
              shippingHistory={shippingHistory}
              vehicleHistory={vehicleHistory}
              electricityHistory={electricityHistory}
              onSaveVehicleData={handleVehicleSaveData}
              onSaveShippingData={handleShippingSaveData}
              onSaveFlightData={handleFlightSaveData}
              onSaveElectricityData={handleElectricitySaveData}
            />
          )}
        />

        <Route
          path="/estimate"
          component={() => (
            <Estimate
              onSaveVehicleData={handleVehicleSaveData}
              onSaveShippingData={handleShippingSaveData}
              onSaveFlightData={handleFlightSaveData}
              onSaveElectricityData={handleElectricitySaveData}
              onDeleteData={handleDeleteData}
              flightHistory={flightHistory}
              electricityHistory={electricityHistory}
              vehicleHistory={vehicleHistory}
              shippingHistory={shippingHistory}
            />
          )}
        />
        <Route
          path="/"
          component={() => (
            <Homepage
              user={user}
              loggedIn={loggedIn}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              flightHistory={flightHistory}
              shippingHistory={shippingHistory}
              vehicleHistory={vehicleHistory}
              electricityHistory={electricityHistory}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
