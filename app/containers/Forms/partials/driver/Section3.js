import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getCookie, setCookie } from "dan-api/cookie";
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

function Section3(props) {
  const {
    LTD,
    PLI,
    BBA,
    MCB,
    TFT,
    TC,
    handleChange,
    viewMode,
    previous,
    next,
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
            B2B Operation
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>PSC Engagement</InputLabel>
                  <Select
                    value={LTD}
                    onChange={handleChange("LTD")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Accounts"}>Accounts</MenuItem>
                    <MenuItem value={"Enhanced"}>Enhanced</MenuItem>
                    <MenuItem value={"Enhanced & Accounts"}>
                      Enhanced & Accounts
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Public Liability Insuance</InputLabel>
                  <Select
                    value={PLI}
                    onChange={handleChange("PLI")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Business Bank Account</InputLabel>
                  <Select
                    value={BBA}
                    onChange={handleChange("BBA")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Accept Substitution</InputLabel>
                  <Select
                    value={MCB}
                    onChange={handleChange("MCB")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Accountancy</InputLabel>
                  <Select
                    value={TFT}
                    onChange={handleChange("TFT")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Own"}>Own</MenuItem>
                    <MenuItem value={"HGV Hub"}>HGV Hub</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Tax Compliance</InputLabel>
                  <Select
                    value={TC}
                    onChange={handleChange("TC")}
                    disabled={viewMode}
                  >
                    <MenuItem value="">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
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
