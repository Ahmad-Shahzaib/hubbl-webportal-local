import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import { nullToEmptyValues } from "dan-api/constant";
import Section1 from "./partials/hirer/Section1";
import Section2 from "./partials/hirer/Section2";
import Section3 from "./partials/hirer/Section3";
import Section4 from "./partials/hirer/Section4";
import Section5 from "./partials/hirer/Section5";
import SideTabs from "./partials/hirer/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL, IMGURL, UPLOADURL, resolveUrl } from "dan-api/url";
import {
  hirerFormValidator,
  hirerFormValidator_section1,
  hirerFormValidator_section2,
  hirerFormValidator_section3,
  hirerFormValidator_section4,
} from "dan-api/validator";
import ImageLightbox from "react-image-lightbox";

function EditHirer(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [stayHere, setStayHere] = useState(true);
  const [viewURL, setViewURL] = useState("");

  const [viewImage, setViewImage] = useState(false);
  const [files, setFiles] = useState({
    profile_image: "",
    white_logo: "",
    dark_logo: "",
  });
  const [data, setData] = useState({
    company_re_name: "",
    company_trading_name: "",
    company_re_no: "",
    company_vat_no: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    town: "",
    county: "",
    post_code: "",
    website_address: "",
    person_name: "",
    email: "",
    phone_no1: "",
    phone_no2: "",
    sub_domain: "",
    flag: "",
    short_description: "",
    profile_image: "",
    is_portal: 1,
    portal_title: "",
    access_level: null,
    portal_description: "",
    white_logo: "",
    dark_logo: "",
    logo_width: "",
    logo_height: "",
    default_theme: null,
  });

  function loading(status) {
    setIsLoading(status);
  }

  const handleView = (property) => {
    let _url = files[property];

    _url = _url.includes("https") ? IMGURL + resolveUrl(_url) : IMGURL + _url;
    setViewURL(_url);
    setViewImage(true);
  };

  const handleChangeOrientation = (value) => {
    setData({
      ...data,
      logo_orientation: value,
    });
  };
  const handleIsPortal = () => {
    setData({
      ...data,
      is_portal: Number(data.is_portal) == 0 ? 1 : 0,
    });
  };

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleChangeDate = (name) => (event) => {
    if (event) {
      setData({
        ...data,
        [name]: moment(event._d).format("YYYY-MM-DD h:m:s"),
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleUpload = (name) => (value) => {
    setData((previous) => ({
      ...previous,
      [name]: value[0],
    }));
  };

  useEffect(() => {
    if (getCookie("id")) {
      getData(getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  // main methods

  function getData(id) {
    axios({
      method: "GET",
      url: URL + "getAgencyById" + "/" + id,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          let _data = {};
          let _files = {};
          for (const property in res.data.agency) {
            if (
              property !== "profile_image" &&
              property !== "white_logo" &&
              property !== "dark_logo"
            ) {
              _data = { ..._data, [property]: res.data.agency[property] };
            } else {
              _files = { ..._files, [property]: res.data.agency[property] };
            }
          }
          setData(nullToEmptyValues({ ...data, ..._data }));
          setFiles({ ...files, ..._files });
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  }
  function submit() {
    const isFormValid = hirerFormValidator(data);

    if (typeof isFormValid !== "boolean") {
      setErrors(isFormValid.errors);
      toast.warn(isFormValid.warnings[0]);
      if (isFormValid.warnings.length > 1) {
        toast.warning(
          "Total " + isFormValid.warnings.length + " warnings in form"
        );
      }
      loading(false);
      return;
    }
    // console.log(data);
    const formdata = new FormData();
    for (const property in data) {
      formdata.append(property, data[property]);
    }
    formdata.append("user_id", getCookie("agency_id"));

    axios({
      method: "POST",
      url: URL + "webUpdateHirer",
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-hirers";
              history.back();
            }, 1500);
          }
          toast.success(res.data.message);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  }

  const title = brand.name + " - Form";
  const description = brand.desc;

  return (
    <div>
      <ToastContainer />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {viewImage && (
        <ImageLightbox
          mainSrc={viewURL}
          onCloseRequest={() => setViewImage(false)}
        />
      )}
      <PapperBlock
        title="Update Hirer"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to update hirer profile"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={4} lg={4}>
              <SideTabs
                {...data}
                active={activeSection}
                handleIsPortal={handleIsPortal}
                handleClick={(value) => {
                  let isValid = true;
                  if (activeSection == 1) {
                    isValid = hirerFormValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = hirerFormValidator_section2(data);
                  }
                  if (activeSection == 3) {
                    isValid = hirerFormValidator_section3(data);
                  }
                  if (activeSection == 4) {
                    isValid = hirerFormValidator_section4(data);
                  }
                  if (typeof isValid !== "boolean") {
                    return setErrors(isValid.errors);
                    // return toast.warn(isValid[0]);
                  }
                  setActiveSection(value);
                }}
                submit={() => {
                  loading(true);
                  submit();
                }}
                submitDisabled={isLoading}
                stayHere={stayHere}
                onStayHere={() => setStayHere(!stayHere)}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  next={() => {
                    let isValid = hirerFormValidator_section1(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(2);
                  }}
                />
              )}
              {activeSection == 2 && (
                <Section2
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  previous={() => setActiveSection(1)}
                  next={() => {
                    let isValid = hirerFormValidator_section2(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(3);
                  }}
                />
              )}
              {activeSection == 3 && (
                <Section3
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  previous={() => setActiveSection(2)}
                  next={() => {
                    let isValid = hirerFormValidator_section3(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(4);
                  }}
                />
              )}
              {activeSection == 4 && (
                <Section4
                  {...data}
                  errors={errors}
                  files={files}
                  onViewImage={() => handleView("profile_image")}
                  handleChange={handleChange}
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(3)}
                  next={() => {
                    let isValid = hirerFormValidator_section4(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(5);
                  }}
                  submit={() => {
                    loading(true);
                    submit();
                  }}
                  submitDisabled={isLoading}
                />
              )}
              {data.is_portal == 1 && activeSection == 5 && (
                <Section5
                  {...data}
                  classes={props.classes}
                  errors={errors}
                  files={files}
                  handleChange={handleChange}
                  handleUpload={handleUpload}
                  handleView={handleView}
                  handleChangeOrientation={handleChangeOrientation}
                  previous={() => setActiveSection(4)}
                  submit={() => {
                    loading(true);
                    submit();
                  }}
                  submitDisabled={isLoading}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    </div>
  );
}

export default EditHirer;
