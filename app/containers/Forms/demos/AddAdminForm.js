import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextFieldRedux } from "dan-components/Forms/ReduxFormMUI";
import { initAction, clearAction } from "dan-redux/actions/reduxFormActions";
import UploadInputImg from "./UploadInputImg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = (value) => (value == null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

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
    textAlign: "center",
  },
});

function AddAdminForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    onUpload,
    submitDisabled,
    stayHere,
    handleStayHere,
    isSuccess,
  } = props;

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justify="center"
      >
        <Grid item xs={12} md={10} lg={8}>
          <Paper className={classes.root}>
            <form onSubmit={handleSubmit}>
              <Grid md={12} container spacing={2} item>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="first_name"
                      component={TextFieldRedux}
                      type="text"
                      placeholder="First Name"
                      label="First Name"
                      validate={required}
                      required
                      className={classes.field}
                    />
                  </div>
                  {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    First Name
                    {errors.first_name}
                  </Typography> */}
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="last_name"
                      component={TextFieldRedux}
                      type="text"
                      placeholder="Last Name"
                      label="Last Name"
                      required
                      validate={required}
                      className={classes.field}
                    />
                  </div>
                  {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    Last Name
                    {errors.last_name}
                  </Typography> */}
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="phone_no"
                      component={TextFieldRedux}
                      type="number"
                      placeholder="Contact Phone Number"
                      label="Contact Phone Number"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                  {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    Contact Phone Number
                    {errors.phone_no}
                  </Typography> */}
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="email"
                      component={TextFieldRedux}
                      type="text"
                      placeholder="Personal Email Address"
                      label="Email Address"
                      required
                      validate={[required, email]}
                      className={classes.field}
                    />
                  </div>
                  {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    Personal Email Address
                    {errors.phone_no}
                  </Typography> */}
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="correspondence_address"
                      component={TextFieldRedux}
                      type="text"
                      placeholder="Correspondence Address"
                      label="Correspondence Address"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                  {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    Correspondence Address
                    {errors.phone_no}
                  </Typography> */}
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <UploadInputImg
                      onUpload={(f) => onUpload(f)}
                      text="Drag and drop Profile Image here"
                    />
                  </div>
                </Grid>
              </Grid>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      value="checkedD"
                      checked={stayHere ? true : false}
                      onChange={handleStayHere}
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
  );
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

AddAdminForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: "reduxFormDemo",
  enableReinitialize: true,
})(AddAdminForm);

const FormInit = connect(
  (state) => ({
    initialValues: state.initval.formValues,
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
