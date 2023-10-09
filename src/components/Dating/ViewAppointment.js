import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DeletePerson from "../../global/DeletePerson";
// import EditCon from "./EditCon";
import Cookies from "js-cookie";
import ReplyForm from "./ReplyForm";
import { API } from "../../data/config";
import TrAppointment from "./TrAppointment";
import FormDoctorRepley from "./FormDoctorRepley";
import AcceptOrCancel from "./AcceptOrCancel";
import AppointmentForm from "./AppointmetForm";
// import ConsultationForm from "./ConsultationForm";

const ViewAppointment = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [appointments, setAppointment] = useState([]);
  // const [showDetails, setShowDetails] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [action, setAction] = useState(false);
  const [showFormDoctor, setShowFormDoctor] = useState(false);
  const [showSureForm, setShowSureForm] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const isDoctor = !!Cookies.get("user")
    ? JSON.parse(Cookies.get("user")).role === 0
    : false;

  // const deleteHandler = (id, isPending) => {
  //   setConId(id);
  //   setDel(true);
  //   setIsPending(isPending);
  // };

  const confrimHandler = () => {
    const http =
      action === "Confirm"
        ? API.appointment.CONFIRM_APPOINYMENT
        : API.appointment.CANCEL_APPOINYMENT;
    axios
      .put(
        `${http}${appointmentId}/`,
        {},
        {
          headers: {
            Authorization: "JWT " + Cookies.get("accessToken")
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        setShowSureForm(false);
        setFetchAgain(!fetchAgain);
      });
  };

  const deleteBackHandler = () => {
    setShowSureForm(false);
  };

  // const editBackHandler = (edit) => {
  //   if (edit) {
  //     setFetchAgain(!fetchAgain);
  //   }
  //   setShowDetails(false);
  // };

  const fetchHandler = useCallback(() => {
    axios
      .get(API.appointment.GET_APPOINYMENTS, {
        headers: {
          Authorization: "JWT " + Cookies.get("accessToken")
        }
      })
      .then((res) => {
        setAppointment(res.data.data);
      });
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler, fetchAgain]);

  // const editHandler = (consultation) => {
  //   setShowDetails(consultation);
  // };

  // const showReplyHandler = (consultation) => {
  //   setShowReply(consultation);
  // };

  // const replyBackHandler = () => {
  //   setShowReply(false);
  // };

  const acceptedHandler = (appointment, isDoctor) => {
    if (isDoctor) {
      setShowFormDoctor(appointment);
      setAction("Accept");
    } else {
      setAction("Confirm");
      setShowSureForm(true);
      setAppointmentId(appointment.id);
    }
  };
  const rejectedHandler = (appointment, isDoctor) => {
    if (isDoctor) {
      setShowFormDoctor(appointment);
      setAction("Reject");
    } else {
      setAction("Cancel");
      setShowSureForm(true);
      setAppointmentId(appointment.id);
    }
  };

  const goBackHandler = () => {
    setFetchAgain(!fetchAgain);
    setShowFormDoctor(false);
  };

  const reRequestHandler = (appointment) => {
    setShowReply(appointment);
  };

  return (
    <div className="py-20 px-20">
      {showSureForm && (
        <AcceptOrCancel
          action={action}
          onConfrim={confrimHandler}
          onBack={deleteBackHandler}
        />
      )}
      {showFormDoctor && (
        <FormDoctorRepley
          appointment={showFormDoctor}
          action={action}
          goBackHandler={goBackHandler}
        />
      )}
      {showReply && (
        <AppointmentForm
          appointmentData={showReply}
          method="edit"
          specialization={showReply.doctor.specialization.name}
          doctor={showReply.doctor}
          goBackHandler={() => {
            setShowReply(false);
            setFetchAgain(!fetchAgain);
          }}
        />
      )}
      <div className="flex justify-between items-center">
        <div className="w-[32%]">
          <p className="text-[var(--greenLigth-color)]">Total Appointments:</p>
          <p className="text-[var(--gray-color)] text-3xl mt-2">
            {appointments.count}
            <span className="text-sm ml-4">Appointments</span>
          </p>
        </div>
        <div className="w-[32%]">
          <p className="text-[var(--greenLigth-color)]">
            Accepted Appointments :
          </p>
          <p className="text-[var(--gray-color)] text-3xl mt-2">
            {appointments.accepted_count}
            <span className="text-sm ml-4">Appointments</span>
          </p>
        </div>
        <div className="w-[32%]">
          {/* {!isDoctor && ( */}
          <p className="text-[var(--greenLigth-color)]">
            Rejected Appointments :
          </p>
          {/* )} */}
          {/* {!isDoctor && ( */}
          <p className="text-[var(--gray-color)] text-3xl mt-2">
            {appointments.rejected_count}
            <span className="text-sm ml-4">Appointments</span>
          </p>
          {/* )} */}
        </div>
      </div>
      <table className="my-16">
        <thead>
          <tr>
            {!isDoctor && <th>Specialization</th>}
            {!isDoctor && <th>Doctor</th>}
            {isDoctor && <th>Patient</th>}
            <th>Booking date</th>
            <th>City</th>
            <th>Status</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {appointments.data?.map((appointment, index) => {
            return (
              <TrAppointment
                key={index}
                isDoctor={isDoctor}
                appointment={appointment}
                // onEdit={editHandler}
                // onReply={showReplyHandler}
                // onDelete={deleteHandler}
                onAccept={acceptedHandler}
                onReject={rejectedHandler}
                onRepeat={reRequestHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppointment;
