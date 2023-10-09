import React, { useEffect, useRef } from "react";
import img from "../../global/images/medical-banner-with-doctor-holding-stethoscope.jpg";
import "./Consultation.css";
import { useState } from "react";
import NewConsultation from "./NewConsultation";
import ViewConsultation from "./ViewConsultation";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Consultation = () => {
  const [newActive, setNewActive] = useState(true);
  const pageRef = useRef(null);
  const location = useLocation();
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div ref={pageRef}>
      <div className="consoltation pt-[62px]">
        <div className="absolute top-0 left-0 w-[100%] h-[643px] bg-black z-20 opacity-[0.1]"></div>
        <div className="relative">
          <img src={img} alt="" className="h-[581px] w-[100%] object-cover" />
          <p className="absolute top-[50%] left-20 z-30 font-[Caprasimo] text-4xl w-[500px] text-[var(--p-color)]">
            {!isDoctor
              ? "Experience the Future of Healthcare Online Consultations with Expert Doctors"
              : "Seamlessly conduct remote consultations with patients through our user-friendly interface"}
          </p>
        </div>
        {!isDoctor && (
          <div className="w-[27%] m-auto h-[60px] rounded-full bg-[var(--greenLigth-color)] border border-[var(--greenLigth-color)] mt-10 flex justify-center items-center">
            <ul className="flex justify-between items-center w-[100%] mx-auto">
              <li
                className={newActive ? "active" : "unactive"}
                onClick={() => setNewActive(true)}
              >
                New Consultation
              </li>
              <li
                className={!newActive ? "active" : "unactive"}
                onClick={() => setNewActive(false)}
              >
                My Consultations
              </li>
            </ul>
          </div>
        )}
        {newActive && !isDoctor ? <NewConsultation /> : <ViewConsultation />}
      </div>
    </div>
  );
};

export default Consultation;
