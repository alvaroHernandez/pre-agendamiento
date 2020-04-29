import React from "react";
import Availability from "../Availability/Availability";
import Logout from "../Logout/Logout";

const Home = () => (
  <div>
    <p>Bienvenido a Pre-Agendamiento!</p>
    <Logout />
    <Availability />
  </div>
);

export default Home;
