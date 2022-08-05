import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import { getCookie } from "dan-api/cookie";

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
    alignItems: "center",
    justifyContent: "center",
  },
});

function Section4(props) {
  const {
    permissions,
    access_level,
    handleChangeAccess,
    handleChangePerms,
    submitDisabled,
    previous,
    submit,
  } = props;
  const _perms = permissions ? permissions.split(",") : [];

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      justify="center"
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        container
        direction="row"
        justify="space-evenly"
      >
        <Paper style={styles().root}>
          <Grid md={12} container spacing={1} alignItems="center" item>
            <Typography variant="h5" component="h3">
              Permissions
            </Typography>
            <Grid md={4} item style={{ marginLeft: 20 }}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      value="all"
                      checked={_perms.includes("all") ? true : false}
                      onChange={(e, _) => handleChangePerms("all", _, _perms)}
                      color="primary"
                    />
                  }
                  label="All"
                  style={styles().checkbox}
                />
              </div>
            </Grid>
          </Grid>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={1} item>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item />
                    <Grid md={2} container justify="center" item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="all_read"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("all_read")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("all_read", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="View"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="strong">
                        <strong>View</strong>
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="all_create"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("all_create")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("all_create", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Add"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="strong">
                        <strong>Add</strong>
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="all_edit"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("all_edit")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("all_edit", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="strong">
                        <strong>Edit</strong>
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="all_remove"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("all_remove")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("all_remove", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Delete"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="strong">
                        <strong>Delete</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="driver_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("driver_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("driver_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Drivers"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Drivers
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="driver_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("driver_all") ||
                            _perms.includes("driver_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driver_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="driver_create"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_create") ||
                            _perms.includes("driver_all") ||
                            _perms.includes("driver_create")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driver_create", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="driver_edit"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("driver_all") ||
                            _perms.includes("driver_edit")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driver_edit", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="driver_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("driver_all") ||
                            _perms.includes("driver_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driver_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="driverpool_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("driverpool_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("driverpool_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Driver Pool"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Driver Pool
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="driver_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("driverpool_all") ||
                            _perms.includes("driverpool_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driverpool_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="driver_create"
                          checked={false}
                          color="primary"
                          disabled
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="driver_create"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("driverpool_all") ||
                            _perms.includes("driverpool_accept")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driverpool_accept", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="driverpool_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("driverpool_all") ||
                            _perms.includes("driverpool_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("driverpool_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="job_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("job_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("job_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Jobs"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Jobs
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="job_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("job_all") ||
                            _perms.includes("job_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("job_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="job_create"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_create") ||
                            _perms.includes("job_all") ||
                            _perms.includes("job_create")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("job_create", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="job_edit"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("job_all") ||
                            _perms.includes("job_edit")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("job_edit", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="job_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("job_all") ||
                            _perms.includes("job_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("job_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="substitution_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("substitution_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("substitution_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Substitutions"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Substitutions
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="substitution_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("substitution_all") ||
                            _perms.includes("substitution_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("substitution_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="substitution_create"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_create") ||
                            _perms.includes("substitution_all") ||
                            _perms.includes("substitution_create")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("substitution_create", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="substitution_edit"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("substitution_all") ||
                            _perms.includes("substitution_edit")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("substitution_edit", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="substitution_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("substitution_all") ||
                            _perms.includes("substitution_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("substitution_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Timesheets"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Timesheets
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="timesheet_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("timesheet_all") ||
                            _perms.includes("timesheet_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("timesheet_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="timesheet_edit"
                          checked={false}
                          color="primary"
                          disabled={true}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="timesheet_edit"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("timesheet_all") ||
                            _perms.includes("timesheet_edit")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("timesheet_edit", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="timesheet_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("timesheet_all") ||
                            _perms.includes("timesheet_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("timesheet_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid md={4} item>
                      {/* <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="expense_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("expense_all")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("expense_all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Expenses"
                          style={styles().checkbox}
                        />
                      </div> */}
                      <Typography variant="subtitle1" component="p">
                        Expenses
                      </Typography>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="View" placement="right">
                        <Checkbox
                          value="expense_read"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_read") ||
                            _perms.includes("expense_all") ||
                            _perms.includes("expense_read")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("expense_read", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Add" placement="right">
                        <Checkbox
                          value="expense_edit"
                          checked={false}
                          disabled={true}
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Edit" placement="right">
                        <Checkbox
                          value="expense_edit"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_edit") ||
                            _perms.includes("expense_all") ||
                            _perms.includes("expense_edit")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("expense_edit", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid md={2} container justify="center" item>
                      <Tooltip title="Delete" placement="right">
                        <Checkbox
                          value="expense_remove"
                          checked={
                            _perms.includes("all") ||
                            _perms.includes("all_remove") ||
                            _perms.includes("expense_all") ||
                            _perms.includes("expense_remove")
                              ? true
                              : false
                          }
                          onChange={(e, _) =>
                            handleChangePerms("expense_remove", _, _perms)
                          }
                          color="primary"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h5"
                    component="h3"
                    style={{ marginTop: 20 }}
                  >
                    Other Permissions
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    container
                    alignItems="center"
                    justify="space-evenly"
                    style={{ marginTop: 10 }}
                  >
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="drivercalendar_read"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("drivercalendar_read")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms(
                                  "drivercalendar_read",
                                  _,
                                  _perms
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Driver Calendar"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="driverch_read"
                            checked={
                              _perms.includes("all") ||
                              _perms.includes("driverch_read")
                                ? true
                                : false
                            }
                            onChange={(e, _) =>
                              handleChangePerms("driverch_read", _, _perms)
                            }
                            color="primary"
                          />
                        }
                        label="Driver Company House"
                        style={styles().checkbox}
                      />
                    </Grid>
                  </Grid>
                  {getCookie("userType") == "admin" ? (
                    <Typography
                      variant="h5"
                      component="h3"
                      style={{ marginTop: 20 }}
                    >
                      Access Level
                    </Typography>
                  ) : null}
                  {getCookie("userType") == "admin" ? (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      spacing={1}
                      container
                      alignItems="center"
                      justify="space-evenly"
                      style={{ marginTop: 10 }}
                    >
                      {/* <Grid item>
                        <div>
                          <FormControlLabel
                            control={
                              <Radio
                                value="white_label_agency"
                                checked={
                                  access_level == null ||
                                  access_level == "white_label_agency"
                                    ? true
                                    : false
                                }
                                onChange={(e, _) =>
                                  handleChangeAccess("white_label_agency")
                                }
                                color="primary"
                              />
                            }
                            label="White Label Agency"
                            style={styles().checkbox}
                          />
                        </div>
                      </Grid> */}

                      <Grid item>
                        <FormControlLabel
                          control={
                            <Radio
                              value="hgv"
                              checked={
                                access_level == "hgv" ||
                                access_level == null ||
                                access_level == ""
                                  ? true
                                  : false
                              }
                              onChange={(e, _) => handleChangeAccess("hgv")}
                              color="primary"
                            />
                          }
                          label="Default"
                          style={styles().checkbox}
                        />
                      </Grid>

                      <Grid item>
                        <FormControlLabel
                          control={
                            <Radio
                              value="dps"
                              checked={access_level == "dps" ? true : false}
                              onChange={(e, _) => handleChangeAccess("dps")}
                              color="primary"
                            />
                          }
                          label="DPS"
                          style={styles().checkbox}
                        />
                      </Grid>

                      <Grid item>
                        <FormControlLabel
                          control={
                            <Radio
                              value="accounts"
                              checked={
                                access_level == "accounts" ? true : false
                              }
                              onChange={(e, _) =>
                                handleChangeAccess("accounts")
                              }
                              color="primary"
                            />
                          }
                          label="Accounts"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={previous}
                    style={styles().margin}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={submit}
                    style={styles().margin}
                    disabled={submitDisabled}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section4);
