import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { ir35ItemValidator } from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import UploadInputImg from "./demos/UploadInputImg";
import FormData from "form-data";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  checkbox: {
    transform: "scale(1.5)",
    marginLeft: 10,
    marginRight: 10,
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

function AddIR35ItemForm() {
  const [form, setForm] = useState({
    categories: [],
    item_fields: [],
  });
  const defaultDataConfig = {
    isVerified: false,
    can_host: false,
  };
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(defaultDataConfig);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);

  const handleChangeDate = (name) => (event) => {
    if (event) {
      setData({
        ...data,
        [name]: moment(event._d).format("YYYY-MM-DD h:m:s"),
      });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleUpload = (name) => (value) => {
    setData((previous) => ({
      ...previous,
      [name]: value[0],
    }));
  };

  useEffect(() => {
    if (getCookie("id")) {
      submitt();
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }
  // constant methods
  const handleTypeChange = (event) => {
    setData({ ...data, type: event.target.value });
  };
  const handleItemChange = (event) => {
    // console.log(event);
    const item = form.item_fields.find((itm) => itm.id == event.target.value);
    let _item = "";
    if (item) {
      _item = item.default_min_score;
    }
    setData({
      ...data,
      category_Item_id: event.target.value,
      min_score: _item,
    });
  };

  const handleMaxDefaultChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.checked,
    });
  };

  const getData = () => {
    axios({
      method: "GET",
      url: URL + "getIR35ItemFormData",
    })
      .then((res) => {
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setForm(res.data);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  };

  const submit = () => {
    const formdata = new FormData();

    for (const property in data) {
      formdata.append(property, data[property]);
    }
    axios({
      method: "PUT",
      url: URL + "/users/update/"+getCookie('editDataId'),
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setData(defaultDataConfig);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/IR35-Items";
              history.back();
            }, 1500);
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

  const submitt = () => {
    console.log(getCookie("editDataId"));
    axios({
      method: "POST",
      url: URL + "users/getUser",
      data: {id : getCookie("editDataId")},
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == true) {
          data.isVerified = res.data.isVerified;
          data.can_host = res.data.can_host;
        } else {
          setData(defaultDataConfig);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/IR35-Items";
              history.back();
            }, 1500);
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

  const title = brand.name + " - Add Hot Drops";
  const description = brand.desc;
  const docSrc = "containers/Forms/demos/";
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
      <PapperBlock
        title="Edit User"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to Edit a new User"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={10} lg={8}>
              <Paper style={styles().root}>
                <form>
                  <Grid md={12} container spacing={2} item>
                    
                    <Grid md={6} sm={6} xs={12} item>
                      <div>
                        <FormControlLabel
                      control={
                        <Switch
                          value="checkedD"
                          checked={data.isVerified}
                          onChange={(e) => {
                            data.isVerified = !data.isVerified;
                            setIsUpdating(!isUpdating);
                          }}
                          color="primary"
                        />
                      }
                      label="IS VARIFIED USER"
                      style={{ marginLeft: 10 }}
                    />
                      </div>
                      
                    </Grid>
                    <Grid md={6} sm={6} xs={12} item>
                      <div>
                        <FormControlLabel
                      control={
                        <Switch
                          value="checkedD"
                          checked={data.can_host}
                          onChange={(e) => {
                            data.can_host = !data.can_host;
                            setIsUpdating(!isUpdating);
                          }}
                          color="primary"
                        />
                      }
                      label="Stay on this page"
                      style={{ marginLeft: 10 }}
                    />
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

export default withStyles(styles)(AddIR35ItemForm);
