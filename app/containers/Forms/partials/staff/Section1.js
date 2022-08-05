import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import UploadInputImg from "../../demos/UploadInputImg";
import "react-toastify/dist/ReactToastify.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

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
    first_name,
    last_name,
    email,
    home_address,
    phone_no,
    images,
    dob,
    isAddForm,
    handleChange,
    handleChangeDate,
    handleUpload,
    onViewImage,
    next,
    errors,
  } = props;

  // console.log(images);

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
            Profile Information
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={first_name}
                    name="first_name"
                    placeholder="First Name"
                    label="First Name"
                    onChange={handleChange("first_name")}
                    required
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
                    value={email}
                    name="email"
                    placeholder="email"
                    label="email"
                    required
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
                    value={home_address}
                    name="home_address"
                    placeholder="Home Address"
                    label="Home Address"
                    required
                    onChange={handleChange("home_address")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.home_address}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={phone_no}
                    name="phone_no"
                    placeholder="Phone No"
                    label="Phone No"
                    type="number"
                    required
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
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    label="Date of Birth (in format DD/MM/YY)"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={dob ? moment(dob) : undefined}
                    onChange={handleChangeDate("dob")}
                    animateYearScrolling={false}
                    style={{ width: "100%" }}
                    disableFuture
                  />
                </MuiPickersUtilsProvider>
                <Typography style={{ fontSize: 13, color: "red" }}>
                  {errors.dob}
                </Typography>
              </Grid>
              <Grid md={12} sm={12} xs={12} item>
                <div>
                  <UploadInputImg
                    onUpload={handleUpload("images")}
                    text="Drag and drop Profile Image here"
                    files={images && [images]}
                    showPreviews={true}
                    style={{ width: "100%" }}
                  />
                </div>
              </Grid>
              {!isAddForm && (
                <Grid
                  md={12}
                  sm={12}
                  xs={12}
                  container
                  item
                  style={{ justifyContent: "center" }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={onViewImage}
                    >
                      View Current Profile Image
                    </Button>
                  </div>
                </Grid>
              )}
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

export default withStyles(styles)(Section1);
