import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Field, reduxForm } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
//self
import TextFields from "./TextFields"
//end

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux,
  date,
} from "dan-components/Forms/ReduxFormMUI";
import { initAction, clearAction } from "dan-redux/actions/reduxFormActions";
import UploadInputImg from "./UploadInputImg";

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
    margin: theme.spacing(4),
    textAlign: "center",
  },
});

const initData = {
  text: "Sample Text",
  email: "sample@mail.com",
  radio: "option1",
  selection: "option1",
  onof: true,
  checkbox: true,
  textarea: "This is default text",
};

function AddStaffForm(props) {
  //   const [files, setFiles] = useState([]);
  const trueBool = true;
  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
    init,
    clear,
    onUpload,
  } = props;

  //   useEffect(() => {
  //     if (files.length) {
  //       onUpload(files);
  //     }
  //   }, [files]);

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
                    {/* <Field
                      name="first_name"
                      component={TextFieldRedux}
                      placeholder="First Name"
                      label="First Name"
                      validate={required}
                      required
                      className={classes.field}
                    /> */}

{/* <TextFields/> */}


                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="last_name"
                      component={TextFieldRedux}
                      placeholder="Last Name"
                      label="Last Name"
                      required
                      validate={required}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="sub_domain"
                      component={TextFieldRedux}
                      placeholder="Sub Domain"
                      label="Sub Domain"
                      required
                      validate={required}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="dob"
                      component={TextFieldRedux}
                      placeholder="DD/MM/YY"
                      label="Date of Birth (in format DD/MM/YY)"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="home_address"
                      component={TextFieldRedux}
                      placeholder="Home Address"
                      label="Home Address"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="correspondence_address"
                      component={TextFieldRedux}
                      placeholder="Correspondence address"
                      label="Correspondence address"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="phone_no"
                      component={TextFieldRedux}
                      placeholder="Contact Phone Number"
                      label="Contact Phone Number"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="email"
                      component={TextFieldRedux}
                      placeholder="Personal Email Address"
                      label="Email Address"
                      required
                      validate={[required, email]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="national_insurance"
                      component={TextFieldRedux}
                      placeholder="National Insurance"
                      label="National Insurance"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="employee_number"
                      component={TextFieldRedux}
                      placeholder="Employee Number"
                      label="Employee Number"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="employee_start_date"
                      component={TextFieldRedux}
                      placeholder="dd/mm/yyyy"
                      label="Employee Start Date"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="employee_end_date"
                      component={TextFieldRedux}
                      placeholder="dd/mm/yyyy"
                      label="Employee End Date"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="employee_type"
                      component={TextFieldRedux}
                      placeholder="dd/mm/yyyy"
                      label="Employee Type"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="personal_bank_name"
                      component={TextFieldRedux}
                      placeholder="Personal Bank Name"
                      label="Personal Bank Name"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="bank_sort_code"
                      component={TextFieldRedux}
                      placeholder="Bank Sort Code"
                      label="Bank Sort Code"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="bank_account_number"
                      component={TextFieldRedux}
                      placeholder="Bank Account Number"
                      label="Bank Account Number"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <Field
                      name="profile_image"
                      component={TextFieldRedux}
                      placeholder="Profile Image"
                      label="Profile Image"
                      required
                      validate={[required]}
                      className={classes.field}
                    />
                  </div>
                </Grid>
                
              </Grid>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </Button>
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

AddStaffForm.propTypes = {
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
})(AddStaffForm);

const FormInit = connect(
  (state) => ({
    initialValues: state.initval.formValues,
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
