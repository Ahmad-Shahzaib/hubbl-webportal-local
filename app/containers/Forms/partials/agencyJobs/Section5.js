import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getCookie, setCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
    short_description,
    long_description,
    additional_notes,
    handleChange,
    previous,
    submit,
    submitDisabled,
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
            Description & Other Details
          </Typography>

          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
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
                color="secondary"
                type="button"
                onClick={() => submit("Publish")}
                disabled={submitDisabled}
                style={styles().margin}
              >
                Publish
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="button"
                style={styles().margin}
                onClick={() => submit("Draft")}
              >
                DRAFT
              </Button> */}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section5);
