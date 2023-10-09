import React, { useEffect, useRef, useState } from "react";
import celender from "../../global/images/time-capsule.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../Consultation/Consultation.css";
import img from "../../global/images/portrait-blogger-holding-clipboard(1).jpg";
import Cookies from "js-cookie";
import NewAppointment from "./NewAppointment";
import ViewAppointment from "./ViewAppointment.js";

const Dating = () => {
  const [newActive, setNewActive] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const pageRef = useRef(null);
  const location = useLocation();
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  const showFormHandler = (department) => {
    setShowForm(department);
  };

  const goBackHandler = () => {
    setShowForm(false);
  };

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);
  return (
    <div ref={pageRef}>
      <div className="pt-[62px] py-20 consoltation">
        <div className="absolute top-0 left-0 w-[100%] h-[362px] bg-black z-20 opacity-[0.3]"></div>
        <div className="relative">
          <img src={img} alt="" className="h-[300px] w-[100%] object-cover" />
          <div className="flex mx-20 justify-between items-center absolute top-[40%] font-[Caprasimo] text-4xl w-[500px] text-[var(--p-color)]">
            {/* <img src={celender} alt="" className="w-24" />  */}
            <p className="text-4xl z-30">
              Make an Appointment through the Internet easily
            </p>
          </div>
        </div>
        {/* <div className="flex mx-20 justify-between items-center my-7 w-[40%]">
        <img src={celender} alt="" className="w-24" />
        <p className="text-4xl font-[Caprasimo] text-[var(--gray-color)]">
          Make an Appointment
        </p>
      </div> */}
        {!isDoctor && (
          <div className="w-[27%] m-auto h-[60px] rounded-full bg-[var(--greenLigth-color)] border border-[var(--greenLigth-color)] mt-10 flex justify-center items-center">
            <ul className="flex justify-between items-center w-[100%] mx-auto">
              <li
                className={newActive ? "active" : "unactive"}
                onClick={() => setNewActive(true)}
              >
                New Appointment
              </li>
              <li
                className={!newActive ? "active" : "unactive"}
                onClick={() => setNewActive(false)}
              >
                My Appointments
              </li>
            </ul>
          </div>
        )}
        {newActive && !isDoctor ? <NewAppointment /> : <ViewAppointment />}
      </div>
    </div>
  );
};

export default Dating;
