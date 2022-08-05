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

function Section4(props) {
  const { end, end1, end2, end3, handleChange, previous, next, errors } = props;

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
            Job Ending Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={end}
                    name="end"
                    placeholder="Ending Point ( Post Code )"
                    label="Ending Point ( Post Code )"
                    onChange={handleChange("end")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.end}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={end1}
                    name="end1"
                    placeholder="Ending Address Line 1"
                    label="Ending Address Line 1"
                    onChange={handleChange("end1")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.end1}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={end2}
                    name="end2"
                    placeholder="Ending Address Line 2"
                    label="Ending Address Line 2"
                    onChange={handleChange("end2")}
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.end2}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={end3}
                    name="end3"
                    placeholder="Ending Town/City"
                    label="Ending Town/City"
                    onChange={handleChange("end3")}
                    required
                    style={styles().field}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.end3}
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
              {/* <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={next}
                style={styles().margin}
              >
                Next
              </Button> */}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section4);
