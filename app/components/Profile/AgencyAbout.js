import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { driverFormValidator } from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/agency/Section1";
import Section2 from "./partials/agency/Section2";
import Section3 from "./partials/agency/Section3";
import Section4 from "./partials/agency/Section4";
import SideTabs from "./partials/agency/SideTabs";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function AddDriver(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    company_trading_name: "",
    company_re_no: "",
    address_line1: "",
    address_line2: "",
    town: "",
    county: "",
    post_code: "",
    web_address: "",
    person_name: "",
    email: "",
    phone_no1: "",
    short_description: "",
    profile_image: "",
    business_image: "",
  });


  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };
  const handleChangeDate = (name) => (event) => {
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
      [name]: value[0],
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

  function submit() {
    // console.log(data);
    const isFormValid = driverFormValidator(data);
    if (typeof isFormValid !== "boolean") {
      toast.warn(isFormValid[0]);
      if (isFormValid.length > 1) {
        toast.warning("Total " + isFormValid.length + " warnings in form");
      }
      loading(false);
      return;
    }
    // console.log(data);
    const formdata = new FormData();
    for (const property in data) {
      formdata.append(property, data[property]);
    }
    formdata.append("user_id", getCookie("user_id"));

    axios({
      method: "POST",
      url:
        URL +
        "webUpdateProfile" +
        "/" +
        getCookie("user_id") +
        "/" +
        getCookie("userType"),
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
          toast.info("Redirecting");
          toast.success(res.data.message);
          setTimeout(() => {
            // window.location.href = "/app/all-drivers";
              history.back();
          }, 1500);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  }

  return (
    <div>
      <ToastContainer />
      <PapperBlock
        title="Update Profile"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to update your profile"
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
                handleClick={(value) => setActiveSection(value)}
                submit={() => {
                  loading(true);
                  submit();
                }}
                submitDisabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  next={() => setActiveSection(2)}
                />
              )}
              {activeSection == 2 && (
                <Section2
                  {...data}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  previous={() => setActiveSection(1)}
                  next={() => setActiveSection(3)}
                />
              )}
              {activeSection == 3 && (
                <Section3
                  {...data}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  previous={() => setActiveSection(2)}
                  next={() => setActiveSection(4)}
                />
              )}
              {activeSection == 4 && (
                <Section4
                  {...data}
                  handleChange={handleChange}
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(3)}
                  next={() => setActiveSection(5)}
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

export default AddDriver;
