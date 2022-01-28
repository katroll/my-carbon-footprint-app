import React, { useEffect, useState } from "react";
import WorldDataCard from "./WorldDataCard";
import "./Homepage.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Charts from "./Charts";
import ChartSelector from "./ChartSelector";

//Prevents scrolling on homepage
// document.body.style.overflow = "hidden";

function Homepage({
  user,
  loggedIn,
  setUser,
  setLoggedIn,
  flightHistory,
  shippingHistory,
  vehicleHistory,
  electricityHistory,
}) {
  const [worldData, setWorldData] = useState([]);
  const [chartSelector, setChartSelector] = useState("");

  const totalFlightCarbon = flightHistory.reduce(
    (count, flight) => (count += flight.carbon_lb / flight.passengers),
    0
  );
  const totalShippingCarbon = shippingHistory.reduce(
    (count, shipping) => (count += shipping.carbon_lb),
    0
  );

  const totalVehicleCarbon = vehicleHistory.reduce(
    (count, vehicle) => (count += vehicle.carbon_lb),
    0
  );

  const totalElectricCarbon = electricityHistory.reduce(
    (count, electricity) => (count += electricity.carbon_lb),
    0
  );

  //Logs out of account
  const logoutHandler = () => {
    fetch("https://vast-bastion-53494.herokuapp.com/users")
      .then((r) => r.json())
      .then((userData) => {
        setUser(userData[0]);
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    fetch("https://vast-bastion-53494.herokuapp.com/countryAverageCapita")
      .then((r) => r.json())
      .then((data) => {
        setWorldData(data.sort((a, b) => (a.average < b.average ? 1 : -1)));
        setChartSelector("mode-of-transport");
      });
  }, []);

  const selectHandler = (e) => {
    setChartSelector(e.target.value);
  };
  return (
    <div>
      <div className="homepage-container">
        <div className="user-data-container"></div>
        <div className="world-data-container">
          <div className="homepage-user-info">
            <h1>Where do you stand ..?</h1>
            <div>
              <div className="profile-image">
                <NavLink to={loggedIn ? "/user" : "/login"}>
                  <img
                    src={user.image}
                    alt="profile"
                    className="user-profile-img"
                  />
                </NavLink>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                {loggedIn ? (
                  <NavLink to="/">
                    <button onClick={logoutHandler}>Log Out</button>
                  </NavLink>
                ) : (
                  <NavLink to="/login">
                    <button>Log In</button>
                  </NavLink>
                )}
              </div>
              <div className="user">
                <h4>Total Carbon Footprint</h4>
                <h1 className="homepage-total-emission">
                  {flightHistory.length !== 0
                    ? `${(
                        Math.round(
                          (totalFlightCarbon +
                            totalShippingCarbon +
                            totalVehicleCarbon +
                            totalElectricCarbon) *
                            100
                        ) / 100
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lbs`
                    : 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="data">
            <h2>Average aviation emission per country</h2>
            <small>Statistics taken from 2018</small>
            <WorldDataCard worldData={worldData} />
          </div>
        </div>
        <div className="map-and-charts">
          <ChartSelector selectHandler={selectHandler} />
          <Charts chartSelector={chartSelector} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
