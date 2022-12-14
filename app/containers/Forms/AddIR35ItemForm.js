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
    title: "",
    category_id: "",
    category_Item_id: "",
    min_score: 0,
    max_score: 1,
    is_max_default: 0,
  };
  const [data, setData] = useState(defaultDataConfig);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);

  useEffect(() => {
    if (getCookie("id")) {
      getData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }
  // constant methods
  const handleCategoryChange = (event) => {
    setData({ ...data, category_id: event.target.value });
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
    const isValid = ir35ItemValidator(data);
    if (typeof isValid == "string") {
      toast.warn(isValid);
      loading(false);
      return;
    }
    axios({
      method: "POST",
      url: URL + "addNewIR35Item",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
        title="Create New IR35 Category Item"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to create a new Category Item for IR35 Driver Score"
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
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.title}
                          name="title"
                          placeholder="Title"
                          label="Title"
                          onChange={(e) => {
                            data.title = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          required
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{ fontSize: 13, marginTop: -15, color: "red" }}
                      >
                        Title
                      </Typography> */}
                    </Grid>
                    <Grid md={4} sm={12} xs={12} item>
                      <div>
                        <FormControl variant="standard" style={styles().field}>
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={data.category_id}
                            onChange={handleCategoryChange}
                            required
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {form.categories.map((cat, i) => (
                              <MenuItem value={cat.id} key={i}>
                                {cat.category_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      {/* <Typography
                        style={{ fontSize: 13, marginTop: -5, color: "red" }}
                      >
                        Category
                      </Typography> */}
                    </Grid>
                    <Grid md={8} sm={12} xs={12} item>
                      <div>
                        <FormControl variant="standard" style={styles().field}>
                          <InputLabel>Category Item</InputLabel>
                          <Select
                            value={data.category_Item_id}
                            onChange={handleItemChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {form.item_fields.map((item, i) => (
                              <MenuItem value={item.id} key={i}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.min_score}
                          name="min_score"
                          placeholder="Minimum Score"
                          label="Minimum Score"
                          inputMode="numeric"
                          onChange={(e) => {
                            data.min_score = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          required
                          disabled
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{ fontSize: 13, marginTop: -15, color: "red" }}
                      >
                        Minimum Score
                      </Typography> */}
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={data.max_score}
                          name="max_score"
                          placeholder="Maximum Score"
                          label="Maximum Score"
                          inputMode="numeric"
                          type="number"
                          onChange={(e) => {
                            data.max_score = e.target.value;
                            setIsUpdating(!isUpdating);
                          }}
                          required
                          style={styles().field}
                        />
                      </div>
                      {/* <Typography
                        style={{ fontSize: 13, marginTop: -15, color: "red" }}
                      >
                        Maximum Score
                      </Typography> */}
                    </Grid>
                    <Grid md={6} sm={12} xs={12} item>
                      <div>
                        <FormControlLabel
                          control={
                            <div>
                              <Checkbox
                                value="checkedD"
                                checked={data.is_max_default ? true : false}
                                onChange={handleMaxDefaultChange(
                                  "is_max_default"
                                )}
                                color="primary"
                                style={styles().checkbox}
                              />
                            </div>
                          }
                          label="Max is the default value"
                          style={styles().field}
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
