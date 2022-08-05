import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import brand from "dan-api/dummy/brand";
import styles from "./user-jss";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getCookie } from "dan-api/cookie";
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

function ResetForm(props) {
  const { classes, handleSubmit, deco, otp, handleChange, isLoading } = props;
  return (
    <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
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
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        Verify
      </Typography>
      <Typography
        variant="caption"
        className={classes.subtitle}
        gutterBottom
        align="center"
      >
        An OTP is sent to the mobile number associated with given registered
        email address
      </Typography>
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
                <Grid md={12} container spacing={2} item>
                  <Grid md={12} sm={12} xs={12} item>
                    <div>
                      <TextField
                        value={otp}
                        name="otp"
                        placeholder="OTP"
                        label="OTP"
                        onChange={handleChange("otp")}
                        required
                        type="number"
                        style={styless().field}
                      />
                    </div>
                  </Grid>
                </Grid>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: 20 }}
                    disabled={isLoading}
                  >
                    Verify
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </section>
    </Paper>
  );
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: "resetFrm",
  enableReinitialize: true,
})(ResetForm);

const RegisterFormMapped = connect((state) => ({
  deco: state.ui.decoration,
}))(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
