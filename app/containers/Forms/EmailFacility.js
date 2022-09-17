import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { emailValidator } from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { Wysiwyg } from "./demos";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

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

function EmailFacility(props) {
  const [emailData, setEmailData] = useState({
    drivers: [],
    hirers: [],
    all_drivers: "",
    all_hirers: "",
  });
  const defaultEmailConfig = {
    from: "",
    subject: "",
    text: "",
    to: "",
    email_method: "",
  };
  const [data, setData] = useState(defaultEmailConfig);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getCookie("id")) {
      getData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const loading = (status) => {
    setIsLoading(status);
  };

  const handleChange = (name) => (event) => {
    let to = "";
    if (name == "email_method") {
      if (event.target.value == "hirers") {
        to = emailData.all_hirers;
      }
      if (event.target.value == "drivers") {
        to = emailData.all_drivers;
      }
      if (event.target.value == "all") {
        to = emailData.all_drivers + "," + emailData.all_hirers;
      }
      setData({
        ...data,
        to: to,
        [name]: event.target.value,
      });
    } else {
      setData({
        ...data,
        [name]: event.target.value,
      });
    }
  };

  const handleChangeText = (event) => {
    // console.log("event", event);
    setData({
      ...data,
      text: event,
    });
  };

  const handleChangeSingle = (name) => (event, values) => {
    setData({
      ...data,
      [name]: values.email,
    });
  };

  function getData() {
    axios({
      method: "GET",
      url: URL + "getEmailData",
    })
      .then((res) => {
        // console.log(res)
        if (res.data.status == 100) {
          return toast.warn(res.data.message);
        } else {
          let driver_email = [];
          for (let i = 0; i < res.data.drivers.length; i++) {
            driver_email.push(res.data.drivers[i].email);
          }
          let hirer_email = [];
          for (let i = 0; i < res.data.hirers.length; i++) {
            hirer_email.push(res.data.hirers[i].email);
          }
          setEmailData({
            ...res.data,
            all_drivers: driver_email.join(","),
            all_hirers: hirer_email.join(","),
          });
        }
      })
      .catch((e) => {
        toast.error("Something Went Wrong!");
      });
  }

  const submit = () => {
    const isValid = emailValidator(data);
    if (typeof isValid == "string") {
      loading(false);
      return toast.warn(isValid);
    }
    axios({
      method: "POST",
      url: URL + "WebSendEmailSubmit",
      data: data,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        loading(false);
        setData(defaultEmailConfig);
        // console.log(res)
        if (res.data.status == 100) {
          return toast.warn(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  };

  const title = brand.name + " - Form";
  const description = brand.desc;
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Email Facility"
        icon="ion-ios-list-box-outline"
        desc="Fillout the form below to send email"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={12} lg={10}>
              <Paper style={styles().root}>
                <Typography variant="h5" component="h3">
                  Email Details
                </Typography>
                <form onSubmit={() => {}}>
                  <Grid md={12} container spacing={2} item>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.from}
                          name="from"
                          placeholder="From"
                          label="From"
                          onChange={handleChange("from")}
                          required
                          style={styles().field}
                        />
                      </div>
                    </Grid>

                    <Grid md={6} sm={12} xs={12} item>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <InputLabel>Select Sender Group</InputLabel>
                        <Select onChange={handleChange("email_method")}>
                          <MenuItem value="">
                            <em>Select a option</em>
                          </MenuItem>
                          <MenuItem value={"all"}>
                            All Drivers & Hirers
                          </MenuItem>
                          <MenuItem value={"drivers"}>
                            Select All Drivers
                          </MenuItem>
                          <MenuItem value={"hirers"}>
                            Select All Hirers
                          </MenuItem>
                          <MenuItem value={"hirer"}>
                            Select Hirer Emails
                          </MenuItem>
                          <MenuItem value={"driver"}>
                            Select Driver Emails
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {data.email_method == "driver" ? (
                      <Grid md={6} sm={6} xs={12} item>
                        <FormControl
                          variant="standard"
                          style={{ width: "100%" }}
                        >
                          <Autocomplete
                            options={emailData.drivers}
                            getOptionLabel={(option) =>
                              option.id +
                              " " +
                              option.first_name +
                              " " +
                              option.last_name +
                              " " +
                              option.email
                            }
                            onChange={handleChangeSingle("to")}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                label="Select Driver Email"
                                placeholder="Search..."
                                style={{ height: 65 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                    ) : null}
                    {data.email_method == "hirer" ? (
                      <Grid md={6} sm={6} xs={12} item>
                        <FormControl
                          variant="standard"
                          style={{ width: "100%" }}
                        >
                          <Autocomplete
                            options={emailData.hirers}
                            getOptionLabel={(option) =>
                              option.id +
                              " " +
                              option.company_trading_name +
                              " " +
                              option.email
                            }
                            onChange={handleChangeSingle("to")}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                label="Select Agency Email"
                                placeholder="Search..."
                                style={{ height: 65 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                    ) : null}

                    <Grid
                      md={
                        data.email_method == "driver" ||
                        data.email_method == "hirer"
                          ? 6
                          : 12
                      }
                      sm={12}
                      xs={12}
                      item
                    >
                      <div>
                        <TextField
                          value={data.to}
                          name="To"
                          placeholder="Seperate Emails with a comma"
                          label="To"
                          required
                          onChange={handleChange("to")}
                          style={styles().field}
                        />
                      </div>
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.subject}
                          name="subject"
                          placeholder="Subject"
                          label="Subject"
                          required
                          onChange={handleChange("subject")}
                          style={styles().field}
                        />
                      </div>
                    </Grid>
                    <Grid
                      md={12}
                      sm={12}
                      xs={12}
                      item
                      style={{ marginBottom: 20 }}
                    >
                      <div>
                        <Wysiwyg
                          onChange={handleChangeText}
                          value={data.text}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={submit}
                    >
                      Preview Email
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => {
                        loading(true);
                        submit();
                      }}
                      style={{ marginLeft: 10 }}
                      disabled={isLoading}
                    >
                      Send Emails
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
      {isLoading ? (
        <div
          style={{
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
            }}
          >
            <Dots color="white" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(EmailFacility);
