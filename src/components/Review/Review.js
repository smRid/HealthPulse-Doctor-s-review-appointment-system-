import React, { useEffect, useRef, useState } from "react";
import "./Review.css";
import img from "../../global/images/medicine-capsules-global-health-with-geometric-pattern-digital-remix.jpg";
import ViewReviews from "./ViewReviews";
import NewReview from "./NewReview";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Review = () => {
  const [newActive, setNewActive] = useState(true);
  const pageRef = useRef(null);
  const location = useLocation();
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div ref={pageRef}>
      <div className="review pt-[62px]">
        <div className="absolute top-0 left-0 w-[100%] h-[362px] bg-black z-20 opacity-[0.2]"></div>
        <div className="relative">
          <img src={img} alt="" className="h-[300px] w-[100%] object-cover" />
          <p className="absolute top-[50%] left-20 font-[Caprasimo] z-30 text-4xl w-[700px] text-[var(--p-color)]">
            {isDoctor
              ? "Responding to reviews allows you to showcase your dedication to patients satisfaction"
              : "You can review the doctor who gave you the previous consultation at any time"}
          </p>
        </div>
        {!isDoctor && (
          <div className="w-[27%] m-auto h-[60px] rounded-full bg-[var(--greenLigth-color)] border border-[var(--greenLigth-color)] mt-10 flex justify-center items-center">
            <ul className="flex justify-between items-center w-[100%] mx-auto">
              <li
                className={newActive ? "active" : "unactive"}
                onClick={() => setNewActive(true)}
              >
                New Review
              </li>
              <li
                className={!newActive ? "active" : "unactive"}
                onClick={() => setNewActive(false)}
              >
                My Reviews
              </li>
            </ul>
          </div>
        )}
        {newActive && !isDoctor ? <NewReview /> : <ViewReviews />}
      </div>
    </div>
  );
};

export default Review;
