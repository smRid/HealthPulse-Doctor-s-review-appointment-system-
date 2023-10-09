import React, { useCallback, useEffect, useState } from "react";
import edit from "../../global/images/edit.png";
import Cookies from "js-cookie";
import axios from "axios";
import DeletePerson from "../../global/DeletePerson";
import ReplyRevForm from "./ReplyRevForm";
import { API } from "../../data/config";
import ReviewForm from "./ReviewForm";
import TrReview from "./TrReview";

const ViewReviews = () => {
  const [del, setDel] = useState();
  const [revId, setRevId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  const deleteHandler = (id) => {
    setRevId(id);
    setDel(true);
  };

  const confrimHandler = () => {
    axios
      .delete(`${API.consultations.REVIEWS}${revId}`, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        setDel(false);
        setFetchAgain(!fetchAgain);
      });
  };

  const deleteBackHandler = () => {
    setDel(false);
  };

  const editBackHandler = () => {
    if (edit) {
      setFetchAgain(!fetchAgain);
    }
    setShowDetails(false);
  };

  const fetchHandler = useCallback(() => {
    axios
      .get(API.consultations.REVIEWS, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        setReviews(res.data.data);
      });
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler, fetchAgain]);

  const editHandler = (review) => {
    setShowDetails(review);
  };

  const showReplyHandler = (review) => {
    setShowReply(review);
  };

  const replyBackHandler = () => {
    setShowReply(false);
  };

  return (
    <div className="py-20 px-20">
      {del && (
        <DeletePerson onConfrim={confrimHandler} onBack={deleteBackHandler} />
      )}
      {showDetails && (
        <ReviewForm
          method={"edit"}
          reviewEdit={showDetails}
          consultation={showDetails.consultation}
          goBackHandler={editBackHandler}
        />
      )}
      {showReply && (
        <ReplyRevForm reviewReply={showReply} onBack={replyBackHandler} />
      )}
      <div className="flex justify-between items-center">
        <div className="w-[32%]">
          <p className="text-[var(--greenLigth-color)]">Total reviews:</p>
          <p className="text-[var(--gray-color)] text-3xl mt-2">
            {reviews.count}
            <span className="text-sm ml-4">reviews</span>
          </p>
        </div>
        <div className="w-[32%]">
          <p className="text-[var(--greenLigth-color)]">
            Review requests pending:
          </p>
          <p className="text-[var(--gray-color)] text-3xl mt-2">
            {reviews.pending_count}
            <span className="text-sm ml-4">reviews</span>
          </p>
        </div>
        <div className="w-[32%]"></div>
      </div>
      <table className="my-16">
        <thead>
          <tr>
            {!isDoctor && <th>Specialization</th>}
            {!isDoctor && <th>Doctor</th>}
            {isDoctor && <th>Patient</th>}
            <th>Review reason</th>
            <th>Explanation</th>
            <th>Status</th>
            <th>Created</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {reviews.data?.map((review, index) => {
            return (
              <TrReview
                key={index}
                review={review}
                isDoctor={isDoctor}
                onEdit={editHandler}
                onReply={showReplyHandler}
                onDelete={deleteHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReviews;
