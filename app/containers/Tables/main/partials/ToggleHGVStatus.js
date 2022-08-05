import React, { useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { URL, IMGURL } from "dan-api/url";
import axios from "axios";

const ToggleHGVStatus = (props) => {
  const { data } = props;
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(Number(data.value) ? true : false);
  }, []);

  function toggleStatus(id) {
    axios({
      method: "GET",
      url: URL + "toggleAgencyHGVStatus" + "/" + id,
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value ? true : false}
          onChange={(event) => {
            setValue(!value);
            toggleStatus(data.id);
          }}
          value="Active"
        />
      }
      label={value ? "Active" : "Disabled"}
    />
  );
};

export default ToggleHGVStatus;
