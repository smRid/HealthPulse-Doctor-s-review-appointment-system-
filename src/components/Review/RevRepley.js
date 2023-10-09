import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UseAxiosGet from "../../hooks/useAxiosGet";
import { API } from "../../data/config";
import { useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RevRepley = () => {
  const param = useParams();
  const nav = useNavigate();
  const { data: reviewReply } = UseAxiosGet(
    `${API.consultations.REVIEWS}${param.id}`
  );
  console.log(reviewReply);
  const [repley, setRepley] = useState({
    diagnosis: "",
    prescription: "",
    treatment_duration: "",
    need_review_at: null
  });
  const bloodType = {
    0: "O+",
    1: "A+",
    2: "B+",
    3: "AB+",
    4: "O-",
    5: "A-",
    6: "B-",
    7: "AB-"
  };
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (!reviewReply) return;
    setRepley((prev) => {
      return {
        ...prev,
        diagnosis: reviewReply?.data.diagnosis
          ? reviewReply.data.diagnosis
          : "",
        prescription: reviewReply?.data.prescription
          ? reviewReply.data.prescription
          : "",
        treatment_duration: reviewReply?.data.treatment_duration
          ? reviewReply.data.treatment_duration
          : "",
        need_review_at: reviewReply?.data.need_review_at
          ? new Date(reviewReply.data.need_review_at)
          : ""
      };
    });
  }, [reviewReply]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRepley((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewDate = !!repley.need_review_at
      ? `${repley.need_review_at.getFullYear()}-${
          repley.need_review_at.getMonth() + 1
        }-${repley.need_review_at.getDate()}`
      : null;
    axios
      .put(
        `${API.consultations.REVIEWS}${param.id}/`,
        {
          diagnosis: repley.diagnosis,
          prescription: repley.prescription,
          treatment_duration: repley.treatment_duration,
          need_review_at: reviewDate
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
          nav("/Aafia/Review");
        }, [3040]);
      })
      .catch((err) => {
        swal({
          icon: "warning",
          timer: 2100,
          title: `${err.response.data.message}`
        });
      });
  };

  return (
    <div className="pt-[62px]" ref={pageRef}>
      <div className="h-auto  px-20">
        <p className="mt-7 text-xl text-[var(--gray-color)] font-bold">
          Patient information :
        </p>
        <form className="flex flex-col w-[100%] mt-7" onSubmit={submitHandler}>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={`${reviewReply?.data.consultation.patient.first_name} ${reviewReply?.data.consultation.patient.last_name}`}
              />
              <label className="top-top">Patient Name</label>
            </div>
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={
                  reviewReply?.data.consultation.patient.gender === 1
                    ? "Female"
                    : "Male"
                }
              />
              <label className="top-top">Gender</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={reviewReply?.data.consultation.patient.birth_date}
              />
              <label className="top-top">Birthdate</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={
                  bloodType[reviewReply?.data.consultation.patient.blood_type]
                }
              />
              <label className="top-top">Blood Type</label>
            </div>
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={reviewReply?.data.consultation.patient.length}
              />
              <label className="top-top">Length</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={reviewReply?.data.consultation.patient.weight}
              />
              <label className="top-top">Weight</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={reviewReply?.data.consultation.patient.chronic_disease}
              />
              <label className="top-top">Chronic Disease</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={reviewReply?.data.consultation.patient.genetic_disease}
              />
              <label className="top-top">Genetic Disease</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-start">
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="susbchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                style={{ height: "200px", width: "97%", padding: "12px" }}
                readOnly
                value={reviewReply?.data.review_reasons}
              />
              <label className="top-top">Review Reasons</label>
            </div>
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                style={{ height: "200px", width: "97%", padding: "12px" }}
                readOnly
                value={reviewReply?.data.additional_explanation}
              />
              <label className="top-top">Additional Explanation</label>
            </div>
            <div className="imgcontent w-[100%] relative mb-5">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="file"
                style={{ display: "none" }}
                //   id="analysis"
                name="analysis"
              />
              <label className="top-top" htmlFor="analysis">
                <box-icon
                  color="var(--green-color)"
                  type="solid"
                  name="file-plus"
                ></box-icon>
                Analysis (pdf or jpg)
              </label>
              {reviewReply?.data.analysis && (
                <div className="place-left">
                  <img src={reviewReply?.data.analysis} alt="" />
                </div>
              )}
            </div>
          </div>
          <p className="text-xl text-[var(--gray-color)] mt-24 font-bold">
            Respond to the review :
          </p>
          <p className="mt-10 mb-3 opacity-[0.6] text-[var(--gray-color)]">
            The fields marked with * are required
          </p>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                style={{ height: "150px", width: "97%", padding: "12px" }}
                name="diagnosis"
                value={repley.diagnosis}
                required
                onChange={changeHandler}
              />
              <label className="top-top">Diagnosis *</label>
            </div>
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                name="prescription"
                style={{ height: "150px", width: "97%", padding: "12px" }}
                onChange={changeHandler}
                required
                value={repley.prescription}
              />
              <label className="top-top">Prescription *</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="treatment_duration"
                value={repley.treatment_duration}
                required
                onChange={changeHandler}
              />
              <label className="top-top">Treatment time *</label>
            </div>
            <div className="child">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                name="need_review_at"
                isClearable
                selected={repley.need_review_at}
                onChange={(e) =>
                  setRepley((prev) => {
                    return { ...prev, need_review_at: e };
                  })
                }
              />
              <label className="top-top">Review time</label>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="w-[23%] flex justify-between items-center mb-8 mt-5">
              <button
                type="submit"
                className={`${
                  reviewReply?.data.done ? "w-[105px]" : ""
                } py-[9px] text-[var(--p-color)] px-[30px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg`}
              >
                {reviewReply?.data.done ? "Edit" : "Submit"}
              </button>
              <button
                onClick={() => {
                  nav("/Aafia/Review");
                }}
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

export default RevRepley;
