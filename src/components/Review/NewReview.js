import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import UseAxiosGet from "../../hooks/useAxiosGet";
import { API } from "../../data/config";
import TrConsultations from "../Consultation/TrConsultations";

const NewReview = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: consultations } = UseAxiosGet(API.consultations.CONSULTATIONS);

  const showFormHandler = (consoltation) => {
    setShowForm(consoltation);
  };

  const goBackHandler = () => {
    setShowForm(false);
  };

  return (
    <div className="px-20">
      {showForm && (
        <ReviewForm
          goBackHandler={goBackHandler}
          method="create"
          consultation={showForm}
        />
      )}
      <table className="my-16">
        <thead>
          <tr>
            <th>Specialization</th>
            <th>Doctor</th>
            <th>Symptoms</th>
            <th>explanation</th>
            <th>status</th>
            <th>Created</th>
            <th>procedures</th>
          </tr>
        </thead>
        <tbody>
          {consultations?.data.data
            .filter((array) => array.done === true)
            ?.map((consultation, index) => {
              return (
                <TrConsultations
                  key={index}
                  consultation={consultation}
                  forReviews={true}
                  onAddReview={showFormHandler}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default NewReview;
