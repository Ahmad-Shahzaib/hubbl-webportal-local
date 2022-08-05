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
    address_line1,
    address_line2,
    address_line3,
    town,
    county,
    post_code,
    handleChange,
    errors,
    next,
    previous,
  } = props;
  console.log(errors);

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
            Address Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={address_line1}
                    name="address_line1"
                    placeholder="Address Line 1"
                    label="Address Line 1"
                    required
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
                    onChange={handleChange("address_line2")}
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={address_line3}
                    name="address_line3"
                    placeholder="Address Line 3"
                    label="Address Line 3"
                    // required
                    onChange={handleChange("address_line3")}
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
