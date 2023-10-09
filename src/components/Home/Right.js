import React from "react";
import "boxicons";
import img from "../../global/images/blood-pressure(1).png";
import img1 from "../../global/images/drop.png";
import img2 from "../../global/images/electrocardiography.png";
import img3 from "../../global/images/glucometer.png";

const Right = () => {
  return (
    <div className="w-[25%] h-[calc(100vh-62px)] py-5 bg-white fixed right-0 flex flex-col justify-between items-center">
      <div className="w-[80%] h-[23%] bg-[var(--post-color)] rounded-xl shadow-md py-2">
        <div className="flex justify-between items-center w-[80%] pr-6 m-auto">
          <img src={img} alt="" className="w-[37px] h-[37px]" />
          <p className="font-bold text-[var(--gray-color)] opacity-[0.6] text-lg">
            Blood Presure
          </p>
        </div>
        <div className="mt-3 ml-4 text-[var(--gray-color)]">
          <p className="font-light">Normal</p>
          <div className="flex items-end">
            <p className="text-xl mr-2">119/80</p>
            <p className="font-light text-sm text-[var(--green-color)]">mmHg</p>
          </div>
        </div>
      </div>
      <div className="w-[80%] pr-6 h-[23%] bg-[var(--post-color)] rounded-xl shadow-md py-2">
        <div className="flex justify-between items-center w-[80%] m-auto pr-[60px]">
          <img src={img1} alt="" className="w-[37px] h-[37px]" />
          <p className="font-bold text-[var(--gray-color)] opacity-[0.6] text-lg">
            Waters
          </p>
        </div>
        <div className="mt-5 ml-4 text-[var(--gray-color)]">
          <p className="font-light ">Normal</p>
          <div className="flex items-end">
            <p className="text-xl mr-2">3.25</p>
            <p className="font-light text-sm text-[var(--green-color)]">
              Liters
            </p>
          </div>
        </div>
      </div>
      <div className="w-[80%] pr-6 h-[23%] bg-[var(--post-color)] rounded-xl shadow-md py-2">
        <div className="flex justify-between items-center w-[80%] m-auto pr-[21px]">
          <img src={img2} alt="" className="w-[37px] h-[37px]" />
          <p className="font-bold text-[var(--gray-color)] opacity-[0.6] text-lg">
            Health Rate
          </p>
        </div>
        <div className="mt-3 ml-4 text-[var(--gray-color)]">
          <p className="font-light">Checkup Now</p>
          <div className="flex items-end">
            <p className="text-xl mr-2">105</p>
            <p className="font-light text-sm text-[var(--green-color)]">bmp</p>
          </div>
        </div>
      </div>
      <div className="w-[80%] pr-6 h-[23%] bg-[var(--post-color)] rounded-xl shadow-md py-2">
        <div className="flex justify-between items-center w-[80%] m-auto pr-[53px]">
          <img src={img3} alt="" className="w-[37px] h-[37px]" />
          <p className="font-bold text-[var(--gray-color)] opacity-[0.6] text-lg">
            Glucose
          </p>
        </div>
        <div className="mt-3 ml-4 text-[var(--gray-color)]">
          <p className="font-light">Normal</p>
          <div className="flex items-end">
            <p className="text-xl mr-2">100</p>
            <p className="font-light text-sm text-[var(--green-color)]">
              mg/dl
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Right;
