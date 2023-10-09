import React from "react";
import imageuser from "../../global/images/photo_2023-08-12_04-33-51.jpg";

const Comment = (props) => {
  return (
    <div className="flex mt-[25px] relative">
      <img src={props.photo ? props.photo : imageuser} className="w-9 h-9 rounded-full" alt="" />
      <div className="bg-[var(--p-color)] px-4 pr-10 pb-2 rounded-2xl ml-2">
        <div className="">
          <h4 className="text-lg font-normal text-[var(--gray-color)]">
            {props.name}
          </h4>
          <label className="text-sm font-light text-[var(--gray-color)] opacity-[0.8]">
            {props.comment}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Comment;
