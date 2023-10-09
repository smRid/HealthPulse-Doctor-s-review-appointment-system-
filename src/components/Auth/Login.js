import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from "../../data/config";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(API.auth.LOGIN, { email, password })
      .then((res) => {
        Cookies.set("user", JSON.stringify(res.data.data.user), {
          path: "/",
          expires: 10
        });
        Cookies.set("accessToken", res.data.data.access, {
          path: "/",
          expires: 10
        });
        Cookies.set("refeshToken", res.data.data.refresh, {
          path: "/",
          expires: 10
        });
        swal({
          title: `${res.data.message}`,
          timer: 3000,
          icon: "success"
        });
        setTimeout(() => {
          if (!res.data.data.user.email_verified) nav("/CodeVerification");
          else if (!res.data.data.user.phone_number)
            nav("/CompleteProfileInfo");
          else {
            nav("/Aafia/Home");
            dispatch(authAction.loginHandler(true));
          }
        }, [3040]);
      })
      .catch((err) => {
        swal({
          icon: "warning",
          timer: 3000,
          title: `${err.response.data.message}`
        });
      });
  };

  const testHandler = (role) => {
    if(role === 0) {
      setEmail("LayanHabib187@gmail.com")
      setPassword("123123")
    }
    if(role === 1) {
      setEmail("AmmarAli58@gmail.com")
      setPassword("123123")
    }
  }

  return (
    <div>
      <div
        className='text-[#E4F9F5] relative flex items-center bg-[url("/src/global/images/flat-lay-health-still-life-arrangement-with-copy-space.jpg")]
        w-[100%] h-[100vh] bg-no-repeat bg-cover'
      >
       <div className="text-[var(--gray-color)] w-[55%] h-[100px] absolute top-2 right-3 flex justify-between items-start">
        <p className="text-[var(--gray-color)] font-bold pt-2">Click on one of these emails for testing :</p>
        <div>
          <div className="flex justify-start items-center" onClick={()=>testHandler(1)}>
            <p className="mr-3">For patient :</p>
            <p className="text-lg font-bold cursor-pointer bg-[var(--green-color)] rounded-lg p-1">AmmarAli58@gmail.com</p>
          </div>
          <div className="flex justify-start items-center mt-2" onClick={()=>testHandler(0)}>
            <p className="mr-4">For doctor :</p>
            <p className="text-lg font-bold cursor-pointer bg-[var(--green-color)] rounded-lg p-1">LayanHabib187@gmail.com</p>
          </div>
        </div>
       </div>
        <div className="z-40 w-[370px] h-[420px] rounded-2xl bg-[#11999E] absolute left-[60%] p-4 shadow-lg">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold">Login</h1>
            <hr className="mt-3 mb-4 w-[50%]"></hr>
          </div>
          <form
            className="flex flex-col w-[100%] mt-7"
            onSubmit={submitHandler}
          >
            <div className="w-[100%] relative mb-7">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-10 w-[100%]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <box-icon
                name="envelope"
                color="#94a3b8"
                style={{
                  position: "absolute",
                  top: "19%",
                  left: "12px",
                  opacity: "0.7"
                }}
              ></box-icon>
            </div>
            <div className="w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-10 w-[100%]"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <box-icon
                name="lock-alt"
                color="#94a3b8"
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "12px",
                  opacity: "0.7"
                }}
              ></box-icon>
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
            <p
              className="text-center mt-3 cursor-pointer"
              onClick={() => {
                nav("/ForgotPassword");
              }}
            >
              Forgot Password ?
            </p>
            <button
              type="submit"
              className="text-slate-200 py-[10px] px-[35px] mx-auto my-[30px] font-bold bg-[#40514E] cursor-pointer shadow-lg rounded-lg"
            >
              Login
            </button>
            <p className="text-center">
              Don't have an account?
              <NavLink to="/Register" className="text-[var(--gray-color)]">
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
