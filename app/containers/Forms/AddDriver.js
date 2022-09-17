import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import {
  driverFormValidator,
  driverFormValidator_section1,
  driverFormValidator_section2,
} from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/driver/Section1";
import Section2 from "./partials/driver/Section2";
import Section3 from "./partials/driver/Section3";
import Section4 from "./partials/driver/Section4";
import Section5 from "./partials/driver/Section5";
import Section6 from "./partials/driver/Section6";
import SideTabs from "./partials/driver/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function AddDriver(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [stayHere, setStayHere] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const defaultDataConfig = {
    driver_code: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    address_line1: "",
    address_line2: "",
    address_line3: "1",
    town: "",
    county: "",
    post_code: "",
    company_registeration_number: "",
    license_number: "",
    proposed_com_name: "",
    vat_flag: "",
    vat_reg_no: "",
    national_insurance_no: "",
    town_birth: "",
    mother_maiden_name: "",
    personal_bank_name: "",
    bank_sort_code: "",
    bank_account_no: "",
    dob: "",
    LTD: "N/A",
    PLI: "N/A",
    BBA: "N/A",
    MCB: "N/A",
    TFT: "N/A",
    TC: "N/A",
    CPC: "N/A",
    eDavis: "N/A",
    TM: "N/A",
    passport: "",
    public_laibility_insurance: "",
    driving_license: "",
    driver_quilification_card: "",
    driver_card: "",
    driver_training_cirtificate: "",
    CEST: "",
    profile_image: "",
    vat: "",
    remittances: "",
    passport_check: "",
    public_laibility_insurance_check: "",
    driving_license_check: "",
    driver_quilification_card_check: "",
    driver_card_check: "",
    driver_training_cirtificate_check: "",
    CEST_check: "",
    vat_check: "",
    remittances_check: "",
    hear_about_us: "",
    driving_experience: "",
    referred_by: "",
  };
  const [data, setData] = useState(defaultDataConfig);

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  const handleChange = (name) => (event) => {
    if (name == "vat_flag") {
      if (event.target.value == "No" || event.target.value == "no") {
        setData({
          ...data,
          [name]: event.target.value,
          vat_reg_no: "",
        });
      } else {
        setData({
          ...data,
          [name]: event.target.value,
        });
      }
    } else {
      if (event.target.value) {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
      setData({
        ...data,
        [name]: event.target.value,
      });
    }
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
    setData((pre) => {
      return {
        ...pre,
        [name]: value[0],
      };
    });
  };
  const handleCheckBox = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }

  // main methods

  function addDriver() {
    // console.log(data);
    const isFormValid = driverFormValidator(data);
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
    formdata.append(
      "updated_by",
      getCookie("id") + ":" + getCookie("userType")
    );
    formdata.append("user_id", getCookie("user_id"));
    formdata.append("agency_id", getCookie("agency_id"));

    axios({
      method: "POST",
      url: URL + "addNewDriver",
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setData(defaultDataConfig);
          setActiveSection(1);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-drivers";
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Create New Driver Account"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to create a new driver account"
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
                active={activeSection}
                errors={errors}
                handleClick={(value) => {
                  let isValid = true;
                  if (activeSection == 1) {
                    isValid = driverFormValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = driverFormValidator_section2(data);
                  }
                  if (typeof isValid !== "boolean") {
                    setErrors(isValid.errors);
                    return toast.warn(isValid[0]);
                  }
                  setActiveSection(value);
                }}
                submit={() => {
                  loading(true);
                  addDriver();
                }}
                submitDisabled={isLoading}
                stayHere={stayHere}
                onStayHere={handleStayHere}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  handleUpload={handleUpload}
                  next={() => {
                    console.log(getCookie("agency_id"));
                    let isValid = driverFormValidator_section1(data);
                    if (typeof isValid !== "boolean") {
                      setErrors(isValid.errors);
                      return toast.warn(isValid[0]);
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
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(1)}
                  next={() => {
                    let isValid = driverFormValidator_section2(data);
                    if (typeof isValid !== "boolean") {
                      setErrors(isValid.errors);
                      return toast.warn(isValid[0]);
                    }
                    setActiveSection(3);
                  }}
                />
              )}
              {activeSection == 3 && (
                <Section3
                  {...data}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(2)}
                  next={() => setActiveSection(4)}
                />
              )}
              {activeSection == 4 && (
                <Section4
                  {...data}
                  handleChange={handleChange}
                  previous={() => setActiveSection(3)}
                  next={() => setActiveSection(5)}
                />
              )}
              {activeSection == 5 && (
                <Section5
                  {...data}
                  handleUpload={handleUpload}
                  handleCheckBox={handleCheckBox}
                  previous={() => setActiveSection(4)}
                  next={() => setActiveSection(6)}
                  isAddForm={true}
                />
              )}
              {activeSection == 6 && (
                <Section6
                  {...data}
                  handleChange={handleChange}
                  previous={() => setActiveSection(5)}
                  submit={() => {
                    loading(true);
                    addDriver();
                  }}
                  // >>>
                  submitDisabled={isLoading}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
      <ToastContainer />
    </div>
  );
}

export default AddDriver;
