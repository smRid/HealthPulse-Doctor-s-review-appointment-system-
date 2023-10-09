import Cookies from "js-cookie";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { API } from "../../data/config";
import axios from "axios";

const AppointmentForm = ({
  goBackHandler,
  appointmentData,
  specialization,
  doctor,
  method
}) => {
  console.log(appointmentData);
  const [appointment, setAppointment] = useState({
    doctor_id: doctor.id,
    patient_notes: method === "edit" ? appointmentData.patient_notes : "",
    date: method === "edit" ? new Date(appointmentData.date) : null
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const date = appointment.date
      ? `${appointment.date.getFullYear()}-${
          appointment.date.getMonth() + 1
        }-${appointment.date.getDate()}`
      : null;
    if (method === "create") {
      axios
        .post(
          API.appointment.CREATE_APPOINTMENT,
          {
            doctor_id: appointment.doctor_id,
            patient_notes: appointment.patient_notes,
            date: date
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
          `${API.appointment.REQUEST_APPOINYMENT}${appointmentData.id}/`,
          {
            doctor_id: appointment.doctor_id,
            patient_notes: appointment.patient_notes,
            date: date
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
        <p className="my-7 text-lg italic text-[var(--gray-color)]">
          The fields marked with * are required
        </p>
        <form className="flex flex-col w-[100%]" onSubmit={submitHandler}>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={specialization}
              />
              <label className="top-top">Specialization</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="doctor_id"
                value={`Dr.${doctor.first_name} ${doctor.last_name}`}
                readOnly
              />
              <label className="top-top">Doctor</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
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
                selected={appointment.date}
                onChange={(e) =>
                  setAppointment((prev) => {
                    return { ...prev, date: e };
                  })
                }
              />
              <label className="top-top">Booking Date *</label>
            </div>
            <div className="child w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="patient_notes"
                value={appointment.patient_notes}
                onChange={(e) =>
                  setAppointment((prev) => {
                    return { ...prev, patient_notes: e.target.value };
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
                className="py-[9px] text-[var(--p-color)] px-[30px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
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

export default AppointmentForm;
