import React from "react";

const ReplyForm = ({ onBack, consultationReply }) => {
  return (
    <div
      style={{ backgroundColor: "rgb(0 0 0 / 40%)" }}
      className="fixed w-[100%] h-[100vh] top-0 right-0 z-[1000] flex justify-center items-center"
    >
      <div className="fixed shadow-lg rounded-2xl w-[65%] h-auto  px-8 bg-[var(--p-color)]">
        <p className="mt-7 text-center italic text-lg text-[var(--gray-color)] font-bold">
          The doctor replied
        </p>
        <hr className="w-[70%] m-auto mt-3 rounded-full border-[var(--greenLigth-color)]"></hr>
        <form className="flex flex-col w-[100%] mt-7">
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={consultationReply.doctor.specialization.name}
              />
              <label className="top-top">Specialization</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={`${consultationReply.doctor.first_name} ${consultationReply.doctor.last_name}`}
              />
              <label className="top-top">Doctor</label>
            </div>
          </div>
          <div className="child w-[100%] relative mb-5">
            <textarea
              className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
              type="text"
              readOnly
              style={{ height: "80px", width: "100%", padding: "12px" }}
              value={consultationReply.symptoms}
            />
            <label className="top-top">Symptoms</label>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                style={{ height: "150px", width: "97%", padding: "12px" }}
                readOnly
                value={consultationReply.diagnosis}
              />
              <label className="top-top">Diagnosis</label>
            </div>
            <div className="child w-[100%] relative mb-5">
              <textarea
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[100%]"
                type="text"
                name="prescription"
                style={{ height: "150px", width: "100%", padding: "12px" }}
                readOnly
                value={consultationReply.prescription}
              />
              <label className="top-top">Prescription</label>
            </div>
          </div>
          <div className="w-[100%] relative flex justify-between items-center">
            <div className="child">
              <input
                className="subchild border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                readOnly
                value={consultationReply.treatment_duration}
              />
              <label className="top-top">Treatment time</label>
            </div>
            <div className="child">
              <input
                className="border-none outline-none rounded-r-lg text-gray-700 rounded-l-lg py-[7px] px-4 w-[49%]"
                type="text"
                value={
                  consultationReply.need_review_at
                    ? consultationReply.need_review_at
                    : "No need to review"
                }
              />
              <label className="top-top">Review time</label>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="w-[31%] flex justify-end items-center mb-8 mt-5">
              <button
                onClick={onBack}
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

export default ReplyForm;
