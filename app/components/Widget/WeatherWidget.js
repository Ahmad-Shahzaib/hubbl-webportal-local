import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "dan-styles/vendors/react-weather/GenericWeather.css";
import classNames from "classnames";
import styles from "./widget-jss";
import axios from "axios";

function WeatherWidget(props) {
  const { status, classes, temp, city } = props;
  const [weather, setWeather] = useState({
    current: {
      condition: {
        text: "",
        code: 0,
      },
    },
  });
  const cls = classNames(
    "weather-icon",
    weather.current.condition.code > 1000 ? "cloud" : "sun"
  );
  const bg = classNames(
    classes.weathercard,
    weather.current.condition.code > 1000 ? classes.cloud : classes.sun
  );

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://api.weatherapi.com/v1/current.json?key=20b0da55c327459c9bf102409222701&q=51.509865,-0.118092",
    })
      .then((res) => {
        if (res.status == 200) {
          setWeather(res.data);
        }
      })
      .catch((err) => {
        // error
      });
  }, []);

  return (
    <div className={bg}>
      <div className="wheater-wrap">
        <div className={cls} />
        <h1>{weather.current.temp_c ? weather.current.temp_c : 0}ºC</h1>
        <p>UK</p>
      </div>
    </div>
  );
}

WeatherWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  city: PropTypes.string,
  temp: PropTypes.number,
  status: PropTypes.string,
};

WeatherWidget.defaultProps = {
  city: "UK",
  temp: 0,
  status: "sun", // cloud and sun
};

export default withStyles(styles)(WeatherWidget);
