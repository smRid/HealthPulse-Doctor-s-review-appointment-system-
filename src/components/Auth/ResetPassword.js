import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../../data/config";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const nav = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPass === newPassword) {
      axios
        .put(
          API.auth.RESET_PASSWORD,
          { password: newPassword },
          {
            headers: {
              Authorization: "JWT " + Cookies.get("accessToken")
            }
          }
        )
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
            nav("/Aafia/Home");
          }, [3040]);
        })
        .catch((err) => {
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
        className='register text-[var(--p-color)] relative flex items-center bg-[url("/src/global/images/stethososcope-doctors.jpg")]
            w-[100%] h-[100vh] bg-no-repeat bg-cover'
      >
        <div className="z-40 w-[400px] h-[400px] rounded-2xl bg-[#11999e] absolute left-[60%] p-4 shadow-xl">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <hr className="mt-2 w-[50%]"></hr>
          </div>
          <div className="mt-14 mb-8 font-light pr-5 text-[var(---color)]">
            Please enter the new password
          </div>
          <form className="flex flex-col w-[100%]" onSubmit={submitHandler}>
            <div className="w-[100%] relative mb-7">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="New Password"
                required
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
            <div className="w-[100%] relative mb-7">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type={showCPassword ? "text" : "password"}
                name="confirmPass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm New Password"
                required
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
            <button
              type="submit"
              className="py-[10px] px-[35px] mx-auto my-4 font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
