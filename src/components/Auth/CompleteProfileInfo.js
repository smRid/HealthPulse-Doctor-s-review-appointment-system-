import Cookies from "js-cookie";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import UseAxiosGet from "../../hooks/useAxiosGet";
import { API } from "../../data/config";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from "../../store/auth";

const CompleteProfileInfo = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const dispatch = useDispatch();
  const isDoctor = user?.role === 1 ? false : true;
  const nav = useNavigate();
  const [country, setCountry] = useState("");
  const [imageLicense, setImageLicense] = useState("");
  const [imagePhoto, setImagePhoto] = useState("");
  const [completeData, setCompleteData] = useState({
    phone_number: "",
    birth_date: null,
    gender: "",
    photo: "",
    city: "",
    blood_type: "",
    length: "",
    weight: "",
    chronic_disease: "",
    genetic_disease: "",
    other_info: "",
    license: "",
    available_for_meeting: false,
    specialization: ""
  });
  const [url, setUrl] = useState(null);
  const { data: cities } = UseAxiosGet(url);
  const { data: countries } = UseAxiosGet(API.static.GET_COUNTRIES);
  const { data: specializations } = UseAxiosGet(API.static.GET_SPECIALIZATIONS);

  const blurCountryHandler = (e) => {
    if (!countries.data.some((array) => array.name === e.target.value)) {
      swal({
        icon: "warning",
        timer: 2100,
        title: "Please enter a valid country"
      });
      setCountry("");
    } else setUrl(`${API.static.GET_CITIES}?country=${e.target.value}`);
  };

  const blurCityHandler = (e) => {
    if (!country) {
      swal({
        icon: "warning",
        timer: 2100,
        title: "Please select a country first"
      });
      setCompleteData((prev) => {
        return { ...prev, city: "" };
      });
    } else if (!cities.data.some((array) => array.name === e.target.value)) {
      swal({
        icon: "warning",
        timer: 2100,
        title: "Please enter a valid city"
      });
      setCompleteData((prev) => {
        return { ...prev, city: "" };
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCompleteData((prev) => {
      if (name === "available_for_meeting")
        return { ...prev, [name]: e.target.checked };
      else return { ...prev, [name]: value };
    });
  };

  const onImageChange = (event) => {
    const { name, files } = event.target;
    if (name === "license") {
      setImageLicense(URL.createObjectURL(files[0]));
    }
    if (name === "photo") {
      setImagePhoto(URL.createObjectURL(files[0]));
    }
    setCompleteData((prev) => {
      return { ...prev, [name]: files[0] };
    });
  };

  const removeImageHandler = (name) => {
    if (name === "license") {
      setImageLicense(null);
    }
    if (name === "photo") {
      setImagePhoto(null);
    }
    setCompleteData((prev) => {
      return { ...prev, name: null };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const birthDate = completeData.birth_date
      ? `${completeData.birth_date.getFullYear()}-${
          completeData.birth_date.getMonth() + 1
        }-${completeData.birth_date.getDate()}`
      : null;
    const url = isDoctor
      ? API.profile.DOCTOR_PROFILE
      : API.profile.PATIENT_PROFILE;
    const cityId = cities?.data.filter(
      (array) => array.name === completeData.city
    )[0].id;
    const formData = new FormData();
    formData.append("phone_number", completeData.phone_number);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("birth_date", birthDate);
    if (completeData.gender) formData.append("gender", completeData.gender);
    formData.append("photo", completeData.photo);
    if (completeData.city) formData.append("city_id", cityId);
    if (isDoctor) {
      const specializationId = specializations?.data.filter(
        (array) => array.name === completeData.specialization
      )[0].id;
      formData.append("license", completeData.license);
      formData.append(
        "available_for_meeting",
        completeData.available_for_meeting
      );
      formData.append("specialization_id", specializationId);
    } else {
      if (completeData.blood_type)
        formData.append("blood_type", completeData.blood_type);
      if (completeData.length) formData.append("length", completeData.length);
      if (completeData.weight) formData.append("weight", completeData.weight);
      formData.append("chronic_disease", completeData.chronic_disease);
      formData.append("genetic_disease", completeData.genetic_disease);
      formData.append("other_info", completeData.other_info);
    }
    axios
      .put(url, formData, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        Cookies.set("user", JSON.stringify(res.data.data), {
          path: "/",
          expires: 10
        });
        swal({
          title: `${res.data.message}`,
          timer: "5000",
          icon: "success"
        });
        setTimeout(() => {
          dispatch(authAction.loginHandler(true));
          if (isDoctor) nav("/AboutUs");
          else nav("/Aafia/Home");
        }, [3040]);
      })
      .catch((err) => {
        console.log(err.response.data);
        swal({
          icon: "warning",
          timer: 2100,
          title: `${err.response.data.message}`
        });
      });
  };

  return (
    <div>
      <div
        className='register text-[var(--p-color)] relative flex items-center bg-[url("/src/global/images/top-view-pile-pills.jpg")]
          w-[100%] h-[100vh] bg-no-repeat bg-cover'
      >
        <div className="absolute bg-black w-full opacity-[0.5] h-[100vh]"></div>
        <div
          className={` ${
            isDoctor ? "h-[520px]" : "h-[540px]"
          } z-40 w-[800px] rounded-2xl bg-[var(--p-color)] absolute left-[21%] p-4 px-5 shadow-xl`}
        >
          <p className="mt-2 text-center italic text-lg text-[var(--gray-color)] font-bold">
            Please enter the remaining information to complete the account
            creation
          </p>
          <hr className="w-[70%] m-auto mt-3 rounded-full border-[var(--greenLigth-color)]"></hr>
          <p className="mt-6 mb-3 text-lg italic text-[var(--gray-color)]">
            The fields marked with * are required
          </p>
          <form className="flex flex-col w-[100%]" onSubmit={submitHandler}>
            <div className="w-[100%] relative flex justify-between items-center">
              <div className="child">
                <input
                  className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                  type="text"
                  name="phone_number"
                  value={completeData.phone_number}
                  onChange={changeHandler}
                />
                <label className="top-top">Phone number *</label>
              </div>
              <div className="child">
                <DatePicker
                  className="subchild"
                  dateFormat="yyyy/MM/dd"
                  name="birth_date"
                  isClearable
                  selected={completeData.birth_date}
                  onChange={(e) =>
                    setCompleteData((prev) => {
                      return { ...prev, birth_date: e };
                    })
                  }
                />
                <label className="top-top">Birthdate *</label>
              </div>
              <div className="child">
                <select
                  className="border-none outline-none cursor-pointer rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                  type="text"
                  name="gender"
                  value={completeData.gender}
                  onChange={changeHandler}
                >
                  <option value="" disabled selected></option>
                  <option className="cursor-pointer" value="0">
                    Male
                  </option>
                  <option className="cursor-pointer" value="1">
                    Female
                  </option>
                </select>
                <label className="top-top">Gender *</label>
              </div>
            </div>
            <div className="w-[100%] relative flex justify-between items-center">
              <div className="child">
                <input
                  className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                  type="text"
                  name="country"
                  id="country"
                  value={country}
                  onBlur={blurCountryHandler}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  list="countries"
                />
                <label className="top-top">Country *</label>
                <datalist id="countries">
                  {countries?.data.map((country, index) => (
                    <option key={index}>{country.name}</option>
                  ))}
                </datalist>
              </div>
              <div className="child">
                <input
                  className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                  type="text"
                  name="city"
                  id="city"
                  onBlur={blurCityHandler}
                  value={completeData.city}
                  onChange={changeHandler}
                  list="cities"
                />
                <label className="top-top">City *</label>
                <datalist id="cities">
                  {cities?.data.map((city, index) => (
                    <option key={index}>{city.name}</option>
                  ))}
                </datalist>
              </div>
            </div>
            {!isDoctor && (
              <div className="w-[100%] relative flex justify-between items-center">
                <div className="child">
                  <input
                    className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                    type="number"
                    name="weight"
                    value={completeData.weight}
                    onChange={changeHandler}
                  />
                  <label className="top-top">Weight *</label>
                </div>
                <div className="child">
                  <input
                    className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                    type="number"
                    name="length"
                    value={completeData.length}
                    onChange={changeHandler}
                  />
                  <label className="top-top">Length *</label>
                </div>
                <div className="child">
                  <select
                    className="border-none outline-none cursor-pointer rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                    type="text"
                    name="blood_type"
                    value={completeData.blood_type}
                    onChange={changeHandler}
                  >
                    <option value="" disabled selected>
                      Choose your blood type
                    </option>
                    <option className="cursor-pointer" value="0">
                      O+
                    </option>
                    <option className="cursor-pointer" value="4">
                      O-
                    </option>
                    <option className="cursor-pointer" value="1">
                      A+
                    </option>
                    <option className="cursor-pointer" value="5">
                      A-
                    </option>
                    <option className="cursor-pointer" value="6">
                      B-
                    </option>
                    <option className="cursor-pointer" value="2">
                      B+
                    </option>
                    <option className="cursor-pointer" value="3">
                      AB+
                    </option>
                    <option className="cursor-pointer" value="7">
                      AB-
                    </option>
                  </select>
                  <label className="top-top">Blood type *</label>
                </div>
              </div>
            )}
            {!isDoctor && (
              <div className="w-[100%] relative flex justify-between items-center">
                <div className="child">
                  <input
                    className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                    type="text"
                    name="chronic_disease"
                    value={completeData.chronic_disease}
                    onChange={changeHandler}
                  />
                  <label className="top-top">Chronic disease</label>
                </div>
                <div className="child">
                  <input
                    className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                    type="text"
                    name="genetic_disease"
                    value={completeData.genetic_disease}
                    onChange={changeHandler}
                  />
                  <label className="top-top">Genetic disease</label>
                </div>
              </div>
            )}
            {isDoctor && (
              <div className="child w-[100%] relative mb-5">
                <input
                  className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                  type="text"
                  name="specialization"
                  value={completeData.specialization}
                  onChange={changeHandler}
                  list="specializations"
                />
                <label className="top-top">Specialization *</label>
                <datalist id="specializations">
                  {specializations?.data.map((specialization) => (
                    <option key={specialization.id}>
                      {specialization.name}
                    </option>
                  ))}
                </datalist>
              </div>
            )}
            <div className="w-[100%] flex justify-between items-center">
              {isDoctor && (
                <div className="imgcontent w-[49%] relative mb-5">
                  <input
                    className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 "
                    type="file"
                    style={{ display: "none" }}
                    id="analysis"
                    name="license"
                    onChange={onImageChange}
                  />
                  <label className="top-top" htmlFor="analysis">
                    <box-icon
                      color="var(--green-color)"
                      type="solid"
                      name="image-add"
                    ></box-icon>
                    Add your license photo *
                  </label>
                  {imageLicense && (
                    <div className="place-image">
                      <p
                        onClick={() => removeImageHandler("license")}
                        style={{ cursor: "pointer" }}
                      >
                        x
                      </p>
                      <img src={imageLicense} alt="" />
                    </div>
                  )}
                </div>
              )}
              {!isDoctor && (
                <div className="child w-[49%] relative ">
                  <input
                    className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] mb-[9px] px-4 w-[100%]"
                    type="text"
                    value={completeData.other_info}
                    name="other_info"
                    onChange={changeHandler}
                  />
                  <label className="top-top">Other info</label>
                </div>
              )}
              <div className="imgcontent w-[50%] ml-2 relative mb-5">
                <input
                  className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4"
                  type="file"
                  style={{ display: "none" }}
                  name="photo"
                  id="photo"
                  onChange={onImageChange}
                />
                <label className="top-top" htmlFor="photo">
                  <box-icon
                    color="var(--green-color)"
                    type="solid"
                    name="image-add"
                  ></box-icon>
                  Add your photo
                </label>
                {imagePhoto && (
                  <div className="place-image">
                    <p
                      onClick={() => removeImageHandler("photo")}
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </p>
                    <img src={imagePhoto} alt="" />
                  </div>
                )}
              </div>
            </div>
            {isDoctor && (
              <div className="flex justify-between items-center w-[31%]">
                <input
                  className="accent-[var(--green-color)] cursor-pointer mr-2 w-[13px] h-[13px] rounded-md  "
                  type="checkbox"
                  id="meeting"
                  name="available_for_meeting"
                  value={completeData.available_for_meeting}
                  onChange={changeHandler}
                />
                <label
                  htmlFor="meeting"
                  className="cursor-pointer text-[var(--gray-color)] opacity-[90%]"
                >
                  Available for appointment
                </label>
              </div>
            )}
            <div className="flex justify-end items-center">
              <div
                className={`${
                  isDoctor ? "mt-5" : "mt-2"
                }  w-[31%] flex justify-end items-center mb-8`}
              >
                <button
                  type="submit"
                  className="py-[9px] text-[var(--p-color)] px-[27px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileInfo;
