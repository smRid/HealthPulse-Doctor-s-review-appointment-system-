import React from "react";
import details from "../../global/images/responsability.png";
import deletes from "../../global/images/delete.png";
import edit from "../../global/images/edit.png";
import { NavLink } from "react-router-dom";

const TrReview = ({ review, onDelete, onReply, onEdit, isDoctor }) => {
  const createDate = new Date(review.created_at);
  const ReviewDate = `${createDate.getFullYear()}-${
    createDate.getMonth() + 1
  }-${createDate.getDate()}`;

  return (
    <tr>
      {!isDoctor && <td>{review.consultation.doctor.specialization.name}</td>}
      {!isDoctor && (
        <td>
          {review.consultation.doctor.first_name}{" "}
          {review.consultation.doctor.last_name}
        </td>
      )}
      {isDoctor && (
        <td>
          {review.consultation.patient.first_name}{" "}
          {review.consultation.patient.last_name}
        </td>
      )}
      <td>{review.review_reasons}</td>
      <td>{review.additional_explanation}</td>
      <td>{review.done ? "Done" : "Pending"}</td>
      <td>{ReviewDate}</td>
      <td>
        {!isDoctor && (
          <div className="flex justify-between items-center w-[50%] m-auto">
            <img
              className="w-6 cursor-pointer"
              src={deletes}
              onClick={() => onDelete(review.id)}
              alt=""
            />
            {!review.done && (
              <img
                className="w-6 cursor-pointer"
                src={edit}
                onClick={() => onEdit(review)}
                alt=""
              />
            )}
            {review.done && (
              <img
                className="w-6 cursor-pointer"
                src={details}
                onClick={() => onReply(review)}
                alt=""
              />
            )}
          </div>
        )}
        {isDoctor && (
          <div className="flex justify-center items-center w-[50%] m-auto">
            <NavLink to={`/Aafia/RevRepley/${review.id}`}>
              <img
                className="w-6 cursor-pointer"
                src={review.done ? edit : details}
                alt=""
              />
            </NavLink>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TrReview;
