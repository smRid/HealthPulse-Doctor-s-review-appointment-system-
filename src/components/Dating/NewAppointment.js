import React from "react";
import ophthalmology from "../../global/images/eyes.png";
import gastroenterology from "../../global/images/stomach.png";
import neurology from "../../global/images/neuron.png";
import gynecology from "../../global/images/abortion.png";
import orthopedics from "../../global/images/bones.png";
import pediatrics from "../../global/images/pediatrics.png";
import Psychiatry from "../../global/images/antidepressants.png";
import other from "../../global/images/trust.png";
import heart from "../../global/images/heart.png";
import { useNavigate } from "react-router-dom";

const NewAppointment = () => {
  const nav = useNavigate();
  return (
    <div className="py-20 features">
      <div
        class="container"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
      >
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Cardiology")}
        >
          <img src={heart} alt="" className="w-14 ml-[40%]" />
          {/* قلبية */}
          <h3>Cardiology</h3>
          {/* <p>
            Cardiology is a medical specialty that focuses on diagnosing and
            treating heart and blood vessel disorders. Cardiologists use various
            tests and procedures to evaluate and treat cardiovascular conditions
            with the goal of improving patients' quality of life and lifespan.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Ophthalmology")}
        >
          <img src={ophthalmology} alt="" className="w-14 ml-[40%]" />
          {/* عينية */}
          <h3>Ophthalmology</h3>
          {/* <p>
            Ophthalmology is a medical specialty that deals with the diagnosis
            and treatment of eye disorders. Ophthalmologists use various tests
            and procedures to evaluate and treat conditions such as cataracts,
            glaucoma, and diabetic retinopathy to preserve and improve their
            patients' vision.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Gastroenterology")}
        >
          <img src={gastroenterology} alt="" className="w-14 ml-[40%]" />
          {/* هضمية */}
          <h3>Gastroenterology</h3>
          {/* <p>
            Gastroenterology is a medical specialty that deals with the
            diagnosis and treatment of disorders of the digestive system.
            Gastroenterologists are trained to prevent, diagnose, and treat a
            wide range of conditions affecting the esophagus, stomach,
            intestines, liver, pancreas, and gallbladder.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Neurology")}
        >
          <img src={neurology} alt="" className="w-14 ml-[40%]" />
          {/* عصبية */}
          <h3>Neurology</h3>
          {/* <p>
            Neurology is a medical specialty that deals with the diagnosis and
            treatment of disorders of the nervous system. Neurologists are
            trained to prevent, diagnose, and treat a wide range of conditions
            affecting the brain, spinal cord, and nerves,
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Gynecology")}
        >
          <img src={gynecology} alt="" className="w-14 ml-[40%]" />
          {/* نسائية */}
          <h3>Gynecology</h3>
          {/* <p>
            Gynecology is a medical specialty that deals with the diagnosis and
            treatment of conditions related to the female reproductive system
            and childbirth. Gynecologists are trained to prevent, diagnose, and
            treat a wide range of conditions affecting the uterus, ovaries, and
            cervix.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Orthopedics")}
        >
          <img src={orthopedics} alt="" className="w-14 ml-[40%]" />
          {/* عضمية */}
          <h3>Orthopedics</h3>
          {/* <p>
            Orthopedics is a medical specialty that deals with the diagnosis and
            treatment of conditions related to the musculoskeletal system.
            Orthopedic surgeons are trained to prevent, diagnose, and treat a
            wide range of conditions affecting the bones, joints, muscles,
            ligaments, and tendons, such as fractures, arthritis, sports
            injuries, and spinal disorders.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Pediatrics")}
        >
          <img src={pediatrics} alt="" className="w-14 ml-[40%]" />
          {/* اظفال */}
          <h3>Pediatrics</h3>
          {/* <p>
            Pediatrics is a medical specialty that deals with the healthcare of
            infants, children, and adolescents. Pediatricians are trained to
            prevent, diagnose, and treat a wide range of medical conditions
            affecting children, such as developmental disorders, infectious
            diseases, allergies, and chronic illnesses.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/Psychiatry")}
        >
          <img src={Psychiatry} alt="" className="w-14 ml-[40%]" />
          {/* نفسي */}
          <h3>Psychiatry</h3>
          {/* <p>
            Psychiatry is a medical specialty that deals with the diagnosis and
            treatment of mental health disorders. Psychiatrists are trained to
            prevent, diagnose, and treat a wide range of conditions affecting
            mood, behavior, cognition, and perception, such as depression,
            anxiety, schizophrenia, bipolar disorder, and addiction.
          </p> */}
        </div>
        <div
          class="feat"
          onClick={() => nav("/Aafia/DoctorsAppointment/General")}
        >
          <img src={other} alt="" className="w-14 ml-[40%]" />
          {/* عام */}
          <h3>general medical services</h3>
          {/* <p>
            General medical departments may provide primary care services, such
            as routine check-ups, vaccinations, and treatment for minor
            illnesses and injuries. These departments may also refer patients to
            specialists for more specialized care. The goal of general medical
            departments is to provide comprehensive medical care to patients of
            all ages and backgrounds.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
