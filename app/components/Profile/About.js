import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import PapperBlock from "../PapperBlock/PapperBlock";
import styles from "./profile-jss";
import TextField from "@material-ui/core/TextField";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { profileValidator } from "dan-api/validator";
import axios from "axios";
import FormData from "form-data";
import { useHistory } from "react-router-dom";
import UploadInputImg from "../../containers/Forms/demos/UploadInputImg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function About(props) {
  const { classes, handleChangeData } = props;
  const userData = JSON.parse(getCookie("user"));
  const [data, setData] = useState({
    ...userData,
    first_name: userData.first_name,
    last_name: userData.last_name,
    address: userData.address,
    phone: userData.phone,
  });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    handleChangeData(data);
  }, [data]);
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.currentTarget.value });
  };

  const history = useHistory();
  function handleClick() {
    history.push("/reset-password");
  }

  const updateProfile = () => {
    const isValid = profileValidator(data);
    if (typeof isValid == "string") {
      return toast.warn(isValid);
    }
    const formdata = new FormData();

    if (files.length) {
      formdata.append("image", files[0]);
    }

    for (const property in data) {
      formdata.append(property, data[property]);
    }
    formdata.append("check", getCookie("userType"));

    axios({
      method: "POST",
      data: formdata,
      url:
        URL +
        "webUpdateProfile" +
        "/" +
        getCookie("id") +
        "/" +
        getCookie("userType"),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.status == 200) {
          toast.success(res.data.message);
          // console.log(res.data.profile_image);
          setCookie(
            "user",
            JSON.stringify({
              ...data,
              name: data.first_name + " " + data.last_name,
              profile_image: res.data.profile_image,
            })
          );
          window.location.reload();
        } else toast.error(res.data.message);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      direction="row"
      justify="center"
      spacing={3}
    >
      <Grid item md={12} xs={10} lg={10}>
        <PapperBlock
          title="Edit Profile"
          icon="ion-ios-contacts-outline"
          whiteBg
          desc=""
        >
          <Paper style={{ flexGrow: 1, padding: 30 }}>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                disabled={isLoading}
                onClick={handleClick}
              >
                Change Password
              </Button>
            </div>
            <form onSubmit={() => {}}>
              <Grid md={12} container spacing={2} item>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <TextField
                      value={data.first_name || ""}
                      name="first_name"
                      placeholder="First Name"
                      label="First Name"
                      onChange={handleChange("first_name")}
                      required
                      style={{ width: "100%", marginBottom: 20 }}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <TextField
                      value={data.last_name || ""}
                      name="last_name"
                      placeholder="Last Name"
                      label="Last Name"
                      onChange={handleChange("last_name")}
                      required
                      style={{ width: "100%", marginBottom: 20 }}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <TextField
                      value={data.address || ""}
                      name="address"
                      placeholder="Correspondence Address"
                      label="Correspondence Address"
                      onChange={handleChange("address")}
                      required
                      style={{ width: "100%", marginBottom: 20 }}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <TextField
                      value={data.phone || ""}
                      name="phone"
                      placeholder="Contact Phone Number"
                      label="Contact Phone Number"
                      onChange={handleChange("phone")}
                      required
                      style={{ width: "100%", marginBottom: 20 }}
                    />
                  </div>
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <UploadInputImg
                      onUpload={(f) => setFiles(f)}
                      text="Drag and drop Profile Image here"
                      // files={files.length ? [...files] : []}
                    />
                  </div>
                </Grid>
                <Divider className={classes.divider} />
                <Grid
                  container
                  justify="center"
                  style={{ justifyContent: "space-evenly" }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="button"
                      disabled={isLoading}
                      onClick={() => {
                        setIsLoading(true);
                        updateProfile();
                      }}
                    >
                      Update Profile
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </PapperBlock>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(About);
