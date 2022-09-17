import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL, sendNotification } from "dan-api/url";
import { nullToEmptyValues } from "dan-api/constant";
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
import AlertDialog from "../UIElements/demos/DialogModal/AlertDialog";

function EditDriver(props) {
  const { viewMode, driverid } = props;
  const [activeSection, setActiveSection] = useState(1);
  const [stayHere, setStayHere] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const defaultDialog = {
    open: false,
    onClose: () => {},
    title: "",
    text: "",
    agreeBtnTitle: "",
    disagreeBtnTitle: "",
  };
  const [dialog, setDialog] = useState(defaultDialog);

  const [files, setFiles] = useState({
    passport: "",
    public_laibility_insurance: "",
    driving_license: "",
    driver_quilification_card: "",
    driver_card: "",
    driver_training_cirtificate: "",
    CEST: "",
    profile_image: "",
  });
  const [data, setData] = useState({
    otp_code: "",
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
  });

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  function loading(status) {
    setIsLoading(status);
  }

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
      // console.log(driverid);
      getData(viewMode ? driverid : getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  // main methods

  function removeAttachment(index = null, key, fileIndex = null) {
    let _id = getCookie("editDataId");
    const fileData = {
      driver_id: _id,
      key: key,
      fileIndex: fileIndex,
    };
    setDialog({
      open: true,
      title: "Confirmation!",
      text: "Are you sure to remove this file?",
      agreeBtnTitle: "Yes",
      disagreeBtnTitle: "No",
      onClose: ({ type }) => {
        setDialog(defaultDialog);
        if (type) {
          axios({
            method: "POST",
            data: fileData,
            url: URL + "webRemoveDriverFile",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: getCookie("token"),
            },
          })
            .then((res) => {
              if (res.data.status == 100) {
                toast.warn(res.data.message);
              } else {
                getData(_id);
              }
              loading(false);
            })
            .catch((e) => {
              loading(false);
              toast.error("Something Went Wrong!");
            });
        }
      },
    });
  }

  function getData(id) {
    // console.log(id);
    axios({
      method: "GET",
      url: URL + "getDriverByID" + "/" + id,
    })
      .then((res) => {
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          let _data = {};
          let _files = {};
          for (const property in res.data.driver) {
            if (
              property !== "passport" &&
              property !== "public_laibility_insurance" &&
              property !== "driving_license" &&
              property !== "driver_quilification_card" &&
              property !== "driver_card" &&
              property !== "driver_training_cirtificate" &&
              property !== "CEST" &&
              property !== "profile_image" &&
              property !== "vat" &&
              property !== "remittances"
            ) {
              _data = { ..._data, [property]: res.data.driver[property] };
            } else {
              _files = { ..._files, [property]: res.data.driver[property] };
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

  function updateDriver() {
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

    axios({
      method: "POST",
      url: URL + "updateDriver" + "/" + getCookie("editDataId"),
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
          sendNotification(
            getCookie("editDataId"),
            "Profile Updateed",
            "Your profile information is updated by the management"
          );

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
        title={viewMode ? "View Driver Profile" : "Update Driver Information"}
        icon="ion-ios-list-box-outline"
        desc={
          viewMode
            ? ""
            : "Fillout the required information below to update driver profile"
        }
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
                    isValid = driverFormValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = driverFormValidator_section2(data);
                  }
                  if (typeof isValid !== "boolean" && !viewMode) {
                    setErrors(isValid.errors);
                    return toast.warn(isValid[0]);
                  }
                  setActiveSection(value);
                }}
                data={files}
                submit={() => {
                  loading(true);
                  updateDriver();
                }}
                submitDisabled={isLoading}
                viewMode={viewMode}
                stayHere={stayHere}
                onStayHere={handleStayHere}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  errors={errors}
                  viewMode={viewMode}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  handleUpload={handleUpload}
                  isAddForm={false}
                  next={() => {
                    let isValid = driverFormValidator_section1(data);
                    if (typeof isValid !== "boolean" && !viewMode) {
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
                  viewMode={viewMode}
                  handleChange={handleChange}
                  handleChangeDate={handleChangeDate}
                  handleUpload={handleUpload}
                  previous={() => setActiveSection(1)}
                  next={() => {
                    let isValid = driverFormValidator_section2(data);
                    if (typeof isValid !== "boolean" && !viewMode) {
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
                  viewMode={viewMode}
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
                  viewMode={viewMode}
                  handleChange={handleChange}
                  previous={() => setActiveSection(3)}
                  next={() => setActiveSection(5)}
                />
              )}
              {activeSection == 5 && (
                <Section5
                  {...data}
                  viewMode={viewMode}
                  handleUpload={handleUpload}
                  handleCheckBox={handleCheckBox}
                  previous={() => setActiveSection(4)}
                  next={() => setActiveSection(6)}
                  removeAttachment={removeAttachment}
                  files={files}
                  isAddForm={false}
                />
              )}
              {activeSection == 6 && (
                <Section6
                  {...data}
                  viewMode={viewMode}
                  handleChange={handleChange}
                  previous={() => setActiveSection(5)}
                  submit={() => {
                    loading(true);
                    updateDriver();
                  }}
                  submitDisabled={isLoading}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
      <ToastContainer />
      <AlertDialog {...dialog} />
    </div>
  );
}

export default EditDriver;
