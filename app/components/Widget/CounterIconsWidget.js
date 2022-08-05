import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import driver from "dan-images/drivers.png";
import staff from "dan-images/staff.png";
import vehicle from "dan-images/vehicle.png";
import hirer from "dan-images/hirers.png";
import colorfull from "dan-api/palette/colorfull";
import { getCookie } from "dan-api/cookie";
import CounterWidget from "../Counter/CounterWidget";
import styles from "./widget-jss";
import { useHistory } from "react-router-dom";

function CounterIconWidget(props) {
  const { classes, data } = props;
  const history = useHistory();
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <CounterWidget
            color={colorfull[7]}
            start={0}
            end={data ? data.drivers : 0}
            duration={3}
            title="Users"
            style={{ cursor: "pointer" }}
            // onClick={() => history.push("/app/all-drivers")}
          >
            {/* <img
              src={driver}
              className={classes.counterIcon}
              style={{ width: 80, height: 80 }}
            /> */}
            {/* <OndemandVideo /> */}
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={6}>
          <CounterWidget
            color={colorfull[8]}
            start={0}
            end={data ? data.staff : 0}
            duration={3}
            title="Posts"
            style={{
              cursor: getCookie("userType") !== "staff" ? "pointer" : "default",
            }}
            onClick={() =>
              getCookie("userType") !== "staff"
                ? history.push("/app/all-staff")
                : {}
            }
          >
            {/* <img
              src={staff}
              className={classes.counterIcon}
              style={{ width: 100, height: 80 }}
            /> */}
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={6}>
          <CounterWidget
            color={colorfull[9]}
            start={0}
            end={data ? data.hirers : 0}
            duration={3}
            title="Official Projects"
            style={{
              cursor:
                getCookie("userType") !== "agency" &&
                getCookie("userType") !== "staff"
                  ? "pointer"
                  : "default",
            }}
            onClick={() =>
              getCookie("userType") !== "agency" &&
              getCookie("userType") !== "staff"
                ? history.push("/app/all-hirers")
                : {}
            }
          >
            {/* <img
              src={hirer}
              className={classes.counterIcon}
              style={{ width: 90, height: 80 }}
            /> */}
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={6}>
          <CounterWidget
            color={colorfull[10]}
            start={0}
            end={data ? data.vehicles : 0}
            duration={3}
            title="Hot Drops"
          >
            {/* <img
              src={vehicle}
              className={classes.counterIcon}
              style={{ width: 80, height: 80 }}
            /> */}
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterIconWidget);
