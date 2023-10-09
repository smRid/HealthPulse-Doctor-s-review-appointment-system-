import React from "react";
import details from "../../global/images/responsability.png";
import deletes from "../../global/images/delete.png";
import repeat from "../../global/images/repeat.png";
import accept from "../../global/images/check.png";
import reject from "../../global/images/rejected.png";
import { NavLink } from "react-router-dom";

const TrAppointment = ({
  appointment,
  onRepeat,
  onAccept,
  onReject,
  // onReply,
  // onEdit,
  isDoctor
}) => {
  // const createDate = new Date(consultation.created_at);
  // const consultationDate = `${createDate.getFullYear()}-${
  //   createDate.getMonth() + 1
  // }-${createDate.getDate()}`;
  const status = ["requested", "accepted", "rejected", "confirmed", "canceled"];
  return (
    <tr>
      {!isDoctor && <td>{appointment.doctor.specialization.name}</td>}
      {!isDoctor && (
        <td>
          {`${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
        </td>
      )}
      {isDoctor && (
        <td>
          {appointment.patient.first_name} {appointment.patient.last_name}
        </td>
      )}
      <td>{appointment.date}</td>
      <td>{appointment.doctor.city.name}</td>
      <td>{status[appointment.status]}</td>
      <td>{appointment.time}</td>
      <td style={{width:"20%"}}>{!isDoctor ? appointment.doctor_notes : appointment.patient_notes}</td>
      <td>
        {!isDoctor && (
          <div className="flex justify-between items-center w-[60%] m-auto">
            {appointment.status !== 4 && <img
              className="w-6 cursor-pointer"
              src={reject}
              onClick={() => onReject(appointment,false)}
              alt=""
            />}
            {appointment.status === 1 && (
              <img
                className="w-6 cursor-pointer"
                src={accept}
                onClick={() => onAccept(appointment,false)}
                alt=""
              />
            )}
            {appointment.status === 2 && (
              <img
                className="w-6 cursor-pointer"
                src={repeat}
                onClick={() => onRepeat(appointment)}
                alt=""
              />
            )}
            {/* {appointment.status !== 0 && (
              <img
                className="w-6 cursor-pointer"
                src={details}
                onClick={() => onReply(appointment)}
                alt=""
              />
            )} */}
            {/* <NavLink to={`/Aafia/ConReview/${consultation.id}`}>
              <img
                className="w-6 cursor-pointer"
                src={review}
                // onClick={() => nav("/Aafia/ConReview/2")}
                alt=""
              />
            </NavLink> */}
          </div>
        )}
        {isDoctor && appointment.status === 0 && (
          <div className="flex justify-between items-center w-[40%] m-auto">
            {/* <NavLink to={`/Aafia/ConRepley/${consultation.id}`}> */}
            <img
              className="w-6 cursor-pointer"
              src={reject}
              onClick={() => onReject(appointment,true)}
              alt=""
            />
            <img
              className="w-6 cursor-pointer"
              src={accept}
              onClick={() => onAccept(appointment,true)}
              alt=""
            />
            {/* </NavLink> */}
          </div>
        )}
      </td>
    </tr>
  );
};

export default TrAppointment;
