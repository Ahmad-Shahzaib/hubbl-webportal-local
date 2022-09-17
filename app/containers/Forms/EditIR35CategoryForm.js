import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { SourceReader, PapperBlock } from "dan-components";
import { EditAdminForm } from "./demos";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { IR35CategoryValidator } from "dan-api/validator";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL, IMGURL } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
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
  checkbox: {
    marginLeft: 10,
  },
});

function EditIR35CategoryForm() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stayHere, setStayHere] = useState(true);

  const [data, setData] = useState({
    title: "",
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
      url: URL + "getIR35CategoryById/" + id,
    })
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data);
          setData({
            title: res.data.category.category_name,
          });
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
    const isValid = IR35CategoryValidator(data);
    if (typeof isValid == "string") {
      toast.warn(isValid);
      loading(false);
      return;
    }
    axios({
      method: "POST",
      url: URL + "editNewIR35Category/" + getCookie("editDataId"),
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getCookie("token"),
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
              // window.location.href = "/app/IR35-Categories";
              history.back();
            }, 1500);
          }
          toast.success("Category Updated Succesfully!");
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);

        toast.error("Something Went Wrong!");
      });
  };

  const title = brand.name + " - IR35 Add Category";
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
        title="Edit IR35 Category"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to update the Category information for IR35 Score Items"
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
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.title}
                          name="title"
                          placeholder="title"
                          label="title"
                          onChange={(e) => {
                            data.title = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          required
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                      style={{ fontSize: 13, marginTop: -15, color: "red", marginBottom: 15}}
                    >
                      Title
                    </Typography> */}
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
                      Update
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
                      style={styles().checkbox}
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

export default withStyles(styles)(EditIR35CategoryForm);
