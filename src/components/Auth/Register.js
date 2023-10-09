import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "boxicons";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../../data/config";
import Cookies from "js-cookie";

const Register = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [userDataRegister, setUserDataRegister] = useState({
    role: 1,
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDataRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPass === userDataRegister.password) {
      axios
        .post(API.auth.SIGN_UP, userDataRegister)
        .then((res) => {
          Cookies.set("user", JSON.stringify(res.data.data.user), {
            path: "/",
            expires: 10
          });
          swal({
            title: `${res.data.message}`,
            timer: 3000,
            icon: "success"
          });
          setTimeout(() => {
            nav("/CodeVerification");
          }, [3040]);
        })
        .catch((err) => {
          console.log(err.response.data);
          swal({
            icon: "warning",
            timer: 2100,
            title: `${err.response.data.message}`
          });
        });
    } else {
      swal({
        icon: "warning",
        timer: 2100,
        title: "The password and confirm password do not match!"
      });
    }
  };

  return (
    <div>
      <div
        className='register text-[var(--p-color)] relative flex items-center bg-[url("/src/global/images/health-still-life-with-copy-space.jpg")]
        w-[100%] h-[100vh] bg-no-repeat bg-cover'
      >
        <div className="z-40 w-[400px] h-[470px] rounded-2xl bg-[#11999e] absolute left-[60%] p-4 shadow-xl">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <hr className="mt-2 w-[50%]"></hr>
          </div>
          <div className="flex justify-between items-center w-40 mt-5 mb-4 m-auto">
            <div>
              <input
                className="accent-[var(--gray-color)] cursor-pointer mr-1"
                type="radio"
                id="patients"
                onChange={changeHandler}
                name="role"
                value="1"
                defaultChecked
              />
              <label htmlFor="patients" className="cursor-pointer">
                Patient
              </label>
            </div>
            <div>
              <input
                type="radio"
                className="accent-[var(--gray-color)] cursor-pointer mr-1"
                id="doctor"
                name="role"
                onChange={changeHandler}
                value="0"
              />
              <label htmlFor="doctor" className="cursor-pointer">
                Doctor
              </label>
            </div>
          </div>
          <form className="flex flex-col w-[100%]" onSubmit={submitHandler}>
            <div className="w-[100%] relative mb-5 flex justify-between items-center">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="first_name"
                onChange={changeHandler}
                value={userDataRegister.first_name}
                placeholder="First Name"
              />
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="last_name"
                onChange={changeHandler}
                value={userDataRegister.last_name}
                placeholder="Last Name"
              />
            </div>
            <div className="w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="email"
                name="email"
                onChange={changeHandler}
                value={userDataRegister.email}
                placeholder="Email"
              />
            </div>
            <div className="w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={changeHandler}
                value={userDataRegister.password}
                placeholder="Password"
              />
              {!showPassword && (
                <box-icon
                  name="show"
                  color="#94a3b8"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "20%",
                    right: "12px"
                  }}
                ></box-icon>
              )}
              {showPassword && (
                <box-icon
                  name="hide"
                  color="#94a3b8"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "20%",
                    right: "12px"
                  }}
                ></box-icon>
              )}
            </div>
            <div className="w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type={showCPassword ? "text" : "password"}
                name="confirmPass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm Password"
              />
              {!showCPassword && (
                <box-icon
                  name="show"
                  color="#94a3b8"
                  onClick={() => {
                    setShowCPassword(true);
                  }}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "20%",
                    right: "12px"
                  }}
                ></box-icon>
              )}
              {showCPassword && (
                <box-icon
                  name="hide"
                  color="#94a3b8"
                  onClick={() => {
                    setShowCPassword(false);
                  }}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "20%",
                    right: "12px"
                  }}
                ></box-icon>
              )}
            </div>
            <p className="text-center">
              Have an account?
              <NavLink to="/Login" className="text-[var(--gray-color)]">
                Log in
              </NavLink>
            </p>
            <button
              type="submit"
              className="py-[10px] px-[35px] mx-auto my-4 font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
