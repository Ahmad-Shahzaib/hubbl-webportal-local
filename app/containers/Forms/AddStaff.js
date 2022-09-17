import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import {
  staffValidator,
  staffValidator_section1,
  staffValidator_section2,
  staffValidator_section3,
} from "dan-api/validator";
import { platformConfig } from "dan-api/platformConfig";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/staff/Section1";
import Section2 from "./partials/staff/Section2";
import Section3 from "./partials/staff/Section3";
import Section4 from "./partials/staff/Section4";
import SideTabs from "./partials/staff/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
  },
  buttonInit: {
    margin: 20,
    textAlign: "center",
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
});

function AddStaff(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);
  const defaultDataConfig = {
    first_name: "",
    last_name: "",
    email: "",
    home_address: "",
    phone_no: "",
    dob: "",
    images: "",
    sub_domain: platformConfig.domainTags[0],
    correspondence_address: "",
    national_insurance: "",
    emp_no: "",
    emp_start_date: "",
    emp_end_date: "",
    emp_type: "",
    personal_bank_name: "",
    bank_sort_code: "",
    bank_account_no: "",
    permissions: "",
    access_level: null,
    agency_id: getCookie("agency_id"),
    user_id: getCookie("user_id"),
  };
  const [data, setData] = useState(defaultDataConfig);

  const handleChangeAccess = (value) => {
    setData({
      ...data,
      access_level: value,
    });
  };
  const handleChangePerms = (name, checked, perms) => {
    let _perms = [];
    if (perms.includes(name)) {
      _perms = perms.filter((perm) => perm !== name);
      if (name.includes("all_")) {
        let postfix = name.split("_");
        _perms = perms.filter((perm) => !perm.includes(postfix[1]));
      } else if (name.includes("_all")) {
        let prefix = name.split("_");
        _perms = perms.filter((perm) => !perm.includes(prefix[0]));
      } else if (name == "all") {
        _perms = [];
      }
    } else {
      if (!perms.includes("all") && name.includes("_")) {
        perms.push(name);
        _perms = perms;
      } else if (name == "all") {
        perms.push(name);
        _perms = perms;
      }
    }
    setData({
      ...data,
      permissions: _perms.join(","),
    });
  };

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
    if (event.target.value) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  const handleChangeDate = (name) => (event) => {
    if (event) {
      setData({
        ...data,
        [name]: moment(event._d).format("YYYY-MM-DD h:m:s"),
      });
      setErrors({ ...errors, [name]: "" });
    }
  };
  const handleUpload = (name) => (value) => {
    setData((previous) => ({
      ...previous,
      [name]: value[0],
    }));
  };

  const resetupload = (name) => (value) => {
    setData((previous) => ({
      ...previous,
      [name]: value[0],
    }));
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
  const submit = () => {
    const isFormValid = staffValidator(data);
    if (typeof isFormValid !== "boolean") {
      setErrors(isFormValid.errors);
      // toast.warning(isFormValid.warnings[0]);
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
    axios({
      method: "POST",
      url: URL + "addStaff",
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setData(defaultDataConfig);
          resetupload();
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-staff";
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
  };

  const title = brand.name + " - Form";
  const description = brand.desc;
  const docSrc = "containers/Forms/demos/";
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
        title="Create New Staff Account"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to create a new user account with staff privilages"
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
                    isValid = staffValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = staffValidator_section2(data);
                  }
                  if (activeSection == 3) {
                    isValid = staffValidator_section3(data);
                  }
                  if (typeof isValid !== "boolean") {
                    return setErrors(isValid.errors);
                    // return toast.warn(isValid.warnings[0]);
                  }
                  setActiveSection(value);
                }}
                submit={() => {
                  loading(true);
                  submit();
                }}
                submitDisabled={isLoading}
                stayHere={stayHere}
                handleStayHere={() => setStayHere(!stayHere)}
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
                    let isValid = staffValidator_section1(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid.warnings[0]);
                    }
                    setActiveSection(2);
                  }}
                  isAddForm={true}
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
                    let isValid = staffValidator_section2(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid.warnings[0]);
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
                    let isValid = staffValidator_section3(data);
                    if (typeof isValid !== "boolean") {
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid.warnings[0]);
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
                  handleChangePerms={handleChangePerms}
                  handleChangeAccess={handleChangeAccess}
                  handleChangeDate={handleChangeDate}
                  previous={() => setActiveSection(3)}
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

export default withStyles(styles)(AddStaff);
