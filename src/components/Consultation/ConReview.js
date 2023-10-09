import React, { useCallback, useEffect, useRef, useState } from "react";
import edit from "../../global/images/edit.png";
import Cookies from "js-cookie";
import axios from "axios";
import DeletePerson from "../../global/DeletePerson";
import ReplyRevForm from "../Review/ReplyRevForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../data/config";
import ReviewForm from "../Review/ReviewForm";
import TrReview from "../Review/TrReview";

const ConReview = () => {
  const [del, setDel] = useState();
  const [revId, setRevId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const param = useParams();
  const nav = useNavigate();

  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

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
      .get(`${API.consultations.REVIEWS}?consultation_id=${+param.id}`, {
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
    <div className="pt-[82px] px-20" ref={pageRef}>
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
      <p className="text-[40px] font-[Caprasimo] text-[var(--gray-color)]">
        Counseling reviews :
      </p>
      <table className="mt-16 mb-10">
        <thead>
          <tr>
            <th>Specialization</th>
            <th>Doctor</th>
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
                onEdit={editHandler}
                onReply={showReplyHandler}
                onDelete={deleteHandler}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end items-center mb-8 ">
        <button
          onClick={() => {
            nav("/Aafia/Consultation");
          }}
          className="border border-[var(--gray-color)] px-[30px] py-[8px] outline-none cursor-pointer font-bold rounded-lg text-[var(--gray-color)] "
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ConReview;
