import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import {
  hgvdetailsValidator,
  hgvdetailsValidator_section1,
  hgvdetailsValidator_section2,
} from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/hgvDetails/Section1";
import Section2 from "./partials/hgvDetails/Section2";
import SideTabs from "./partials/hgvDetails/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
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

function HgvDetails(props) {
  useEffect(() => {
    if (getCookie("id")) {
      getData(getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const [activeSection, setActiveSection] = useState(1);
  const [stayHere, setStayHere] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [data, setData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    county: "",
    code: "",
    bank_name: "",
    bank_sort_code: "",
    bank_account_number: "",
  });

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  function loading(status) {
    setIsLoading(status);
  }

  // main methods
  function getData() {
    axios({
      method: "GET",
      url: URL + "WebHGV_Details",
    })
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data)
          setData({
            address_line1: res.data.details.address_line1,
            address_line2: res.data.details.address_line2,
            city: res.data.details.city,
            county: res.data.details.county,
            code: res.data.details.code,
            bank_name: res.data.details.bank_name,
            bank_sort_code: res.data.details.bank_sort_code,
            bank_account_number: res.data.details.bank_account_number,
          });
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
  const submit = () => {
    const isFormValid = hgvdetailsValidator(data);
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
    axios({
      method: "POST",
      url: URL + "WebHGV_DetailsUpdate",
      data: { ...data },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
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
              // window.location.href = "/app";
              history.push("/app");
            }, 3000);
          }
          toast.success("HGV Details Updated");
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="HGV Details"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to Update HGV Details"
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
                    isValid = hgvdetailsValidator_section1(data);
                  }
                  if (activeSection == 2) {
                    isValid = hgvdetailsValidator_section2(data);
                  }
                  if (typeof isValid !== "boolean") {
                    setErrors(isValid.errors);
                    return toast.warn(isValid[0]);
                  }
                  setActiveSection(value);
                }}
                submit={() => {
                  loading(true);
                  submit();
                }}
                stayHere={stayHere}
                onStayHere={handleStayHere}
                submitDisabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  errors={errors}
                  handleChange={handleChange}
                  next={() => {
                    let isValid = hgvdetailsValidator_section1(data);
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
                  previous={() => setActiveSection(1)}
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
      <ToastContainer />
    </div>
  );
}

export default withStyles(styles)(HgvDetails);
