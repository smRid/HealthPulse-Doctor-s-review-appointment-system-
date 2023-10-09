import Cookies from "js-cookie";
import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../../data/config";
import axios from "axios";

const ReviewForm = ({ goBackHandler, consultation, method, reviewEdit }) => {
  const createDate = new Date(consultation.created_at);
  const consultationDate = `${createDate.getFullYear()}-${
    createDate.getMonth() + 1
  }-${createDate.getDate()}`;
  const [review, setReview] = useState({
    review_reasons: method === "edit" ? reviewEdit.review_reasons : "",
    additional_explanation:
      method === "edit" ? reviewEdit.additional_explanation : "",
    analysis: ""
  });
  const [imageAnalysis, setImageAnalysis] = useState(
    method === "edit" ? reviewEdit.analysis : null
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setReview((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const imageChangeHandler = (event) => {
    const { name, files } = event.target;
    setImageAnalysis(URL.createObjectURL(files[0]));
    setReview((prev) => {
      return { ...prev, [name]: files[0] };
    });
  };

  const removeImageHandler = () => {
    setImageAnalysis(null);
    setReview((prev) => {
      return { ...prev, analysis: null };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("consultation_id", consultation.id);
    formData.append("review_reasons", review.review_reasons);
    formData.append("additional_explanation", review.additional_explanation);
    formData.append(
      "analysis",
      review.analysis === null ? "" : review.analysis
    );
    if (method === "create") {
      axios
        .post(API.consultations.REVIEWS, formData, {
          headers: {
            Authorization: "JWT " + Cookies.get("accessToken")
          }
        })
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
        .put(`${API.consultations.REVIEWS}${reviewEdit.id}/`, formData, {
          headers: {
            Authorization: "JWT " + Cookies.get("accessToken")
          }
        })
        .then((res) => {
          swal({
            title: `${res.data.message}`,
            timer: 3000,
            icon: "success"
          });
          setTimeout(() => {
            goBackHandler(true);
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
                value={consultation.doctor.specialization.name}
              />
              <label className="top-top">Specialization</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={`${consultation.doctor.first_name} ${consultation.doctor.last_name}`}
              />
              <label className="top-top">Doctor</label>
            </div>
          </div>
          <div className="child w-[100%] relative mb-5">
            <input
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="text"
              readOnly
              value={consultationDate}
            />
            <label className="top-top">Consultation Date</label>
          </div>
          <div className="child w-[100%] relative mb-5">
            <input
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="text"
              required
              name="review_reasons"
              value={review.review_reasons}
              // style={{ height: "80px", width: "100%", padding: "12px" }}
              onChange={changeHandler}
            />
            <label className="top-top">Review reason *</label>
          </div>
          <div className="child w-[100%] relative mb-5">
            <input
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="text"
              name="additional_explanation"
              value={review.additional_explanation}
              onChange={changeHandler}
            />
            <label className="top-top">Additional explanation</label>
          </div>
          <div className="imgcontent w-[100%] relative mb-5">
            <input
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="file"
              style={{ display: "none" }}
              id="analysis"
              name="analysis"
              onChange={imageChangeHandler}
            />
            <label className="top-top" for="analysis">
              <box-icon
                color="var(--green-color)"
                type="solid"
                name="file-plus"
              ></box-icon>
              Analysis (pdf or jpg)
            </label>
            {imageAnalysis && (
              <div className="place-image">
                <p
                  onClick={() => removeImageHandler()}
                  style={{ cursor: "pointer" }}
                >
                  x
                </p>
                <img src={imageAnalysis} alt="" />
              </div>
            )}
          </div>
          <div className="flex justify-end items-center">
            <div className="w-[32%] flex justify-between items-center mb-8 mt-5">
              <button
                type="submit"
                className={`${
                  method === "edit" ? "w-[105px]" : ""
                } py-[9px] text-[var(--p-color)] px-[30px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg`}
              >
                {method === "edit" ? "Edit" : "Submit"}
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

export default ReviewForm;
