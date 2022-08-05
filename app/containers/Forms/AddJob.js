import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import { getCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/job/Section1";
import Section2 from "./partials/job/Section2";
import Section3 from "./partials/job/Section3";
import Section4 from "./partials/job/Section4";
import Section5 from "./partials/job/Section5";
import SideTabs from "./partials/job/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "dan-api/url";
import axios from "axios";
import {
  jobValidator,
  jobValidator_section1,
  jobValidator_section2,
  jobValidator_section3,
  jobValidator_section4,
} from "dan-api/validator";
import moment from "moment";

function AddJob(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);
  const defaultDataConfig = {
    contact_person: "",
    phone_number: "",
    flag: "",
    hire_type: "",
    driver_class: "",
    hire_quantity: "",
    hirer_rate: "",
    hire_cost: "",
    start: "",
    start1: "",
    start2: "",
    start3: "",
    start_date: "",
    start_time: "",
    end: "",
    end1: "",
    end2: "",
    end3: "",
    short_description: "",
    long_description: "",
    additional_notes: "",

    //helper
    user_id: getCookie("user_id"),
    agency_id: getCookie("agency_id"),
  };
  const [data, setData] = useState(defaultDataConfig);

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
    setErrors({
      ...errors,
      [name]: "",
    });
    if (event) {
      setData({
        ...data,
        [name]: moment(event._d),
      });
    }
  };
  const handleUpload = (name) => (value) => {
    setData({
      ...data,
      [name]: value,
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

  function submit(status) {
    const isFormValid = jobValidator(data);

    if (status !== "Draft") {
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
    }
    // console.log(data);
    const formdata = new FormData();
    for (const property in data) {
      if (property == "hire_cost") {
        formdata.append(property, data.hire_quantity * data.hirer_rate);
      } else {
        formdata.append(property, data[property]);
      }
    }
    formdata.append("buttonCheck", status);

    axios({
      method: "POST",
      url: URL + "WebSTOREjob",
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setData(defaultDataConfig);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-jobs";
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
      <PapperBlock
        title="Add New Job"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to add new job"
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
                handleClick={(value) => {
                  let isValid = true;
                  if (activeSection == 1) {
                    isValid = jobValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = jobValidator_section2(data);
                  }
                  if (activeSection == 3) {
                    isValid = jobValidator_section3(data);
                  }
                  if (activeSection == 4) {
                    isValid = jobValidator_section4(data);
                  }
                  if (value > activeSection) {
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                  }
                  setActiveSection(value);
                }}
                submit={(status) => {
                  loading(true);
                  submit(status);
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
                  handleUpload={handleUpload}
                  next={() => {
                    let isValid = jobValidator_section1(data);
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
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(1)}
                  next={() => {
                    let isValid = jobValidator_section2(data);
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
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(2)}
                  next={() => {
                    let isValid = jobValidator_section3(data);
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
                  handleChange={handleChange}
                  previous={() => setActiveSection(3)}
                  next={() => {
                    let isValid = jobValidator_section4(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(5);
                  }}
                />
              )}
              {activeSection == 5 && (
                <Section5
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  previous={() => setActiveSection(4)}
                  submit={(status) => {
                    loading(true);
                    submit(status);
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

export default AddJob;
