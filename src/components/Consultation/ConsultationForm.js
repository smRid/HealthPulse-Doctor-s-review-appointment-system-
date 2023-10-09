import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../data/config";
import UseAxiosGet from "../../hooks/useAxiosGet";

const ConsultationForm = ({
  goBackHandler,
  specialization,
  method,
  consultationEdit
}) => {
  const specializations = useSelector((state) => state.auth.specializations);
  const [imageAnalysis, setImageAnalysis] = useState(
    method === "edit" ? consultationEdit.analysis : null
  );
  const [consultation, setConsultation] = useState({
    doctor_id:
      method === "edit"
        ? `${consultationEdit.doctor.first_name} ${consultationEdit.doctor.last_name}`
        : "",
    specialization_id:
      method === "edit"
        ? consultationEdit.doctor.specialization.id
        : specializations.filter((array) => array.name === specialization)[0]
            .id,
    symptoms: method === "edit" ? consultationEdit.symptoms : "",
    additional_explanation:
      method === "edit" ? consultationEdit.additional_explanation : "",
    analysis: ""
  });
  const { data: doctors } = UseAxiosGet(
    `${API.profile.GET_DOCTORS_FOR_SPECIALIZATION}?specialization_id=${consultation.specialization_id}`
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setConsultation((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onImageChange = (event) => {
    const { name, files } = event.target;
    setImageAnalysis(URL.createObjectURL(files[0]));
    setConsultation((prev) => {
      return { ...prev, [name]: files[0] };
    });
  };

  const removeImageHandler = () => {
    setImageAnalysis(null);
    setConsultation((prev) => {
      return { ...prev, analysis: null };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let doctorId = doctors?.data.filter(
      (array) =>
        `${array.first_name} ${array.last_name}` === consultation.doctor_id
    );
    if (doctorId.length === 0) {
      swal({
        icon: "warning",
        timer: 2100,
        title: "The Doctor Not Found"
      });
      doctorId = "";
      setConsultation((prev) => {
        return { ...prev, doctor_id: "" };
      });
    } else doctorId = doctorId[0].id;
    const formData = new FormData();
    formData.append("doctor_id", doctorId);
    formData.append("specialization_id", consultation.specialization_id);
    formData.append("symptoms", consultation.symptoms);
    formData.append(
      "additional_explanation",
      consultation.additional_explanation
    );
    formData.append(
      "analysis",
      consultation.analysis === null ? "" : consultation.analysis
    );
    if (method === "create") {
      axios
        .post(API.consultations.CONSULTATIONS, formData, {
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
        .put(
          `${API.consultations.CONSULTATIONS}${consultationEdit.id}/`,
          formData,
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
                value={specialization}
              />
              <label className="top-top">Specialization</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                name="doctor_id"
                value={consultation.doctor_id}
                onChange={changeHandler}
                list="doctor"
                required
              />
              <label className="top-top">Doctor *</label>
              <datalist id="doctor">
                {doctors?.data.map((doctor, index) => (
                  <option key={index}>
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="child w-[100%] relative mb-5">
            <textarea
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] h-[200px] px-4 w-[100%]"
              type="text"
              name="symptoms"
              style={{ height: "80px", width: "100%", padding: "12px" }}
              value={consultation.symptoms}
              onChange={changeHandler}
              required
            />
            <label className="top-top">Symptoms *</label>
          </div>
          <div className="child w-[100%] relative mb-5">
            <textarea
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="text"
              name="additional_explanation"
              style={{ height: "80px", width: "100%", padding: "12px" }}
              value={consultation.additional_explanation}
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
              onChange={onImageChange}
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
            <div className="w-[31%] flex justify-between items-center mb-8 mt-5">
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

export default ConsultationForm;
