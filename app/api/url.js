import axios from "axios";
import { getCookie } from "dan-api/cookie";
import FormData from "form-data";

export const URL = "https://clownfish-app-nxbnq.ondigitalocean.app/";
export const STORAGEURL = "https://clownfish-app-nxbnq.ondigitalocean.app/";
export const IMAGEURL =
  "https://clownfish-app-nxbnq.ondigitalocean.app/public/images/";
// export const URL = "https://09d7-2400-adc7-913-4200-39b4-55f6-168-918.in.ngrok.io/";
// export const STORAGEURL = "https://09d7-2400-adc7-913-4200-39b4-55f6-168-918.in.ngrok.io/";
// export const IMAGEURL =
//   "https://09d7-2400-adc7-913-4200-39b4-55f6-168-918.in.ngrok.io/public/images/";
const ETHERSCANURL = "https://api.etherscan.io/api/";
const OWLRACLEURL = "https://owlracle.info/eth/";
const OPENSEAURL = "https://testnets-api.opensea.io/api/v1/";

export function resolveUrl(_url) {
  if (_url) {
    return _url.replace(/^.*[\\\/]/, "");
  }
  return "";
}

export function sendNotification(id, title, message = null) {
  let uri = URL + "sendNotification" + "/" + id + "/" + title;
  if (message) uri += "/" + message;
  axios({
    method: "GET",
    url: uri,
  })
    .then((res) => {})
    .catch((err) => {});
}

export async function login(data) {
  return axios({
    method: "POST",
    url: URL + "auth/login",
    data,
  });
}
