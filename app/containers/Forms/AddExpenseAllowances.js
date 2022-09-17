import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { getCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { allowanceValidator } from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

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
  checkbox: {
    marginLeft: 10,
  },
});

function AddExpenseAllowances() {
  const defaultDataConfig = {
    name: "",
    rate: "",
  };
  const [data, setData] = useState(defaultDataConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);

  // console.log(data)
  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  function loading(status) {
    setIsLoading(status);
  }

  const submit = () => {
    const isValid = allowanceValidator(data);
    if (typeof isValid == "string") {
      toast.warn(isValid);
      loading(false);
      return;
    }
    axios({
      method: "POST",
      url: URL + "WebSTOREallowance",
      data: { ...data, user_id: getCookie("user_id") },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        loading(false);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setData(defaultDataConfig);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/All-Expense-Allowances";
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

  const title = brand.name + " - Add Allowance";
  const description = brand.desc;
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
        title="Add Expense Allowances"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to add expense allowances"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={10} lg={10}>
              <Paper style={styles().root}>
                <Grid md={12} container spacing={2} item>
                  <Grid md={6} sm={12} xs={12} item>
                    <div>
                      <TextField
                        value={data.name}
                        name="name"
                        placeholder="Name"
                        label="Name"
                        onChange={handleChange("name")}
                        required
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
                      Name
                    </Typography> */}
                  </Grid>
                  <Grid md={6} sm={12} xs={12} item>
                    <div>
                      <TextField
                        value={data.rate}
                        name="rate"
                        placeholder="c"
                        label="Rate"
                        type="number"
                        required
                        onChange={handleChange("rate")}
                        style={styles().field}
                      />
                    </div>
                    {/* <Typography
                      style={{ fontSize: 13, marginTop: -15, color: "red" }}
                    >
                      Rate
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
                    style={styles().checkbox}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(AddExpenseAllowances);
