import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "boxicons";
import img from "../../global/images/bearded-doctor-glasses(1).jpg";
import img2 from "../../global/images/girl.jpg";
import add from "../../global/images/appointment(1).png";
import add2 from "../../global/images/appointment.png";
import img3 from "../../global/images/doctors-day-curly-handsome-cute-guy-medical-uniform-thinking-happily.jpg";
import AppointmentForm from "./AppointmetForm";
import BoxDoctor from "./BoxDoctor";
import UseAxiosGet from "../../hooks/useAxiosGet";
import { API } from "../../data/config";
import { useSelector } from "react-redux";

const DoctorsAppointment = () => {
  const param = useParams();
  const specializations = useSelector((state) => state.auth.specializations);
  const id_specialization = specializations.filter(
    (array) => array.name === param.id
  )[0].id;
  const years = [
    "2020",
    "2016",
    "2019",
    "2013",
    "2018",
    "2015",
    "2017",
    "2014"
  ];
  const year = years[Math.floor(Math.random() * years.length)];
  const hospitals = [
    "Mujtahid",
    "Ibn al-Nafis",
    "Tishreen",
    "Mouwasat",
    "Al-Shami",
    "Al-Zahra",
    "Al-Razi"
  ];
  const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
  const pageRef = useRef(null);
  const location = useLocation();
  const { data: doctorsData } = UseAxiosGet(
    `${API.profile.GET_DOCTORS_FOR_SPECIALIZATION}?specialization_id=${id_specialization}`
  );
  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);
  const nav = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    if (!doctorsData) return;
    setDoctors(doctorsData.data);
  }, [doctorsData]);

  const goBackHandler = () => {
    setShowForm(false);
  };

  const searchHandler = (e) => {
    let searchQuery = e.target.value;
    let resultSearch = doctorsData?.data.filter((doctor) => {
      return (
        doctor.first_name.includes(searchQuery) ||
        doctor.last_name.includes(searchQuery) ||
        doctor.city.country.includes(searchQuery) ||
        doctor.city.name.includes(searchQuery)
      );
    });
    if (searchQuery === "") {
      setDoctors(doctorsData.data);
    } else {
      setDoctors(resultSearch);
    }
  };

  return (
    <div className="pt-[62px] py-20" ref={pageRef}>
      {showForm && (
        <AppointmentForm
          goBackHandler={goBackHandler}
          specialization={param.id}
          doctor={showForm}
          method="create"
        />
      )}
      <div className="flex mx-20 mt-6 mb-20 justify-between items-center text-[var(--gray-color)]">
        {/* <img src={celender} alt="" className="w-24" />  */}
        <div className="flex font-[Caprasimo] justify-between items-center w-[50%]">
          <div className="w-3 h-3 rounded-full bg-[var(--gray-color)]"></div>
          <p className="text-2xl z-30 min-w-[534px] max-w-[560px]">
            Doctors with{" "}
            <span className="text-[var(--green-color)]">{param.id}</span>{" "}
            specialization
          </p>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="Search for a specific doctor, country or city"
            className="shadow-md w-[500px] border border-[var(--gray-color)] rounded-l-full rounded-r-full py-2 pr-2 pl-12 bg-inherit"
            name="searsh"
            onChange={searchHandler}
          />
          <div className="absolute top-[10px] left-4 opacity-[0.6]">
            <box-icon name="search" color="var(--gray-color)"></box-icon>
          </div>
        </div>
      </div>
      <div
        className="mx-20"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          //   margin: "auto",
          maxWidth: "100%"
        }}
      >
        {doctors?.map((doctor) => {
          return <BoxDoctor setShowForm={setShowForm} doctor={doctor} />;
        })}
        {/* <div className="shadow-md  rounded-xl bg-white p-3">
          <div className="flex justify-between items-center">
            <img src={img} className="w-[100px] rounded-sm" alt="" />
            <div className="w-[230px] flex flex-col justify-between items-start">
              <h3 className="text-xl font-bold text-[var(--gray-color)]">
                Dr.Osama Horani
              </h3>
              <div className="flex justify-between items-center text-[var(--gray-color)]">
                <p className="mr-3 text-sm text-[var(--green-color)]">
                  Country :
                  <span className="text-xs text-[var(--gray-color)]">
                    Syria
                  </span>
                </p>
                <p className="text-sm text-[var(--green-color)]">
                  City :
                  <span className="text-xs text-[var(--gray-color)]">
                    Damascus
                  </span>
                </p>
              </div>
                <p className="text-[var(--green-color)] font-bold">4.5</p>
              </div> 
              <div className="text-[var(--gray-color)] w-[100%]">
                <p className="font-light text-sm opacity-[0.8] mt-3">
                  {param.id} specialized since {year} in {hospital} Hospital . . .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-md  rounded-xl bg-white p-3">
          <div className="flex justify-between mb-2 items-center relative">
            <img src={img} className="w-[60px] rounded-full" alt="" />
            <img src={add2} alt="" onClick={() => setShowForm(true)} className="absolute w-[30px] cursor-pointer right-2 top-2"/>
            <div className="w-[275px] flex flex-col justify-between items-start">
              <h3 className="text-xl font-bold text-[var(--gray-color)]">
                Dr.Osama Horani
              </h3>
              <div className="flex justify-between items-center text-[var(--gray-color)]">
                <p className="mr-3 text-sm text-[var(--green-color)]">
                  Country :
                  <span className="text-xs text-[var(--gray-color)]">
                    Syria
                  </span>
                </p>
                <p className="text-sm text-[var(--green-color)]">
                  City :
                  <span className="text-xs text-[var(--gray-color)]">
                    Damascus
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-[var(--gray-color)] w-[100%]">
                <p className="font-light text-sm opacity-[0.8] mt-3">
                  {param.id} specialized since {year} in {hospital} Hospital . . .
                </p>
              </div>
        </div> */}
        {/* <div className="shadow-md  rounded-xl bg-[var(--post-color)] p-3">
          <div className="flex justify-between items-center pr-6">
            <img
              src={img2}
              className="w-[47px] h-[47px] object-cover rounded-full"
              alt=""
            />
            <div className="w-[158px]">
              <h3 className="text-lg text-[var(--gray-color)]">
                Dr.Batoul Homsi
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
                   <box-icon
                    name="star-half"
                    color="var(--green-color)"
                    type="solid"
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
        </div> */}
        {/* <div className="shadow-md  rounded-xl bg-[var(--post-color)] p-3">
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
        </div> */}
      </div>
      <div className="flex justify-end items-center mx-20">
        <div className="w-[31%] flex justify-end items-center mt-5">
          {/* <button
              type="submit"
              className="py-[9px] text-[var(--p-color)] px-[27px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
            >
              Submit
            </button> */}
          <button
            onClick={() => nav("/Aafia/Appointment")}
            className="border border-[var(--gray-color)] px-[30px] py-[8px] outline-none cursor-pointer font-bold rounded-lg text-[var(--gray-color)] "
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsAppointment;
