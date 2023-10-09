import React from "react";
import img from "../../global/images/bearded-doctor-glasses(1).jpg";
import img2 from "../../global/images/girl.jpg";
import add from "../../global/images/appointment(1).png";
import add2 from "../../global/images/appointment.png";

const BoxDoctor = ({ doctor, setShowForm,year,hospital }) => {

  return (
    <div className="shadow-md  rounded-xl bg-white p-3">
      <div className="flex justify-between mb-2 items-center relative">
        <img src={doctor.photo} className="w-[60px] h-[60px] object-cover rounded-full" alt="" />
        <img
          src={add2}
          alt=""
          onClick={() => setShowForm(doctor)}
          className="absolute w-[30px] cursor-pointer right-2 top-8"
        />
        <div className="w-[275px] flex flex-col justify-between items-start">
          <h3 className="text-xl font-bold text-[var(--gray-color)]">
            Dr.{doctor.first_name} {doctor.last_name}
          </h3>
          {/* <h6><span>{param.id}</span> specialization</h6> */}
          <div className="flex justify-between items-center text-[var(--gray-color)]">
            <p className="mr-3 text-sm text-[var(--green-color)]">
              Country :
              <span className="text-xs text-[var(--gray-color)]">{doctor.city.country}</span>
            </p>
            <p className="text-sm text-[var(--green-color)]">
              City :
              <span className="text-xs text-[var(--gray-color)]">{doctor.city.name}</span>
            </p>
          </div>
          {/* <div className="flex justify-between w-[90%] items-center mt-1">
                <div className="rate flex">
                  <box-icon
                    type="solid"
                    color="var(--green-color)"
                    name="star"
                  ></box-icon>
                  <box-icon
                    type="solid"
                    color="var(--green-color)"
                    name="star"
                  ></box-icon>
                  <box-icon
                    type="solid"
                    color="var(--green-color)"
                    name="star"
                  ></box-icon>
                  <box-icon
                    type="solid"
                    color="var(--green-color)"
                    name="star"
                  ></box-icon>
                  <box-icon
                    name="star-half"
                    color="var(--green-color)"
                    type="solid"
                  ></box-icon>
                  <box-icon name="star" color="var(--green-color)"></box-icon> 
                </div>
                <p className="text-[var(--green-color)] font-bold">4.5</p>
              </div> */}
        </div>
      </div>
      <div className="text-[var(--gray-color)] w-[100%]">
        <p className="font-light text-sm opacity-[0.8] mt-3">
          {doctor.experience}
        </p>
      </div>
    </div>
  );
};

export default BoxDoctor;
