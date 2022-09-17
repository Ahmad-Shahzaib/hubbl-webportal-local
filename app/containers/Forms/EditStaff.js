import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormData from "form-data";
import { getCookie } from "dan-api/cookie";
import { URL, IMGURL, resolveUrl } from "dan-api/url";
import { nullToEmptyValues } from "dan-api/constant";
import {
  staffValidator,
  staffValidator_section1,
  staffValidator_section2,
  staffValidator_section3,
} from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import ImageLightbox from "react-image-lightbox";
import Section1 from "./partials/staff/Section1";
import Section2 from "./partials/staff/Section2";
import Section3 from "./partials/staff/Section3";
import Section4 from "./partials/staff/Section4";
import SideTabs from "./partials/staff/SideTabs";
import "react-toastify/dist/ReactToastify.css";

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
  const [viewImage, setViewImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [activeSection, setActiveSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [stayHere, setStayHere] = useState(true);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    home_address: "",
    phone_no: "",
    dob: "",
    images: "",
    sub_domain: "",
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
    access_level: "",
    agency_id: getCookie("agency_id"),
    user_id: getCookie("user_id"),
  });

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
        [name]: event._d,
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

  useEffect(() => {
    if (getCookie("id")) {
      getData(getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }

  // main methods
  function getData(id) {
    axios({
      method: "GET",
      url: URL + "getStaffById/" + id,
    })
      .then((res) => {
        if (res.data.status == 200) {
          const staff = res.data.staff;
          setData(
            nullToEmptyValues({
              first_name: staff.first_name,
              last_name: staff.last_name,
              email: staff.email,
              home_address: staff.home_address,
              phone_no: staff.phone_no,
              dob: staff.dob,
              sub_domain: staff.sub_domain,
              correspondence_address: staff.corresp_address,
              national_insurance: staff.national_insurance_no,
              emp_no: staff.emp_no,
              emp_start_date: staff.emp_start_date,
              emp_end_date: staff.emp_end_date,
              emp_type: staff.emp_type,
              personal_bank_name: staff.personal_bank_name,
              bank_sort_code: staff.bank_sort_code,
              bank_account_no: staff.bank_account_no,
              permissions: staff.permissions,
              access_level: staff.access_level,
              agency_id: staff.agency_id,
              user_id: staff.user_id,
              images: "",
            })
          );
          setProfileImage(staff.profile_image);
        } else {
          toast.warn("Unable to fetch data from Server. Something Went Wrong");
        }
        loading(false);
      })
      .catch((err) => {
        loading(false);
        console.log(err);
        toast.error("Server Error!");
      });
  }
  const submit = () => {
    const isFormValid = staffValidator(data);
    if (typeof isFormValid !== "boolean") {
      setErrors(isFormValid.errors);
      toast.warning(isFormValid.warnings[0]);
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
      url: URL + "updateStaff/" + getCookie("editDataId"),
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
      {viewImage && (
        <ImageLightbox
          mainSrc={
            profileImage.includes("https")
              ? IMGURL + resolveUrl(profileImage)
              : IMGURL + profileImage
          }
          onCloseRequest={() => setViewImage(false)}
        />
      )}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Update Staff Account"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to update the staff account details"
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
                  onViewImage={() => setViewImage(true)}
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
                      console.log(isValid);
                      return setErrors(isValid.errors);
                      // return toast.warn(isValid.warnings[0]);
                    }
                    setActiveSection(4);
                  }}
                  submitDisabled={isLoading}
                />
              )}
              {activeSection == 4 && (
                <Section4
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  handleChangePerms={handleChangePerms}
                  handleChangeDate={handleChangeDate}
                  handleChangeAccess={handleChangeAccess}
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
