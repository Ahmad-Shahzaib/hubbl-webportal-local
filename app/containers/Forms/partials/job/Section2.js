import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
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

function Section2(props) {
  const {
    hire_quantity,
    hirer_rate,
    flag,
    hire_type,
    driver_class,
    handleChange,
    next,
    previous,
    errors,
  } = props;

  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  const title = brand.name + " - Form";
  const description = brand.desc;
  const docSrc = "containers/Forms/demos/";
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
            Job Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Publish To</InputLabel>
                  <Select value={flag} onChange={handleChange("flag")}>
                    <MenuItem value="">
                      <em>Select a Flag</em>
                    </MenuItem>
                    <MenuItem value={"1"}>Assigned Drivers</MenuItem>
                    <MenuItem value={"0"}>HGV Hub Global</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  style={{ fontSize: 13, marginTop: 5, color: "red" }}
                >
                  {errors.flag}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Driver Class</InputLabel>
                  <Select
                    value={driver_class}
                    onChange={handleChange("driver_class")}
                  >
                    <MenuItem value="">
                      <em>Select a Class</em>
                    </MenuItem>
                    <MenuItem value={"Cat C"}>Cat C</MenuItem>
                    <MenuItem value={"Cat C + E"}>Cat C + E</MenuItem>
                    <MenuItem value={"Cat C1"}>Cat C1</MenuItem>
                    <MenuItem value={"Cat C1 + E1"}>Cat C1 + E1</MenuItem>
                    <MenuItem value={"Van"}>Van</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  style={{ fontSize: 13, marginTop: 5, color: "red" }}
                >
                  {errors.driver_class}
                </Typography>
              </Grid>
              <Grid md={12} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Hire Type</InputLabel>
                  <Select
                    value={hire_type}
                    onChange={handleChange("hire_type")}
                  >
                    <MenuItem value="">
                      <em>Select a Type</em>
                    </MenuItem>
                    <MenuItem value={"Hourly Hire"}>Hourly Hire</MenuItem>
                    <MenuItem value={"Daily Hire"}>Daily Hire</MenuItem>
                    <MenuItem value={"Weekly Hire"}>Weekly Hire</MenuItem>
                    <MenuItem value={"Other Hire"}>Other Hire</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  style={{ fontSize: 13, marginTop: 5, color: "red" }}
                >
                  {errors.hire_type}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={hire_quantity}
                    name="hire_quantity"
                    placeholder="Hire Quantity"
                    label="Hire Quantity"
                    type="number"
                    onChange={handleChange("hire_quantity")}
                    required
                    style={styles().field}
                    inputProps={{ inputMode: "numeric" }}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.hire_quantity}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={hirer_rate}
                    name="hirer_rate"
                    placeholder="Hirer Rate"
                    label="Hirer Rate"
                    required
                    type="number"
                    onChange={handleChange("hirer_rate")}
                    style={styles().field}
                    inputProps={{ inputMode: "numeric" }}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.hirer_rate}
                </Typography>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={Number(hire_quantity) * Number(hirer_rate)}
                    name="hire_cost"
                    placeholder="Hire Cost"
                    label="Hire Cost"
                    // onChange={handleChange("hire_cost")}
                    style={styles().field}
                    disabled
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.hire_cost}
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

export default withStyles(styles)(Section2);
