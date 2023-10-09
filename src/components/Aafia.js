import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Aafia = () => {
  return (
    <div>
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Aafia;
