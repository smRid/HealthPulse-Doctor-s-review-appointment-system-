import React from "react";
import "boxicons";
import img from "../../global/images/bearded-doctor-glasses(1).jpg";
import img2 from "../../global/images/girl.jpg";
import img3 from "../../global/images/doctors-day-curly-handsome-cute-guy-medical-uniform-thinking-happily.jpg";

const Left = () => {
  return (
    <div className="w-[25%] h-[calc(100vh-62px)] pb-24 fixed bg-white">
      <p className="my-8 text-2xl font-[Caprasimo] opacity-[0.7] ml-8 text-[var(--gray-color)]">
        Top Rated Doctors :
      </p>
      <div className="flex flex-col justify-between items-center w-[80%] m-auto h-[95%]">
        <div className="shadow-md  rounded-xl bg-[var(--post-color)] p-3">
          <div className="flex justify-between items-center pr-6">
            <img src={img} className="w-[47px] rounded-full" alt="" />
            <div className="w-[158px]">
              <h3 className="text-lg text-[var(--gray-color)]">
                Dr.Osama Horani
              </h3>
              <div className="flex justify-between w-[90%] items-center mt-1">
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
                </div>
                <p className="text-[var(--green-color)] font-bold">4.5</p>
              </div>
            </div>
          </div>
          <div className="text-[var(--gray-color)] w-[90%] ml-2">
            <p className="font-light text-sm opacity-[0.7] mt-3">
              Cardiology specialized since 2016 in Mujtahid Hospital . . .
            </p>
          </div>
        </div>
        <div className="shadow-md  rounded-xl bg-[var(--post-color)] p-3">
          <div className="flex justify-between items-center pr-6">
            <img
              src={img2}
              className="w-[47px] h-[47px] object-cover rounded-full"
              alt=""
            />
            <div className="w-[158px]">
              <h3 className="text-lg text-[var(--gray-color)]">
                Dr.Layan Habib
              </h3>
              <div className="flex justify-between w-[81%] items-center mt-1">
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
                  <box-icon name="star" color="var(--green-color)"></box-icon>
                </div>
                <p className="text-[var(--green-color)] font-bold">4</p>
              </div>
            </div>
          </div>
          <div className="text-[var(--gray-color)] w-[90%] ml-2">
            <p className="font-light text-sm opacity-[0.7] mt-3">
              Neurology specialized since 2018 in Mowasat Hospital . . .
            </p>
          </div>
        </div>
        <div className="shadow-md  rounded-xl bg-[var(--post-color)] p-3">
          <div className="flex justify-between items-center pr-6">
            <img
              src={img3}
              className="w-[47px] h-[47px] object-cover rounded-full"
              alt=""
            />
            <div className="w-[158px]">
              <h3 className="text-lg text-[var(--gray-color)]">
                Dr.Ammar Awad
              </h3>
              <div className="flex justify-between w-[90%] items-center mt-1">
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
                    name="star-half"
                    color="var(--green-color)"
                    type="solid"
                  ></box-icon>
                  <box-icon name="star" color="var(--green-color)"></box-icon>
                </div>
                <p className="text-[var(--green-color)] font-bold">3.5</p>
              </div>
            </div>
          </div>
          <div className="text-[var(--gray-color)] w-[90%] ml-2">
            <p className="font-light text-sm opacity-[0.7] mt-3">
              Pediatrics specialized since 2018 in Mujtahid Hospital . . .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
