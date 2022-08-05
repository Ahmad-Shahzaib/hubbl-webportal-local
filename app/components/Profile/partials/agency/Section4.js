import React, { useState, useEffect, useRef } from "react";
import brand from "dan-api/dummy/brand";
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
import UploadInputImg from "../../../../containers/Forms/demos/UploadInputImg";

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

function Section4(props) {
  const {
    short_description,
    profile_image,
    files,
    onViewImage,
    handleUpload,
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
            Bio & Other Details
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={12} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={short_description}
                    name="short_description"
                    placeholder="Short Description"
                    label="Short Description"
                    required
                    onChange={handleChange("short_description")}
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={12} sm={12} xs={12} item>
                <div>
                  <UploadInputImg
                    onUpload={(f) => setFiles(f)}
                    text="Drag and drop Business/Profile Pictures here"
                    // files={files.length ? [...files] : []}
                  />
                </div>
              </Grid>
              <Grid md={12} sm={12} xs={12} item>
                <div>
                  <UploadInputImg
                    onUpload={handleUpload("profile_image")}
                    text="Drag and drop Profile Image here"
                    files={profile_image && [profile_image]}
                    style={{ width: "100%", height: 30 }}
                  />
                </div>
              </Grid>
              {/* {files && files.profile_image && (
                <Grid
                  md={12}
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
                      onClick={onViewImage}
                    >
                      View Current Profile Image
                    </Button>
                  </div>
                </Grid>
              )} */}
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
                onClick={submit}
                style={styles().margin}
                disabled={submitDisabled}
              >
                Submit
              </Button> */}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section4);
