import React, { useState } from "react";
import logo2 from "../global/images/afia.png";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";

const NavBar = ({ page }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [pageActive, setPageActive] = useState("");
  const [showSetting, setShowSetting] = useState(false);
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  const showSettingHandler = () => {
    setShowSetting(!showSetting);
  };

  const logoutHandler = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refeshToken");
    dispatch(authAction.logoutHandler());
    nav("/AboutUs");
  };

  return (
    <>
      <div className="navbar flex justify-between fixed w-[100%] items-center px-20 py-2 bg-[var(--p-color)] z-50 shadow-md">
        <div className="flex justify-between items-center">
          <img className="w-24" src={logo2} alt="" />
        </div>
        {page === "about" && (
          <div className="flex justify-between items-center">
            <NavLink
              to="/Login"
              className="border border-[var(--green-color)] outline-none px-4 py-2 pt-1 rounded-lg text-[var(--green-color)] "
            >
              Login
            </NavLink>
            <NavLink
              to="/Register"
              className="border-none outline-none ml-5 bg-[var(--green-color)] px-4 py-2 pt-1 rounded-lg text-[var(--p-color)]"
            >
              SignUp
            </NavLink>
          </div>
        )}
        {page !== "about" && (
          // <>
          <div className="flex w-[75%] justify-between items-center relative">
            <ul className="flex justify-between items-center w-[70%] text-[var(--green-color)]">
              <li>
                <NavLink
                  to="/Aafia/Home"
                  className={pageActive === "Home" ? "active" : "unactive"}
                  onClick={() => setPageActive("Home")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Aafia/Consultation"
                  className={
                    pageActive === "Consultation" ? "active" : "unactive"
                  }
                  onClick={() => setPageActive("Consultation")}
                >
                  Consultation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Aafia/Review"
                  className={pageActive === "Review" ? "active" : "unactive"}
                  onClick={() => setPageActive("Review")}
                >
                  Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Aafia/Appointment"
                  className={pageActive === "Dating" ? "active" : "unactive"}
                  onClick={() => setPageActive("Dating")}
                >
                  Appointment
                </NavLink>
              </li>
              {!isDoctor && (
                <li>
                  <NavLink
                    to="/Aafia/Advices"
                    className={pageActive === "Advices" ? "active" : "unactive"}
                    onClick={() => setPageActive("Advices")}
                  >
                    Medical Advices
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="w-[14px] h-[14px] rounded-full bg-[var(--gray-color)] text-[10px] flex justify-center items-center text-[var(--p-color)] absolute z-10 top-[-3px] right-[56px]">
              2
            </div>
            <div className="w-[80px] flex justify-between items-center">
              <box-icon
                style={{ cursor: "pointer" }}
                name="bell"
                type="solid"
                color="var(--green-color)"
                animation="tada"
              ></box-icon>
              <box-icon
                style={{ cursor: "pointer" }}
                name="cog"
                onClick={showSettingHandler}
                color="var(--gray-color)"
              ></box-icon>
              {showSetting && (
                <ul className="absolute w-[180px] text-[var(--gray-color)] bg-[var(--greenLigth-color)] pl-4 py-3 top-10 right-[-70px] rounded-xl">
                  <li className="mb-2" onClick={() => nav("/Change_password")}>
                    Change password
                  </li>
                  <hr className="w-[90%] my-3 rounded-full border-[var(--green-color)]"></hr>
                  <li
                    onClick={logoutHandler}
                    className="flex justify-between items-center w-[85px]"
                  >
                    <box-icon
                      name="log-out"
                      color="var(--gray-color)"
                    ></box-icon>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
