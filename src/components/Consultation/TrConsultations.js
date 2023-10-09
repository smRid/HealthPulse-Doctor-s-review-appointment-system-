import React from "react";
import details from "../../global/images/responsability.png";
import deletes from "../../global/images/delete.png";
import edit from "../../global/images/edit.png";
import review from "../../global/images/review.png";
import { NavLink } from "react-router-dom";

const TrConsultations = ({
  consultation,
  onDelete,
  onReply,
  onEdit,
  forReviews,
  onAddReview,
  isDoctor
}) => {
  const createDate = new Date(consultation.created_at);
  const consultationDate = `${createDate.getFullYear()}-${
    createDate.getMonth() + 1
  }-${createDate.getDate()}`;

  return (
    <tr>
      {!isDoctor && <td>{consultation.doctor.specialization.name}</td>}
      {!isDoctor && (
        <td style={{ width: "10%" }}>
          {`${consultation.doctor.first_name} ${consultation.doctor.last_name}`}
        </td>
      )}
      {isDoctor && (
        <td>
          {consultation.patient.first_name} {consultation.patient.last_name}
        </td>
      )}
      <td style={{ width: "25%" }}>{consultation.symptoms}</td>
      <td>{consultation.additional_explanation}</td>
      <td style={{ width: "1%" }}>{consultation.done ? "Done" : "Pending"}</td>
      <td style={{ width: "1%" }}>{consultationDate}</td>
      <td>
        {!forReviews && !isDoctor && (
          <div className="flex justify-between items-center w-[60%] m-auto">
            <img
              className="w-6 cursor-pointer"
              src={deletes}
              onClick={() => onDelete(consultation.id)}
              alt=""
            />
            {!consultation.done && (
              <img
                className="w-6 cursor-pointer"
                src={edit}
                onClick={() => onEdit(consultation)}
                alt=""
              />
            )}
            {consultation.done && (
              <img
                className="w-6 cursor-pointer"
                src={details}
                onClick={() => onReply(consultation)}
                alt=""
              />
            )}
            <NavLink to={`/Aafia/ConReview/${consultation.id}`}>
              <img className="w-6 cursor-pointer" src={review} alt="" />
            </NavLink>
          </div>
        )}
        {forReviews && (
          <div className="flex justify-center items-center w-[50%] m-auto">
            <p className="text-[var(--gray-color)] font-thin opacity-[85%]">
              +
            </p>
            <img
              className="w-6 cursor-pointer"
              src={review}
              alt="Add Review"
              onClick={() => onAddReview(consultation)}
            />
          </div>
        )}
        {isDoctor && (
          <div className="flex justify-center items-center w-[50%] m-auto">
            <NavLink to={`/Aafia/ConRepley/${consultation.id}`}>
              <img
                className="w-6 cursor-pointer"
                src={consultation.done ? edit : details}
                alt=""
              />
            </NavLink>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TrConsultations;
