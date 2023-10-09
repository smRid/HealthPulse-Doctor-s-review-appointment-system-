import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../../data/config";
import axios from "axios";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDoctorRepley = ({ action, appointment, goBackHandler }) => {
  const [repley, setRepley] = useState({
    time: null,
    doctor_notes: "",
    date: null
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const date = repley.date
      ? `${repley.date.getFullYear()}-${
          repley.date.getMonth() + 1
        }-${repley.date.getDate()}`
      : null;
    if (action === "Reject") {
      axios
        .put(
          `${API.appointment.REJECT_APPOINYMENT}${appointment.id}/`,
          {
            date: date,
            doctor_notes: repley.doctor_notes
          },
          {
            headers: {
              Authorization: "JWT " + Cookies.get("accessToken")
            }
          }
        )
        .then((res) => {
          swal({
            title: `${res.data.message}`,
            timer: 3000,
            icon: "success"
          });
          setTimeout(() => {
            goBackHandler();
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
      axios
        .put(
          `${API.appointment.ACCEPT_APPOINYMENT}${appointment.id}/`,
          {
            time: repley.time,
            doctor_notes: repley.doctor_notes
          },
          {
            headers: {
              Authorization: "JWT " + Cookies.get("accessToken")
            }
          }
        )
        .then((res) => {
          swal({
            title: `${res.data.message}`,
            timer: 3000,
            icon: "success"
          });
          setTimeout(() => {
            goBackHandler();
          }, [3040]);
        })
        .catch((err) => {
          swal({
            icon: "warning",
            timer: 2100,
            title: `${err.response.data.message}`
          });
        });
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgb(0 0 0 / 40%)" }}
      className="fixed w-[100%] h-[100vh] top-0 right-0 z-[1000] flex justify-center items-center"
    >
      <div className="fixed shadow-lg rounded-2xl w-[65%] h-auto  px-8 bg-[var(--p-color)]">
        <p className="mt-7 text-center italic text-lg text-[var(--gray-color)] font-bold">
          {action} the appointment
        </p>
        <hr className="w-[70%] mb-7 m-auto mt-3 rounded-full border-[var(--greenLigth-color)]"></hr>
        {action === "Accept" &&<p className="mb-3  italic text-[var(--gray-color)]">
          The fields marked with * are required
        </p>}
        <form className="flex flex-col w-[100%]" onSubmit={submitHandler}>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={`${appointment.patient.first_name} ${appointment.patient.last_name}`}
              />
              <label className="top-top">Patient</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="doctor_id"
                value={appointment.date}
                readOnly
              />
              <label className="top-top">Booking date</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            {action === "Reject" && (
              <div
                style={{ width: "50%" }}
                className="child w-[100%] relative mb-5"
              >
                <DatePicker
                  className="subchild"
                  dateFormat="yyyy/MM/dd"
                  name="date"
                  isClearable
                  minDate={new Date()}
                  selected={repley.date}
                  onChange={(e) =>
                    setRepley((prev) => {
                      return { ...prev, date: e };
                    })
                  }
                />
                <label className="top-top">Proposed Date</label>
              </div>
            )}
            {action === "Accept" && (
              <div
                style={{ width: "50%" }}
                className="child w-[100%] relative mb-5"
              >
                <input
                  className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                  type="time"
                  name="time"
                  required
                  value={repley.time}
                  onChange={(e) =>{
                    console.log(e.target.value)
                    setRepley((prev) => {
                      return { ...prev, time: e.target.value };
                    })}
                  }
                />
                <label className="top-top">Booking time *</label>
              </div>
            )}
            <div className="child w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="doctor_notes"
                value={repley.doctor_notes}
                onChange={(e) =>
                  setRepley((prev) => {
                    return { ...prev, doctor_notes: e.target.value };
                  })
                }
              />
              <label className="top-top">Notes</label>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="w-[31%] flex justify-between items-center mb-8 mt-5">
              <button
                type="submit"
                className={` py-[9px] text-[var(--p-color)] px-[30px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg`}
              >
                Submit
              </button>
              <button
                onClick={goBackHandler}
                className="border border-[var(--gray-color)] px-[30px] py-[8px] outline-none cursor-pointer font-bold rounded-lg text-[var(--gray-color)] "
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDoctorRepley;
