import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Brightness5 from "@material-ui/icons/Brightness5";
import People from "@material-ui/icons/People";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.png";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";
import { ContentDivider } from "../Divider";
import { platformConfig } from "dan-api/platformConfig";
import { getCookie } from "dan-api/cookie";

// validation functions
const required = (value) => (value === null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
    isLoading,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="#" className={classNames(classes.brand, classes.outer)}>
          {/* <img src={logo} alt={brand.name} style={{width: 100, height: 50}}  /> */}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          {/* >>> LoginFormLogo */}
          <div className={classes.topBar}>
            <img
              src={
                getCookie("type") && getCookie("type") == "dark"
                  ? platformConfig.white_logo
                  : platformConfig.black_logo
              }
              alt={brand.name}
              style={platformConfig.loginLogoStyle}
              onClick={() => window.open("#")}
            />
            {/* <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/register"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              Create new account
            </Button> */}
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Sign In
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        >
          Welcome Back
        </Typography>
        <section className={classes.socmedLogin}>
          <ContentDivider content="Enter Your Login Credentials" />
        </section>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="username"
                  component={TextFieldRedux}
                  autoFocus={true}
                  placeholder="Your Email"
                  label="Your Email"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? "text" : "password"}
                  label="Your Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.optArea}>
              {/* <FormControlLabel className={classes.label} control={<Field name="checkbox" component={CheckboxRedux} />} label="Remember" /> */}
              <Button
                size="small"
                component={LinkBtn}
                to="/reset-password"
                className={classes.buttonLink}
              >
                Forgot Password
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={isLoading ? true : false}
              >
                Continue
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: "loginForm",
  enableReinitialize: true,
})(LoginForm);

const FormInit = connect((state) => ({
  force: state,
  initialValues: state.login.usersLogin,
  deco: state.ui.decoration,
}))(LoginFormReduxed);

export default withStyles(styles)(FormInit);
