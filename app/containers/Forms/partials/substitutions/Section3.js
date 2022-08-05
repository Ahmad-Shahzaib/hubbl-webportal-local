import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
  TimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
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

function Section3(props) {
  const {
    start,
    start1,
    start2,
    start3,
    start_date,
    start_time,
    handleChange,
    handleChangeDate,
    previous,
    next,
    errors,
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
            Job Starting Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={start}
                    name="start"
                    placeholder="Starting Point ( PostCode )"
                    label="Starting Point ( PostCode )"
                    onChange={handleChange("start")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.start}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={start1}
                    name="start1"
                    placeholder="Starting Address Line 1"
                    label="Starting Address Line 1"
                    onChange={handleChange("start1")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.start1}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={start2}
                    name="start2"
                    placeholder="Starting Address Line 2"
                    label="Starting Address Line 2"
                    onChange={handleChange("start2")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.start2}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={start3}
                    name="start3"
                    placeholder="Starting Town/City"
                    label="Starting Town/City"
                    onChange={handleChange("start3")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.start3}
                </Typography>
              </Grid>

              <Grid md={6} sm={12} xs={12} item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    label="Start Date"
                    format="DD/MM/YYYY"
                    placeholder="31/01/2022"
                    value={start_date ? moment(start_date) : new Date()}
                    onChange={handleChangeDate("start_date")}
                    animateYearScrolling={false}
                    style={{ width: "100%" }}
                    required
                  />
                </MuiPickersUtilsProvider>
                <Typography
                  style={{ fontSize: 13, marginTop: 5, color: "red" }}
                >
                  {errors.start_date}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    label="Start Time"
                    value={
                      start_time
                        ? moment(
                            moment(start_time).isValid()
                              ? moment(start_time)
                              : start_time,
                            "HH:mm"
                          )
                        : new Date()
                    }
                    onChange={handleChangeDate("start_time")}
                    style={{ width: "100%" }}
                    required
                  />
                </MuiPickersUtilsProvider>
                <Typography
                  style={{ fontSize: 13, marginTop: 5, color: "red" }}
                >
                  {errors.start_time}
                </Typography>
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
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section3);
