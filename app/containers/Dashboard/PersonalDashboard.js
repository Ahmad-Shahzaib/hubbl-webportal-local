import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import brand from "dan-api/dummy/brand";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  SliderWidget,
  CounterIconsWidget,
  TreesWidget,
  PerformanceChartWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from "dan-components";
import styles from "./dashboard-jss";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { URL } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { platformConfig } from "dan-api/platformConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PersonalDashboard(props) {
  const title = brand.name + " - Personal Dashboard";
  const description = brand.desc;
  const { classes } = props;
  // const [cookies, setCookies, removeCookies] = useCookies();

  useEffect(() => {
    // console.log(getCookie("id"));
    if (getCookie("id")) {
      // getDashboardData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const [data, setData] = useState({
    drivers: 0,
    staff: 0,
    hirers: 0,
    vehicles: 0,
    trees: 0,
    timesheets: 0,
    expancesheets: 0,
    incomeForms: 0,
    jobs: 0,
    substitutes: 0,
    events: 0,
    latest_timesheets: [],
    latest_expensesheet: [],
    latest_incomeFomrs: [],
  });

  function getDashboardData() {
    axios({
      method: "GET",
      url:
        URL +
        "webdashboard" +
        "/" +
        getCookie("userType") +
        "/" +
        getCookie("id") +
        "/" +
        platformConfig.prefix,
    })
      .then((res) => {
        if (res.data.status == 200) {
          setData(res.data);
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  return (
    <div>
      <ToastContainer />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {/* 1st Section */}
      <Grid
        container
        spacing={3}
        className={classes.root}
        justify={getCookie("userType") == "driver" ? "center" : undefined}
      >
        {getCookie("userType") !== "driver" ? (
          <Grid item md={6} xs={12}>
            <CounterIconsWidget data={data} />
          </Grid>
        ) : null}
        <Grid item md={6} sm={12} xs={12}>
          <div className={classes.sliderWrap}>
            {/* <TreesWidget data={data} /> */}
            <DateWidget />
          </div>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      {/* 2nd Section */}
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <PerformanceChartWidget data={data} />
        </Grid>
      </Grid>
      {/* 3rd Section */}
      <Grid container spacing={3} className={classes.root}>
        {/* {getCookie("userType") !== "driver" ? (
          <Grid item md={6} xs={12}>
            <Divider className={classes.divider} />
            <ContactWidget data={data} />
          </Grid>
        ) : null} */}
        {getCookie("userType") !== "driver" ? (
          <Grid item md={6} xs={12}>
            <Hidden mdDown>
              <Divider className={classes.divider} />
            </Hidden>
            <Divider className={classes.divider} />
            {/* <WeatherWidget /> */}
          </Grid>
        ) : null}
      </Grid>
      {/* <Divider className={classes.divider} />
      <FilesWidget /> */}
    </div>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
