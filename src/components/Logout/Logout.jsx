import React, { useState } from "react";
import history from "../../services/history";

const Logout = () => {
  const clickHandler = () => {
    localStorage.removeItem("access_token");
    history.push("/Login");
  };

  return <button onClick={clickHandler}>logout</button>;
};
export default Logout;
