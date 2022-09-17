import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import {
  timesheetvalidator,
  timesheetvalidator_section1,
  timesheetvalidator_section2,
  timesheetvalidator_section3,
  timesheetvalidator_section4,
  timesheetvalidator_section5,
  timesheetvalidator_section6,
  timesheetvalidator_section7,
} from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import Section1 from "./partials/timesheet/Section1";
import Section2 from "./partials/timesheet/Section2";
import Section3 from "./partials/timesheet/Section3";
import Section4 from "./partials/timesheet/Section4";
import Section5 from "./partials/timesheet/Section5";
import Section6 from "./partials/timesheet/Section6";
import Section7 from "./partials/timesheet/Section7";
import SideTabs from "./partials/timesheet/SideTabs";
import { Dots } from "react-activity";
import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

function EditTimesheet(props) {
  const { viewMode, timesheetId } = props;
  const [activeSection, setActiveSection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [stayHere, setStayHere] = useState(true);
  const [data, setData] = useState({
    id: "",
    agency_id: "",
    agency_name: "",
    driver_id: "",
    invoice_type: "",
    week: "",
    invoice_ref: "",
    work_service: "",
    expenses: "",
    attachment: "",
    day1_units: "",
    day1_unit_type: "",
    day1_unit_rate: "",
    day1_total: "",
    day1_start_time_hours: "",
    day1_start_time_mins: "",
    day1_finish_time_hours: "",
    day1_finish_time_mins: "",
    day1_break_time_hours: "",
    day1_break_time_mins: "",
    day1_shift: "",
    day1_payable_amount: "",
    day2_units: "",
    day2_unit_type: "",
    day2_unit_rate: "",
    day2_total: "",
    day2_start_time_hours: "",
    day2_start_time_mins: "",
    day2_finish_time_hours: "",
    day2_finish_time_mins: "",
    day2_break_time_hours: "",
    day2_break_time_mins: "",
    day2_shift: "",
    day2_payable_amount: "",
    day3_units: "",
    day3_unit_type: "",
    day3_unit_rate: "",
    day3_total: "",
    day3_start_time_hours: "",
    day3_start_time_mins: "",
    day3_finish_time_hours: "",
    day3_finish_time_mins: "",
    day3_break_time_hours: "",
    day3_break_time_mins: "",
    day3_shift: "",
    day3_payable_amount: "",
    day4_units: "",
    day4_unit_type: "",
    day4_unit_rate: "",
    day4_total: "",
    day4_start_time_hours: "",
    day4_start_time_mins: "",
    day4_finish_time_hours: "",
    day4_finish_time_mins: "",
    day4_break_time_hours: "",
    day4_break_time_mins: "",
    day4_shift: "",
    day4_payable_amount: "",
    day5_units: "",
    day5_unit_type: "",
    day5_unit_rate: "",
    day5_total: "",
    day5_start_time_hours: "",
    day5_start_time_mins: "",
    day5_finish_time_hours: "",
    day5_finish_time_mins: "",
    day5_break_time_hours: "",
    day5_break_time_mins: "",
    day5_shift: "",
    day5_payable_amount: "",
    day6_units: "",
    day6_unit_type: "",
    day6_unit_rate: "",
    day6_total: "",
    day6_start_time_hours: "",
    day6_start_time_mins: "",
    day6_finish_time_hours: "",
    day6_finish_time_mins: "",
    day6_break_time_hours: "",
    day6_break_time_mins: "",
    day6_shift: "",
    day6_payable_amount: "",
    day7_units: "",
    day7_unit_type: "",
    day7_unit_rate: "",
    day7_total: "",
    day7_start_time_hours: "",
    day7_start_time_mins: "",
    day7_finish_time_hours: "",
    day7_finish_time_mins: "",
    day7_break_time_hours: "",
    day7_break_time_mins: "",
    day7_shift: "",
    day7_payable_amount: "",
    vehicle_reg_no: "",
    client: ",,,,,,",
    depot: ",,,,,,",
    week_total: "",
    status: "",
    is_invoiced: "",
  });

  const dayLabels = new Array(7).fill(null).map((_, i) => {
    let title = "";
    if (data.week.includes("Sunday")) {
      title =
        i == 0
          ? "Sunday"
          : i == 1
          ? "Monday"
          : i == 2
          ? "Tuesday"
          : i == 3
          ? "Wednesday"
          : i == 4
          ? "Thursday"
          : i == 5
          ? "Friday"
          : "Saturday";
    } else {
      title =
        i == 0
          ? moment(data.week).format("dddd")
          : moment(data.week)
              .add(i, "day")
              .format("dddd");
    }
    return title;
  });

  function loading(status) {
    setIsLoading(status);
  }

  function formLoading(status) {
    setIsFormLoading(status);
  }

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  const handleChangeCD = (key, index, forms, value) => {
    forms[index] = value;

    setData({
      ...data,
      [key]: forms.join(","),
    });
  };
  const handleChange = (
    key,
    pointer,
    index,
    forms,
    value,
    saveWithValues = true
  ) => {
    if (saveWithValues) {
      forms[index][pointer] = value;
      forms[index]["total"] =
        Number(forms[index]["unit"]) * Number(forms[index]["rate"]);
    }

    let unit_key = "day" + key + "_units";
    let rate_key = "day" + key + "_unit_rate";
    let type_key = "day" + key + "_unit_type";
    let total_key = "day" + key + "_total";
    let start_hours_key = "day" + key + "_start_time_hours";
    let start_mins_key = "day" + key + "_start_time_mins";
    let finish_hours_key = "day" + key + "_finish_time_hours";
    let finish_mins_key = "day" + key + "_finish_time_mins";
    let break_hours_key = "day" + key + "_break_time_hours";
    let break_mins_key = "day" + key + "_break_time_mins";
    let shift_key = "day" + key + "_shift";
    let payable_amount_key = "day" + key + "_payable_amount";
    let totals = [];
    let units = [];
    let rates = [];
    let types = [];
    let start_hours = [];
    let start_mins = [];
    let finish_hours = [];
    let finish_mins = [];
    let break_hours = [];
    let break_mins = [];
    let shifts = [];
    let payable_amounts = [];

    if (saveWithValues && forms[index]["type"] == "Not Worked") {
      forms[index]["unit"] = 0;
      forms[index]["rate"] = 0;
      forms[index]["total"] = 0;
      forms[index]["start_hours"] = "";
      forms[index]["start_mins"] = "";
      forms[index]["finish_hours"] = "";
      forms[index]["finish_mins"] = "";
      forms[index]["break_hours"] = "";
      forms[index]["break_mins"] = "";
      forms[index]["shift"] = "";
      forms[index]["payable_amount"] = 0;
      for (let i = 0; i < forms.length; i++) {
        types.push(forms[i]["type"]);
        units.push(forms[i]["unit"]);
        rates.push(forms[i]["rate"]);
        start_hours.push(forms[i]["start_hours"]);
        start_mins.push(forms[i]["start_mins"]);
        finish_hours.push(forms[i]["finish_hours"]);
        finish_mins.push(forms[i]["finish_mins"]);
        break_hours.push(forms[i]["break_hours"]);
        break_mins.push(forms[i]["break_mins"]);
        shifts.push(forms[i]["shift"]);
        payable_amounts.push(forms[i]["payable_amount"]);
      }
    } else {
      for (let i = 0; i < forms.length; i++) {
        types.push(forms[i]["type"]);
        units.push(forms[i]["unit"]);
        rates.push(forms[i]["rate"]);
        totals.push(forms[i]["total"]);
        start_hours.push(forms[i]["start_hours"]);
        start_mins.push(forms[i]["start_mins"]);
        finish_hours.push(forms[i]["finish_hours"]);
        finish_mins.push(forms[i]["finish_mins"]);
        break_hours.push(forms[i]["break_hours"]);
        break_mins.push(forms[i]["break_mins"]);
        shifts.push(forms[i]["shift"]);
        payable_amounts.push(forms[i]["payable_amount"]);
      }
    }
    setData({
      ...data,
      [type_key]: types.join(","),
      [total_key]: totals.join(","),
      [unit_key]: units.join(","),
      [rate_key]: rates.join(","),
      [start_hours_key]: start_hours.join(","),
      [start_mins_key]: start_mins.join(","),
      [finish_hours_key]: finish_hours.join(","),
      [finish_mins_key]: finish_mins.join(","),
      [break_hours_key]: break_hours.join(","),
      [break_mins_key]: break_mins.join(","),
      [shift_key]: shifts.join(","),
      [payable_amount_key]: payable_amounts.join(","),
    });
  };

  useEffect(() => {
    if (getCookie("id")) {
      if (viewMode) {
        getData(timesheetId);
      } else {
        getData(getCookie("editDataId"));
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  // main methods
  function getData(id) {
    let url = URL + "getTimesheetById/" + id;
    if (viewMode) {
      url += "/yes";
    }
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          setData({ ...data, ...res.data.timesheet });
        } else {
          toast.warn(res.data.message);
        }
        formLoading(false);
        loading(false);
      })
      .catch((err) => {
        loading(false);
        toast.error("Server Error!");
      });
  }

  const submit = () => {
    let type = 1;
    if (
      data.invoice_type == "Agency Self-Bill" ||
      data.invoice_type == "Invoice managed by the Driver"
    ) {
      type = 0;
    }
    const isValid = timesheetvalidator(data, type, true, dayLabels);
    if (typeof isValid == "string") {
      loading(false);
      return toast.warn(isValid);
    }
    axios({
      method: "POST",
      url: URL + "webUpdateTimesheet",
      data: {
        ...data,
        updated_by: getCookie("id") + ":" + getCookie("userType"),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
              // window.location.href = "/app/" + getCookie("redirect");
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
        title={viewMode ? "View Timesheet" : "Update Timesheet"}
        icon="ion-ios-list-box-outline"
        desc={
          viewMode
            ? ""
            : "Fillout the required information below to update the timesheet"
        }
        rightText={true}
        rightTitle={
          data.agency_name
            ? "Submitted to - " + data.agency_name + " for " + data.week
            : isFormLoading
            ? ""
            : "No Agency Name"
        }
        rightDesc={
          data.driver_name
            ? "Submitted by - " + data.driver_name + " for " + data.invoice_type
            : isFormLoading
            ? ""
            : "No Driver Name"
        }
      >
        {data.invoice_type == "Agency Self-Bill" ||
        data.invoice_type == "Invoice managed by the Driver" ||
        isFormLoading ? (
          <div>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={10} lg={8}>
                {isFormLoading ? (
                  <Paper style={styles().root}>
                    <Grid container direction="row" justify="center">
                      <Dots />
                    </Grid>
                  </Paper>
                ) : (
                  <Paper style={styles().root}>
                    <Grid md={12} container spacing={2} item>
                      <Grid md={6} sm={12} xs={12} item>
                        <div>
                          <TextField
                            value={data.work_service}
                            name="work_service_amount"
                            placeholder="Work Service Amount"
                            label="Work Service Amount"
                            disabled={viewMode}
                            type="number"
                            onChange={(e) => {
                              setData({
                                ...data,
                                work_service: e.target.value,
                              });
                            }}
                            required
                            style={styles().field}
                          />
                        </div>
                      </Grid>
                      <Grid md={6} sm={12} xs={12} item>
                        <div>
                          <TextField
                            value={data.expenses}
                            name="expenses"
                            placeholder="Expense Amount"
                            label="Expense Amount"
                            disabled={viewMode}
                            type="number"
                            onChange={(e) => {
                              setData({
                                ...data,
                                expenses: e.target.value,
                              });
                            }}
                            required
                            style={styles().field}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    {!viewMode ? (
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={() => {
                            loading(true);
                            submit();
                          }}
                          disabled={isLoading}
                        >
                          Submit
                        </Button>
                        <FormControlLabel
                          control={
                            <Switch
                              value="checkedD"
                              checked={stayHere ? true : false}
                              onChange={() => setStayHere(!stayHere)}
                              color="primary"
                            />
                          }
                          label="Stay on this page"
                          style={{ marginLeft: 10 }}
                        />
                      </div>
                    ) : null}
                  </Paper>
                )}
              </Grid>
            </Grid>
          </div>
        ) : (
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
                    if (!viewMode) {
                      if (activeSection == 1) {
                        isValid = timesheetvalidator_section1(data, 1, true, [
                          dayLabels[0],
                        ]);
                      }
                      if (activeSection == 2) {
                        isValid = timesheetvalidator_section2(data, 1, true, [
                          dayLabels[1],
                        ]);
                      }
                      if (activeSection == 3) {
                        isValid = timesheetvalidator_section3(data, 1, true, [
                          dayLabels[2],
                        ]);
                      }
                      if (activeSection == 4) {
                        isValid = timesheetvalidator_section4(data, 1, true, [
                          dayLabels[3],
                        ]);
                      }
                      if (activeSection == 5) {
                        isValid = timesheetvalidator_section5(data, 1, true, [
                          dayLabels[4],
                        ]);
                      }
                      if (activeSection == 6) {
                        isValid = timesheetvalidator_section6(data, 1, true, [
                          dayLabels[5],
                        ]);
                      }
                      if (activeSection == 7) {
                        isValid = timesheetvalidator_section7(data, 1, true, [
                          dayLabels[6],
                        ]);
                      }
                    }
                    if (typeof isValid !== "boolean") {
                      return toast.warn(isValid);
                    }
                    setActiveSection(value);
                  }}
                  submit={() => {
                    loading(true);
                    submit();
                  }}
                  labels={dayLabels}
                  viewMode={viewMode}
                  submitDisabled={isLoading}
                  stayHere={stayHere}
                  onStayHere={handleStayHere}
                />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                {activeSection == 1 && (
                  <Section1
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[0]}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section1(
                          data,
                          1,
                          true,
                          [dayLabels[0]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(2);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 2 && (
                  <Section2
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[1]}
                    previous={() => setActiveSection(1)}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section2(
                          data,
                          1,
                          true,
                          [dayLabels[1]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(3);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 3 && (
                  <Section3
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[2]}
                    previous={() => setActiveSection(2)}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section3(
                          data,
                          1,
                          true,
                          [dayLabels[2]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(4);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 4 && (
                  <Section4
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[3]}
                    previous={() => setActiveSection(3)}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section4(
                          data,
                          1,
                          true,
                          [dayLabels[3]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(5);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 5 && (
                  <Section5
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[4]}
                    previous={() => setActiveSection(4)}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section5(
                          data,
                          1,
                          true,
                          [dayLabels[4]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(6);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 6 && (
                  <Section6
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[5]}
                    previous={() => setActiveSection(5)}
                    next={() => {
                      if (!viewMode) {
                        let isValid = timesheetvalidator_section6(
                          data,
                          1,
                          true,
                          [dayLabels[5]]
                        );
                        if (typeof isValid !== "boolean") {
                          return toast.warn(isValid);
                        }
                      }
                      setActiveSection(7);
                    }}
                    viewMode={viewMode}
                  />
                )}
                {activeSection == 7 && (
                  <Section7
                    {...data}
                    handleChange={handleChange}
                    handleChangeCD={handleChangeCD}
                    label={dayLabels[6]}
                    previous={() => setActiveSection(6)}
                    submit={() => {
                      loading(true);
                      submit();
                    }}
                    viewMode={viewMode}
                    submitDisabled={isLoading}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </PapperBlock>
      <ToastContainer />
    </div>
  );
}

export default withStyles(styles)(EditTimesheet);
