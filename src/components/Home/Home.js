import React, { useEffect, useRef } from "react";
import Left from "./Left";
import Right from "./Right";
import MainPosts from "./MainPosts";
import { useLocation } from "react-router-dom";

const SocialMedia = () => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div className="flex pt-[62px] justify-between items-start " ref={pageRef}>
      <Left />
      <MainPosts />
      <Right />
    </div>
  );
};

export default SocialMedia;
