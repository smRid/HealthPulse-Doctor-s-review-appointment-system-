import axios from "axios";
import Cookies from "js-cookie";

export default async function postRequest(
  url,
  method = "POST",
  requestData = null,
  action
) {
  if (!url) return;

  try {
    const options = {
      method,
      url,
      headers: {
        Authorization: "JWT " + Cookies.get("accessToken")
      }
    };
    if (requestData) {
      options.data = requestData;
    }
    const response = await axios(options);
    return { error: false, data: response.data };
  } catch (err) {
    return { error: err.response.data.message, data: null };
  }
}
