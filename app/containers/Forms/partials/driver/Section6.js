import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie, setCookie } from "dan-api/cookie";
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

function Section5(props) {
  const {
    referred_by,
    driving_experience,
    hear_about_us,
    handleChange,
    previous,
    submit,
    classes,
    submitDisabled,
    viewMode,
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
            General Information
          </Typography>
          <div style={{ marginTop: 20 }} />
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid item md={6} xs={12}>
                <Typography variant="button" style={{ fontSize: 12 }}>
                  Summary of Your Driving Experiences
                </Typography>
                {/* <textarea
                  className={classes.textPreview}
                  rows={8}
                  style={{ width: "100%" }}
                  disabled={viewMode}
                /> */}
                <TextField
                  value={driving_experience}
                  name="driving_experience"
                  placeholder="Summary of Your Driving Experiences"
                  label="Summary of Your Driving Experiences"
                  multiline
                  rows={6}
                  // required
                  disabled={viewMode}
                  onChange={handleChange("driving_experience")}
                  style={styles().field}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="button" style={{ fontSize: 12 }}>
                  How did you hear About us?
                </Typography>
                {/* <textarea
                  className={classes.textPreview}
                  rows={8}
                  style={{ width: "100%" }}
                  disabled={viewMode}
                /> */}
                <TextField
                  value={hear_about_us}
                  name="hear_about_us"
                  placeholder="How did your here About us?"
                  label="How did your here About us?"
                  multiline
                  rows={6}
                  // required
                  disabled={viewMode}
                  onChange={handleChange("hear_about_us")}
                  style={styles().field}
                />
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={referred_by}
                    name="referred_by"
                    placeholder="Which driver reffered You (if applicable)?"
                    label="Which driver reffered You (if applicable)?"
                    // required
                    disabled={viewMode}
                    onChange={handleChange("referred_by")}
                    style={styles().field}
                  />
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
                color="secondary"
                type="button"
                onClick={submit}
                style={styles().margin}
                // >>>
                disabled={submitDisabled}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section5);
