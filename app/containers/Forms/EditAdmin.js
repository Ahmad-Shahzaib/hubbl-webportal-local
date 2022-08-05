import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { SourceReader, PapperBlock } from "dan-components";
import { adminValidator } from "dan-api/validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import FormData from "form-data";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL, IMGURL, UPLOADURL, resolveUrl } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import UploadInputImg from "./demos/UploadInputImg";
import ImageLightbox from "react-image-lightbox";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
});

function EditAdmin() {
  const [viewImage, setViewImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stayHere, setStayHere] = useState(true);

  const [profileImage, setProfileImage] = useState("");
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    correspondence_address: "",
    phone_no: "",
    images: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (getCookie("id")) {
      getData(getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }

  // main methods
  function getData(id) {
    axios({
      method: "GET",
      url: URL + "getAdminById/" + id,
    })
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data);
          setData({
            first_name: res.data.admin.first_name,
            last_name: res.data.admin.surname,
            email: res.data.admin.email,
            correspondence_address: res.data.admin.address,
            phone_no: res.data.admin.mobile,
          });
          setProfileImage(res.data.admin.profile_image);
        } else {
          toast.warn("Unable to fetch data from Server. Something Went Wrong");
        }
        loading(false);
      })
      .catch((err) => {
        loading(false);

        toast.error("Server Error!");
      });
  }

  const submit = () => {
    let values = data;
    const isValid = adminValidator(values);
    if (typeof isValid == "string") {
      toast.warn(isValid);
      loading(false);
      return;
    }
    // console.log(values);
    const formdata = new FormData();

    // formdata.append("id", getCookie("editDataId"));
    if (files.length) {
      formdata.append("file", files[0]);
    }
    for (const property in values) {
      formdata.append(property, values[property]);
    }
    axios({
      method: "POST",
      url: URL + "updateAdmin/" + getCookie("editDataId"),
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-admins";
              history.back();
            }, 3000);
          }
          toast.success(res.data.message);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  };

  const title = brand.name + " - Admin";
  const description = brand.desc;
  return (
    <div>
      <ToastContainer />
      {viewImage && (
        <ImageLightbox
          mainSrc={
            profileImage.includes("https")
              ? IMGURL + resolveUrl(profileImage)
              : IMGURL + profileImage
          }
          onCloseRequest={() => setViewImage(false)}
        />
      )}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Create New Admin Account"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to create a new user account with admin privilages"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid container xs={12} md={10} lg={8}>
              <Paper style={styles().root}>
                <form>
                  <Grid md={12} container spacing={2}>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.first_name}
                          name="first_name"
                          // component={TextFieldRedux}
                          placeholder="First Name"
                          label="First Name"
                          // validate={required}
                          onChange={(e) => {
                            data.first_name = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          required
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{
                          fontSize: 13,
                          marginTop: -15,
                          color: "red",
                        }}
                      >
                        First Name
                      </Typography> */}
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.last_name}
                          name="last_name"
                          // component={TextFieldRedux}
                          placeholder="Last Name"
                          label="Last Name"
                          required
                          onChange={(e) => {
                            data.last_name = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          // validate={required}
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{
                          fontSize: 13,
                          marginTop: -15,
                          color: "red",
                        }}
                      >
                        Last Name
                      </Typography> */}
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.phone_no}
                          name="phone_no"
                          // component={TextFieldRedux}
                          placeholder="Contact Phone Number"
                          label="Contact Phone Number"
                          required
                          onChange={(e) => {
                            data.phone_no = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          // validate={[required]}
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{
                          fontSize: 13,
                          marginTop: -15,
                          color: "red",
                        }}
                      >
                        Contact Phone Number
                      </Typography> */}
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.email}
                          name="email"
                          // component={TextFieldRedux}
                          placeholder="Personal Email Address"
                          label="Email Address"
                          required
                          onChange={(e) => {
                            data.email = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          // validate={[required, email]}
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{
                          fontSize: 13,
                          marginTop: -15,
                          color: "red",
                          marginBottom: 15,
                        }}
                      >
                        Personal Email Address
                      </Typography> */}
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.correspondence_address}
                          name="correspondence_address"
                          // component={TextFieldRedux}
                          placeholder="Correspondence Address"
                          label="Correspondence Address"
                          required
                          onChange={(e) => {
                            data.correspondence_address = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          // validate={[required]}
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{
                          fontSize: 13,
                          marginTop: -15,
                          color: "red",
                        }}
                      >
                        Correspondence Address
                      </Typography> */}
                    </Grid>
                    <Grid md={12} sm={12} xs={12}>
                      <div>
                        <UploadInputImg
                          onUpload={(f) => setFiles(f)}
                          text="Drag and drop Profile Image here"
                          files={[...files]}
                        />
                      </div>
                    </Grid>
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
                          onClick={() => setViewImage(true)}
                        >
                          View Current Profile Image
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={() => {
                        loading(true);
                        submit();
                      }}
                      disabled={isLoading}
                    >
                      Submit
                    </Button>
                    <FormControlLabel
                      control={
                        <Switch
                          value="checkedD"
                          checked={stayHere ? true : false}
                          onChange={() => setStayHere(!stayHere)}
                          color="primary"
                        />
                      }
                      label="Stay on this page"
                      style={{ marginLeft: 10 }}
                    />
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(EditAdmin);
