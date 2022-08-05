import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

function Section1(props) {
  const {
    otp_code,
    driver_code,
    first_name,
    last_name,
    phone_no,
    email,
    address_line1,
    address_line2,
    town,
    county,
    post_code,
    company_registeration_number,
    license_number,
    proposed_com_name,
    vat_flag,
    vat_reg_no,
    national_insurance_no,
    town_birth,
    mother_maiden_name,
    dob,
    handleChange,
    handleChangeDate,
    next,
    viewMode,
    errors,
    isAddForm,
  } = props;

  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

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
            Personal Information
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={isAddForm == false ? 6 : 12} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={driver_code}
                    name="driver_code"
                    placeholder="Driver Code"
                    label="Driver Code"
                    onChange={handleChange("driver_code")}
                    required
                    disabled={viewMode}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.driver_code}
                </Typography>
              </Grid>
              {isAddForm == false ? (
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <TextField
                      value={otp_code}
                      name="otp_code"
                      placeholder="Driver Code"
                      label="OTP Code"
                      // onChange={handleChange("driver_code")}
                      disabled={true}
                      style={styles().field}
                    />
                  </div>
                </Grid>
              ) : null}
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={first_name}
                    name="first_name"
                    placeholder="First Name"
                    label="First Name"
                    onChange={handleChange("first_name")}
                    required
                    disabled={viewMode}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.first_name}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={last_name}
                    name="last_name"
                    placeholder="Last Name"
                    label="Last Name"
                    required
                    disabled={viewMode}
                    onChange={handleChange("last_name")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.last_name}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={phone_no}
                    name="phone_no"
                    placeholder="Contact Phone Number"
                    label="Contact Phone Number"
                    required
                    type="number"
                    disabled={viewMode}
                    onChange={handleChange("phone_no")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.phone_no}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={email}
                    name="email"
                    placeholder="Email"
                    label="Email"
                    required
                    disabled={viewMode}
                    onChange={handleChange("email")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.email}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={address_line1}
                    name="address_line1"
                    placeholder="Address Line 1"
                    label="Address Line 1"
                    required
                    disabled={viewMode}
                    onChange={handleChange("address_line1")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.address_line1}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={address_line2}
                    name="address_line2"
                    placeholder="Address Line 2"
                    label="Address Line 2"
                    // required
                    disabled={viewMode}
                    onChange={handleChange("address_line2")}
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={town}
                    name="town"
                    placeholder="Town/City"
                    label="Town/City"
                    required
                    disabled={viewMode}
                    onChange={handleChange("town")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.town}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={county}
                    name="county"
                    placeholder="County"
                    label="County"
                    required
                    disabled={viewMode}
                    onChange={handleChange("county")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.county}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={post_code}
                    name="post_code"
                    placeholder="Post Code"
                    label="Post Code"
                    required
                    disabled={viewMode}
                    onChange={handleChange("post_code")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.post_code}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={company_registeration_number}
                    name="company_registeration_number"
                    placeholder="Company Reg. No"
                    label="Company Reg. No"
                    required
                    disabled={viewMode}
                    onChange={handleChange("company_registeration_number")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.company_registeration_number}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={license_number}
                    name="license_number"
                    placeholder="License Number"
                    label="License Number"
                    required
                    disabled={viewMode}
                    onChange={handleChange("license_number")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.license_number}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={proposed_com_name}
                    name="proposed_com_name"
                    placeholder="Proposed Name of Company"
                    label="Proposed Name of Company"
                    required
                    disabled={viewMode}
                    onChange={handleChange("proposed_com_name")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.proposed_com_name}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>VAT Flag</InputLabel>
                  <Select
                    value={vat_flag}
                    onChange={handleChange("vat_flag")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={vat_reg_no}
                    name="vat_reg_no"
                    placeholder="VAT Registration Number"
                    label="VAT Registration Number"
                    required={
                      vat_flag == "Yes" || vat_flag == "yes" ? true : false
                    }
                    disabled={vat_flag == "No" || vat_flag == "no" || viewMode}
                    onChange={handleChange("vat_reg_no")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.vat_reg_no}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    label="Date of Birth (in format DD/MM/YY)"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    required
                    value={dob ? moment(dob) : undefined}
                    onChange={handleChangeDate("dob")}
                    animateYearScrolling={false}
                    style={{ width: "100%" }}
                    disabled={viewMode}
                  />
                </MuiPickersUtilsProvider>
                <Typography style={{ fontSize: 13, color: "red" }}>
                  {errors.dob}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={national_insurance_no}
                    name="national_insurance_no"
                    placeholder="National Insurance (NI) Number"
                    label="National Insurance (NI) Number"
                    required
                    onChange={handleChange("national_insurance_no")}
                    style={styles().field}
                    disabled={viewMode}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.national_insurance_no}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={town_birth}
                    name="town_birth"
                    placeholder="Town of Birth"
                    label="Town of Birth"
                    // required
                    onChange={handleChange("town_birth")}
                    style={styles().field}
                    disabled={viewMode}
                  />
                </div>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={mother_maiden_name}
                    name="mother_maiden_name"
                    placeholder="First three letters of mother's maiden name"
                    label="First three letters of mother's maiden name"
                    // required
                    onChange={handleChange("mother_maiden_name")}
                    style={styles().field}
                    disabled={viewMode}
                  />
                </div>
              </Grid>
            </Grid>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={next}
                style={styles().margin}
              >
                Next
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section1);
