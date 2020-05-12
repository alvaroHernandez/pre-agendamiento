import React from "react";
import TableAvailability from "../TableAvailability/TableAvailability";
import Logout from "../Logout/Logout";

const Home = () => (
  <div>
    <p>Bienvenido a Pre-Agendamiento!</p>
    <Logout />
    <TableAvailability />
  </div>
);

export default Home;
