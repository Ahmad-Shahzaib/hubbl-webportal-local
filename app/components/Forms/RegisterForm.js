import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Brightness5 from "@material-ui/icons/Brightness5";
import People from "@material-ui/icons/People";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL, IMGURL } from "dan-api/url";
import { platformConfig } from "dan-api/platformConfig";

const styless = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    // marginBottom: 20,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 10,
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
// validation functions
const required = (value) => (value === null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.password) {
    return "Passwords dont match";
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const [tab, setTab] = useState(0);
  const {
    first_name,
    last_name,
    email,
    password,
    mobile_number,
    register_as,
    handleChange,
    submit,
  } = props;

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const { classes, handleSubmit, pristine, submitting, deco } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img
            src={
              getCookie("type") && getCookie("type") == "dark"
                ? platformConfig.white_logo
                : platformConfig.black_logo
            }
            alt={brand.name}
          />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img
                src={
                  getCookie("type") && getCookie("type") == "dark"
                    ? platformConfig.white_logo
                    : platformConfig.black_logo
                }
                alt={brand.name}
              />
              {brand.name}
            </NavLink>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        />
        {/* <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor='secondary'
          textColor='secondary'
          centered
          className={classes.tab}
        >
          <Tab label='With Email' />
          <Tab label='With Social Media' />
        </Tabs> */}
        {/* {tab === 0 && ( */}
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={12} md={10} lg={10}>
                  {/* <Paper style={styless().root}> */}
                  <Grid md={12} container spacing={2} item>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={first_name}
                          autoFocus={true}
                          name="first_name"
                          placeholder="First Name"
                          label="First Name"
                          onChange={handleChange("first_name")}
                          required
                          style={styless().field}
                        />
                      </div>
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={last_name}
                          name="last_name"
                          placeholder="Last Name"
                          label="Last Name"
                          onChange={handleChange("last_name")}
                          required
                          style={styless().field}
                        />
                      </div>
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={email}
                          name="email"
                          placeholder="Email"
                          label="Email"
                          onChange={handleChange("email")}
                          required
                          style={styless().field}
                        />
                      </div>
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          value={mobile_number}
                          name="mobile_number"
                          placeholder="Mobile Number"
                          label="Mobile Number"
                          required
                          onChange={handleChange("mobile_number")}
                          style={styless().field}
                        />
                      </div>
                    </Grid>
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <TextField
                          type="password"
                          value={password}
                          name="password"
                          placeholder="Password"
                          label="Password"
                          required
                          onChange={handleChange("password")}
                          style={styless().field}
                        />
                      </div>
                    </Grid>
                    {/* <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <Checkbox
                          checked={register_as}
                          onChange={handleChange('register_as')}
                          value='register_as'
                        />
                      </div>
                    </Grid> */}
                    <Grid md={12} sm={12} xs={12} item>
                      <div>
                        <FormControl
                          variant="standard"
                          style={{ width: "100%" }}
                        >
                          <InputLabel>I'm a/an</InputLabel>
                          <Select
                            value={register_as}
                            required
                            onChange={handleChange("register_as")}
                          >
                            <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                            <MenuItem value={"Hirer"}>Hirer</MenuItem>
                            <MenuItem value={"Driver"}>Driver</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginTop: 20 }}
                      // onClick={submit}
                    >
                      Register
                    </Button>
                  </div>
                  {/* </Paper> */}
                </Grid>
              </Grid>
            </div>
          </form>
        </section>
        {/* )} */}
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: "registerForm",
  enableReinitialize: true,
})(RegisterForm);

const RegisterFormMapped = connect((state) => ({
  deco: state.ui.decoration,
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
