import React, { useState } from "react";
import history from "../../services/history";
import Button from "@material-ui/core/Button";

const Logout = () => {
  const clickHandler = () => {
    localStorage.removeItem("access_token");
    history.push("/Login");
  };

  return <Button color="inherit" onClick={clickHandler}>logout</Button>;
};
export default Logout;
