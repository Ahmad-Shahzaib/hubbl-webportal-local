import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import moment from "moment";

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
  margin: {
    margin: 10,
  },
});

function Section2(props) {
  const {
    sub_domain,
    correspondence_address,
    national_insurance,
    emp_no,
    emp_start_date,
    emp_end_date,
    emp_type,
    handleChange,
    handleChangeDate,
    next,
    previous,
    errors,
  } = props;

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      justify="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Paper style={styles().root}>
          <Typography variant="h5" component="h3">
            Basic Information
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={sub_domain}
                    name="sub_domain"
                    placeholder="Sub Domain"
                    label="Sub Domain"
                    onChange={handleChange("sub_domain")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.sub_domain}
                </Typography>
              </Grid>
              <Grid md={8} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={correspondence_address}
                    name="correspondence_address"
                    placeholder="Correspondence Address"
                    label="Correspondence Address"
                    required
                    onChange={handleChange("correspondence_address")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.correspondence_address}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={national_insurance}
                    name="national_insurance"
                    placeholder="National Insurance"
                    label="National Insurance"
                    required
                    onChange={handleChange("national_insurance")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.national_insurance}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={emp_no}
                    name="emp_no"
                    placeholder="Employee Number"
                    label="Employee Number"
                    required
                    onChange={handleChange("emp_no")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.emp_no}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    label="Employee Start Date"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={emp_start_date ? moment(emp_start_date) : new Date()}
                    onChange={handleChangeDate("emp_start_date")}
                    animateYearScrolling={false}
                    required
                    style={{ width: "100%" }}
                  />
                </MuiPickersUtilsProvider>
                <Typography style={{ fontSize: 13, color: "red" }}>
                  {errors.emp_start_date}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    label="Employee End Date"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={
                      emp_end_date && emp_end_date !== "null"
                        ? moment(emp_end_date)
                        : new Date()
                    }
                    onChange={handleChangeDate("emp_end_date")}
                    animateYearScrolling={false}
                    style={{ width: "100%" }}
                    disablePast
                  />
                </MuiPickersUtilsProvider>
                <Typography style={{ fontSize: 13, color: "red" }}>
                  {errors.emp_end_date}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <FormControl variant="standard" style={styles().field}>
                    <InputLabel>Employee Type</InputLabel>
                    <Select
                      value={emp_type}
                      onChange={handleChange("emp_type")}
                      required
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Temporary">Temporary</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Permanent">Permanent</MenuItem>
                    </Select>
                    <Typography style={{ fontSize: 13, color: "red" }}>
                      {errors.emp_type}
                    </Typography>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={previous}
                style={styles().margin}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={next}
                style={styles().margin}
              >
                Next
              </Button>
              {/* <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={submit}
                    >
                      Submit
                    </Button> */}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section2);
