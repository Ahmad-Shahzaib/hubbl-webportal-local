import React, { useState, useEffect } from "react";
import { URL } from "dan-api/url";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = () => ({
  field: {
    width: "100%",
    marginBottom: 20,
  },
  margin: {
    marginLeft: 5,
  },
});

const ReferanceHandler = (props) => {
  const { data } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(data.value);
  }, [data]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function submit() {
    axios({
      method: "GET",
      url:
        URL +
        "updateAssignedDriverRef" +
        "/" +
        data.id +
        "/" +
        value,
    })
      .then((res) => {
        if (res.data.status == 200) {
          props.onSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      direction="row"
      justify="center"
    >
      <Grid md={8} sm={8} xs={8} item>
        <div>
          <TextField
            value={value ? value : ""}
            name="ref"
            placeholder="Reference"
            label="Reference"
            onChange={handleChange}
            style={styles().field}
          />
        </div>
      </Grid>
      <div>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={submit}
          style={styles().margin}
        >
          Update
        </Button>
      </div>
    </Grid>
  );
};

export default ReferanceHandler;
