import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getCookie } from "dan-api/cookie";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import UploadInputImg from "../../demos/UploadInputImg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import ThemeSelector from "../../../../components/TemplateSettings/ThemeSelector";
import styles from "../../../../components/TemplateSettings/settings-jss";
import classNames from "classnames";

function Section5(props) {
  const {
    portal_title,
    access_level,
    portal_description,
    default_theme,
    white_logo,
    dark_logo,
    logo_width,
    logo_height,
    files,
    handleView,
    handleUpload,
    handleChange,
    handleChangeOrientation,
    previous,
    classes,
    errors,
    submit,
    submitDisabled,
  } = props;
  const palette = [
    { name: "Ocean Sky", value: "skyBlueTheme" },
    { name: "Purple", value: "purpleRedTheme" },
    { name: "Rose Gold", value: "magentaTheme" },
    { name: "Leaf", value: "cyanTheme" },
    { name: "Mint", value: "blueCyanTheme" },
    { name: "Ubuntu", value: "orangeTheme" },
    { name: "Ultra Violet", value: "purpleTheme" },
    { name: "Vintage", value: "yellowCyanTheme" },
    { name: "Fruit", value: "greenOrangeTheme" },
    { name: "Botani", value: "pinkGreenTheme" },
    { name: "Deep Ocean", value: "blueTheme" },
    { name: "School", value: "yellowBlueTheme" },
    { name: "Queen", value: "pinkBlueTheme" },
    { name: "Joker", value: "greenPurpleTheme" },
    { name: "Ruby", value: "redTheme" },
    { name: "Sultan", value: "goldTheme" },
    { name: "Monochrome", value: "greyTheme" },
  ];
  const getItem = (dataArray) =>
    dataArray.map((item, index) => (
      <FormControlLabel
        key={index.toString()}
        className={classNames(classes.selectorThemeField)}
        control={
          <ThemeSelector
            value={item.value}
            theme={default_theme}
            selectedValue={default_theme}
            handleChange={handleChange("default_theme")}
            name={item.name}
          />
        }
      />
    ));

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
        <Paper
          style={{
            flexGrow: 1,
            padding: 30,
          }}
        >
          <Typography variant="h5" component="h3">
            Portal Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={portal_title}
                    name="portal_title"
                    placeholder="Titlee of the portal"
                    label="Title"
                    onChange={handleChange("portal_title")}
                    style={{
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />
                </div>
                {/* <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.sub_domain}
                </Typography> */}
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel>Access Level</InputLabel>
                  <Select
                    onChange={handleChange("access_level")}
                    value={access_level}
                    disabled={true}
                  >
                    {/* <MenuItem value="">
                      <em>Select a Flag</em>
                    </MenuItem> */}
                    <MenuItem value={"White Label Agency"}>
                      White Label Agency
                    </MenuItem>
                    {/* <MenuItem value={"DPS"}>DPS</MenuItem>
                    <MenuItem value={"Accounts"}>Accounts</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={12} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={portal_description}
                    name="portal_description"
                    placeholder="Description"
                    label="Description"
                    onChange={handleChange("portal_description")}
                    style={{
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />
                </div>
                <Typography
                  style={{ fontSize: 13, marginTop: -15, color: "red" }}
                >
                  {errors.portal_description}
                </Typography>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <UploadInputImg
                    onUpload={handleUpload("white_logo")}
                    text="Drag and drop a logo for light theme"
                    files={white_logo && [white_logo]}
                    style={{ width: "100%", height: 30 }}
                  />
                </div>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <UploadInputImg
                    onUpload={handleUpload("dark_logo")}
                    text="Drag and drop a logo for dark theme"
                    files={dark_logo && [dark_logo]}
                    style={{ width: "100%", height: 30 }}
                  />
                </div>
              </Grid>
              {files && files.white_logo && (
                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  container
                  style={{ justifyContent: "center" }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => handleView("white_logo")}
                    >
                      View Current Light Theme Logo
                    </Button>
                  </div>
                </Grid>
              )}
              {files && files.dark_logo && (
                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  container
                  style={{ justifyContent: "center" }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => handleView("dark_logo")}
                    >
                      View Current Dark Theme Logo
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
            <br />
            <br />
            <Typography variant="subtitle1" component="h3">
              Logo Orientation
            </Typography>
            <Grid
              md={12}
              sm={12}
              xs={12}
              item
              container
              direction="row"
              alignItems="center"
            >
              <Grid md={3} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={logo_width}
                    name="logo_width"
                    placeholder="Width of the logo in pixels"
                    label="Width"
                    type="number"
                    onChange={handleChange("logo_width")}
                    style={{
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />
                </div>
              </Grid>
              <div
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                X
              </div>
              <Grid md={3} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={logo_height}
                    name="logo_height"
                    placeholder="Height of the logo in pixels"
                    label="Height"
                    type="number"
                    onChange={handleChange("logo_height")}
                    style={{
                      width: "100%",
                      marginBottom: 20,
                    }}
                  />
                </div>
              </Grid>
              {/* <Tooltip title="Horizontal Orientation" placement="bottom">
                <FormControlLabel
                  className={classNames(
                    classes.hRectangleLogo,
                    logo_orientation == "hrectangle"
                      ? classes.activeLogorientation
                      : ""
                  )}
                  control={
                    <Radio
                      checked={logo_orientation == "hrectangle"}
                      onChange={() => handleChangeOrientation("hrectangle")}
                    />
                  }
                />
              </Tooltip>
              <Tooltip title="Vertical Orientation" placement="top-start">
                <FormControlLabel
                  className={classNames(
                    classes.vRectangleLogo,
                    logo_orientation == "vrectangle"
                      ? classes.activeLogorientation
                      : ""
                  )}
                  control={
                    <Radio
                      checked={logo_orientation == "vrectangle"}
                      onChange={() => handleChangeOrientation("vrectangle")}
                    />
                  }
                />
              </Tooltip>
              <Tooltip title="Square Orientation" placement="bottom-start">
                <FormControlLabel
                  className={classNames(
                    classes.squareLogo,
                    logo_orientation == "square"
                      ? classes.activeLogorientation
                      : ""
                  )}
                  control={
                    <Radio
                      checked={logo_orientation == "square"}
                      onChange={() => handleChangeOrientation("square")}
                    />
                  }
                />
              </Tooltip> */}
            </Grid>
            <br />
            <Typography variant="subtitle1" component="h3">
              Select Default Theme
            </Typography>
            {palette !== undefined && (
              <Grid md={12} sm={12} xs={12} item container direction="row">
                {getItem(palette)}
              </Grid>
            )}
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={previous}
                style={{
                  // width: "100%",
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={submit}
                disabled={submitDisabled}
                style={{
                  // width: "100%",
                  marginTop: 10,
                  marginBottom: 20,
                  marginLeft: 5
                }}
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
