const BASE_URL = "http://154.62.109.112:8000/api";
const AUTH_URL = `${BASE_URL}/auth`;
const PROFILE_URL = `${BASE_URL}/profile`;
const CONSULTATIONS_URL = `${BASE_URL}/consultation`;
const APPOINTMENT_URL = `${BASE_URL}/appointment`;
const ADVICE_URL = `${BASE_URL}/advice`;
const POST_URL = `${BASE_URL}/post`;

export const API = {
  auth: {
    SIGN_UP: `${AUTH_URL}/signup/`,
    LOGIN: `${AUTH_URL}/login/`,
    VERIFICATION_CODE: `${AUTH_URL}/send-verification-code/`,
    VERIFY: `${AUTH_URL}/verify/`,
    CHANGE_PASSWORD: `${AUTH_URL}/change-password/`,
    RESET_PASSWORD: `${AUTH_URL}/reset-password/`,
    CHANGE_EMAIL: `${AUTH_URL}/change-email/`
  },
  profile: {
    DOCTOR_PROFILE: `${PROFILE_URL}/doctor-profiles/me/`,
    PATIENT_PROFILE: `${PROFILE_URL}/patient-profiles/me/`,
    GET_DOCTORS_FOR_SPECIALIZATION: `${PROFILE_URL}/doctors/`
  },
  static: {
    GET_COUNTRIES: `${BASE_URL}/statics/countries/`,
    GET_CITIES: `${BASE_URL}/statics/cities/`,
    GET_SPECIALIZATIONS: `${BASE_URL}/statics/specializations/`
  },
  consultations: {
    CONSULTATIONS: `${CONSULTATIONS_URL}/consultations/`,
    REVIEWS: `${CONSULTATIONS_URL}/reviews/`
  },
  appointment: {
    CREATE_APPOINTMENT: `${APPOINTMENT_URL}/patient-create-appointment/`,
    ACCEPT_APPOINYMENT: `${APPOINTMENT_URL}/doctor-accept-appointment/`,
    REJECT_APPOINYMENT: `${APPOINTMENT_URL}/doctor-reject-appointment/`,
    REQUEST_APPOINYMENT: `${APPOINTMENT_URL}/patient-request-appointment/`,
    CONFIRM_APPOINYMENT: `${APPOINTMENT_URL}/patient-confirm-appointment/`,
    CANCEL_APPOINYMENT: `${APPOINTMENT_URL}/patient-cancel-appointment/`,
    GET_APPOINYMENTS: `${APPOINTMENT_URL}/appointments/`
  },
  advice: {
    ADVICE: `${ADVICE_URL}/advices/`
  },
  social: {
    POSTS: `${POST_URL}/posts/`,
    COMMENTS: `${POST_URL}/comments/`
  }
};
