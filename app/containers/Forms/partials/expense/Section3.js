import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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
  const { business_miles_units, business_miles_price, handleChange } = props;

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
            Business Miles (£0.45)
          </Typography>
          <Grid md={12} container spacing={2} item alignItems="center">
            <Grid md={4} sm={4} xs={4} item>
              <div>
                <TextField
                  value={business_miles_units ? business_miles_units : ""}
                  name="unit"
                  placeholder="Unit"
                  label="Unit"
                  onChange={handleChange}
                  required
                  style={styles().field}
                />
              </div>
              {/* <Typography
                style={{ fontSize: 13, marginTop: -15, color: "red" }}
              >
                {errors.business_miles_units}
              </Typography> */}
            </Grid>
            <Grid md={4} sm={4} xs={4} item>
              <div>
                <TextField
                  value={business_miles_price ? business_miles_price : ""}
                  name="total"
                  placeholder="Total"
                  label="Total"
                  style={styles().field}
                />
              </div>
            </Grid>
          </Grid>
          <div />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section1);
