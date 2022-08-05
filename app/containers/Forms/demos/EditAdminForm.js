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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextFieldRedux } from "dan-components/Forms/ReduxFormMUI";
import { initAction, clearAction } from "dan-redux/actions/reduxFormActions";
import UploadInputImg from "./UploadInputImg";
import axios from "axios";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL, IMGURL } from "dan-api/url";
import TextField from "@material-ui/core/TextField";

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = (value) => (value == null ? "Required" : false);
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

function EditAdminForm(props) {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    correspondence_address: "",
    phone_no: "",
    images: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

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

  useEffect(() => {
    // console.log(getCookie("editDataId"));
    getData(getCookie("editDataId"));
  }, []);

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
            images: res.data.admin.profile_image,
          });
        } else {
          toast.warn("Unable to fetch data from Server. Something Went Wrong");
        }
      })
      .catch((err) => {
        toast.error("Server Error!");
      });
  }

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
            <form onSubmit={() => handleSubmit(data)}>
              <Grid md={12} container spacing={2} item>
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
                      className={classes.field}
                    />
                  </div>
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
                      className={classes.field}
                    />
                  </div>
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
                      className={classes.field}
                    />
                  </div>
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
                      className={classes.field}
                    />
                  </div>
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
                      className={classes.field}
                    />
                  </div>
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <UploadInputImg
                      onUpload={(f) => onUpload(f)}
                      text="Drag and drop Profile Image here"
                      files={[IMGURL + data.images]}
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

EditAdminForm.propTypes = {
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
  form: "EditAdmin",
  enableReinitialize: true,
})(EditAdminForm);

const FormInit = connect(
  (state) => ({
    initialValues: state.initval.formValues,
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
