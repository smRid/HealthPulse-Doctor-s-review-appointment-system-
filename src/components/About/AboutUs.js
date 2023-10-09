import React from "react";
import NavBar from "../NavBar";
import "./AboutUs.css";
import consul from "../../global/images/talk.png";
import advice from "../../global/images/hands-holding-heart.png";
import rev from "../../global/images/review.png";
import dating from "../../global/images/calendar.png";
import "boxicons";

const AboutUs = () => {
  return (
    <div>
      <NavBar page="about" />
      <div className="abouts pt-20 bg-[url('/src/global/images/young-handsome-physician-medical-robe-with-stethoscope.jpg')] bg-cover w-full h-screen">
        <p className="w-[750px] font-[Caprasimo] p-28 pb-12 pl-20 text-7xl text-[var(--green-color)]">
          providing Best Medical Care
        </p>
        <p
          style={{ lineHeight: 1.7 }}
          className="w-[550px] text-[var(--p-color)] opacity-60 text-lg pl-20"
        >
          Health care of our patients and thier safety are always will be our
          responsablity and our priority, so we follow the best practices for
          cleanliness
        </p>
      </div>
      <div class="services">
        <div className="mx-auto px-20">
          <div class="main-header">
            <h2 className="text-[var(--gray-color)]">Services</h2>
            <p>
              Caring For The Health, All Aspects Of Medical Practice And Well
              Being Of Family.
            </p>
          </div>
          <div class="srv-container">
            <div class="box">
              <img src={consul} alt="" />
              <div class="text">
                <h3>Consultation</h3>
                <p>
                  This service involves providing advice and guidance to
                  individuals regarding their health concerns. This can be done
                  through online or phone consultations.
                </p>
              </div>
            </div>
            <div class="box">
              <img src={rev} alt="" />
              <div class="text">
                <h3>Review</h3>
                <p>
                  This service involves a review of an existing consultation and
                  analysis of an individual's health data, such as medical
                  history, test results, and lifestyle factors, to make
                  recommendations to improve their overall health and
                  well-being.
                </p>
              </div>
            </div>
            <div class="box">
              <box-icon color="var(--gray-color)" name="timer"></box-icon>
              <img src={dating} alt="" />
              <div class="text">
                <h3>Appointment</h3>
                <p>
                  This service involves providing advice and guidance to
                  individuals regarding their health concerns. This can be done
                  through one-on-one sessions with a healthcare professional.
                </p>
              </div>
            </div>
            <div class="box">
              <img src={advice} alt="" />
              <div class="text">
                <h3>Medical Advices</h3>
                <p>
                  This service provides access to reliable and up-to-date
                  medical information and tools to help individuals make
                  informed decisions about their health and wellness. This can
                  include access to articles and other educational materials on
                  various health topics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="container">
          <p>Follow us on social media</p>
          <div class="social-icons">
            <i color="blue" class="fab fa-facebook-f"></i>
            <i class="fab fa-twitter"></i>
            <i class="fas fa-home"></i>
            <i class="fab fa-linkedin"></i>
          </div>
          <p class="copyright">
            © 2023 <span>HealthPulse</span> All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
