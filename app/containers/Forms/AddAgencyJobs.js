import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import { getCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/agencyJobs/Section1";
import Section2 from "./partials/agencyJobs/Section2";
import Section3 from "./partials/agencyJobs/Section3";
import Section4 from "./partials/agencyJobs/Section4";
import Section5 from "./partials/agencyJobs/Section5";
import SideTabs from "./partials/agencyJobs/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "dan-api/url";
import axios from "axios";
import {
  agencyJobValidator,
  agencyJobValidator_section1,
  agencyJobValidator_section2,
  agencyJobValidator_section3,
  agencyJobValidator_section4,
} from "dan-api/validator";
import moment from "moment";

function AddAgencyJobs(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({});
  const defaultDataConfig = {
    short_description: "",
    long_description: "",
    contact_person: "",
    phone_number: "",
    flag: "",
    driver_id: "",
    group_drivers: "",
    drivers_count: "",
    driver_class: "",
    hire_type: "",
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
    additional_notes: "",

    //helper
    user_id: getCookie("user_id"),
    agency_id: getCookie("agency_id"),
  };
  const [data, setData] = useState(defaultDataConfig);

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  const handleChange = (name) => (event) => {
    setErrors({
      ...errors,
      [name]: "",
    });
    if (name == "flag" && event.target.value !== "1") {
      setData({
        ...data,
        driver_id: "",
        group_drivers: "",
        [name]: event.target.value,
      });
    } else {
      setData({
        ...data,
        [name]: event.target.value,
      });
    }
  };
  const handleChangeMultiple = (name) => (event, values) => {
    setErrors({
      ...errors,
      [name]: "",
    });
    let group = [];
    if (values) {
      for (let i = 0; i < values.length; i++) {
        group.push(values[i].id);
      }
    }
    setData({
      ...data,
      [name]: group.join(","),
    });
  };
  const handleChangeSingle = (name) => (event, values) => {
    setErrors({
      ...errors,
      [name]: "",
    });
    setData({
      ...data,
      [name]: values.id,
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
        [name]: moment(event._d).format("YYYY-MM-DD h:m:s"),
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
      getData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }

  // main methods

  function getData() {
    axios({
      method: "GET",
      url: URL + "driversForJob" + "/" + getCookie("agency_id"),
    })
      .then((res) => {
        if (res.data.status == 200) {
          setDrivers(res.data.drivers);
        } else {
          toast.error("Something Went Wrong!");
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  }

  function submit(status) {
    const isFormValid = agencyJobValidator(data);
    if (status == "Publish") {
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
    formdata.append("check", "Assignments");
    formdata.append("buttonCheck", status);

    axios({
      method: "POST",
      url: URL + "STOREjob/rragency",
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
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-agency-jobs";
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
                    isValid = agencyJobValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = agencyJobValidator_section2(data);
                  }
                  if (activeSection == 3) {
                    isValid = agencyJobValidator_section3(data);
                  }
                  if (activeSection == 4) {
                    isValid = agencyJobValidator_section4(data);
                  }
                  if (typeof isValid !== "boolean") {
                    return setErrors(isValid.errors);
                    // return toast.warn(isValid[0]);
                  }
                  setActiveSection(value);
                }}
                submit={(status) => {
                  loading(true);
                  submit(status);
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
                    let isValid = agencyJobValidator_section1(data);
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
                  drivers={drivers}
                  handleChange={handleChange}
                  handleChangeSingle={handleChangeSingle}
                  handleChangeMultiple={handleChangeMultiple}
                  handleChangeDate={handleChangeDate}
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(1)}
                  next={() => {
                    let isValid = agencyJobValidator_section2(data);
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
                    let isValid = agencyJobValidator_section3(data);
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
                    let isValid = agencyJobValidator_section4(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid[0]);
                    }
                    setActiveSection(5);
                  }}
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

export default AddAgencyJobs;
