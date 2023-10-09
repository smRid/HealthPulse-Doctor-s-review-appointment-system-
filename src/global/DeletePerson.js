import React from "react";
import classes from "./DeletePerson.module.css";

const DeletePerson = (props) => {
  return (
    <div
      style={{ backgroundColor: "rgb(0 0 0 / 40%)" }}
      className="fixed w-[100%] h-[100vh] top-0 right-0 z-[1000] flex justify-center items-center"
    >
      <div className={classes.container}>
        <header className={classes.header}>
          <h2>Delete the record</h2>
        </header>
        <div className={classes.content}>
          <p>? Are you sure to delete this record</p>
        </div>
        <div className="w-[35%] flex justify-between items-center mt-5 mx-auto">
          <button
            onClick={props.onBack}
            className="border border-[var(--gray-color)] px-[30px] py-[8px] outline-none cursor-pointer font-bold rounded-lg text-[var(--gray-color)] "
          >
            Back
          </button>
          <button
            type="submit"
            onClick={props.onConfrim}
            className="py-[9px] text-[var(--p-color)] px-[25px] font-bold bg-[var(--gray-color)] cursor-pointer shadow-lg rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePerson;
