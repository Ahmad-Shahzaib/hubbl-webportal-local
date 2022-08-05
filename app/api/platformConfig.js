import moment from "moment";
import logo from "dan-images/logo/logo.png";
import logowhite from "dan-images/logo/logo_white.png";
import { getCookie } from "dan-api/cookie";

export const platformConfig = {
  // HGV
  name: getCookie("portal_title") || "Hubbl",
  desc: getCookie("portal_description") || "Hubbl",
  prefix: getCookie("access_level") || "hubbl",
  footerText: "Hubbl - All Rights Reserved " + moment().format("YYYY"),
  // theme: getCookie("default_theme") || "blueCyanTheme",
  theme: "blueCyanTheme",
  black_logo: getCookie("dark_logo") || logo,
  white_logo: getCookie("white_logo") || logowhite,
  logoText: getCookie("portal_title") || "Hubbl",
  logoStyle: {
    width: getCookie("logo_width") ? Number(getCookie("logo_width")) : 80,
    height: getCookie("logo_height") ? Number(getCookie("logo_height")) : 30,
  },
  loginLogoStyle: {
    width: getCookie("logo_width") ? Number(getCookie("logo_width")) : "15%",
    height: getCookie("logo_height") ? Number(getCookie("logo_height")) : 25,
    cursor: "pointer",
  },
  domainTags: [],
};
