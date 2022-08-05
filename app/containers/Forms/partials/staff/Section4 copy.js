import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Checkbox";

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
});

function Section4(props) {
  const {
    permissions,
    handleChangePerms,
    previous,
    submit,
    submitDisabled,
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
          <Typography variant="h5" component="h3">
            Quick Select
          </Typography>
          <form onSubmit={() => {}}>
            <Grid md={12} container spacing={2} item>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          style={{ textAlign: "center" }}
                        >
                          Start Time
                        </Typography>
                      </Grid> */}
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
                              value="all"
                              checked={_perms.includes("all") ? true : false}
                              onChange={(e, _) =>
                                handleChangePerms("all", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="All Permissions"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          style={{ textAlign: "center" }}
                        >
                          Start Time
                        </Typography>
                      </Grid> */}
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
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
                          label="All Read"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
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
                          label="All Create"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
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
                          label="All Edit"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
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
                          label="All Remove"
                          style={styles().checkbox}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Grid md={12} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Drivers & Driver Pool
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        Drivers
                      </Typography>
                    </Grid> */}
                    <Grid item>
                      <div>
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
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      spacing={3}
                      container
                      alignItems="center"
                      justify="space-evenly"
                    >
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Read"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Create"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Remove"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            value="driver_read"
                            checked={
                              _perms.includes("all") ||
                              _perms.includes("all_read") ||
                              _perms.includes("driver_all") ||
                              _perms.includes("driverpool_read")
                                ? true
                                : false
                            }
                            onChange={(e, _) =>
                              handleChangePerms("driverpool_read", _, _perms)
                            }
                            color="primary"
                          />
                        }
                        label="Driver Pool Read"
                        style={styles().checkbox}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            value="driver_create"
                            checked={
                              _perms.includes("all") ||
                              _perms.includes("driver_all") ||
                              _perms.includes("driverpool_accept")
                                ? true
                                : false
                            }
                            onChange={(e, _) =>
                              handleChangePerms("driverpool_accept", _, _perms)
                            }
                            color="primary"
                          />
                        }
                        label="Driver Pool Accept"
                        style={styles().checkbox}
                      />
                    </Grid>
                    {/* <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </Grid> */}
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            value="driverpool_remove"
                            checked={
                              _perms.includes("all") ||
                              _perms.includes("all_remove") ||
                              _perms.includes("driver_all") ||
                              _perms.includes("driverpool_remove")
                                ? true
                                : false
                            }
                            onChange={(e, _) =>
                              handleChangePerms("driverpool_remove", _, _perms)
                            }
                            color="primary"
                          />
                        }
                        label="Driver Pool Remove"
                        style={styles().checkbox}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={6} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Jobs
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        Jobs
                      </Typography>
                    </Grid> */}
                    <Grid item>
                      <div>
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
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Read"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Create"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Remove"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={6} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Substitution
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        Jobs
                      </Typography>
                    </Grid> */}
                    <Grid item>
                      <div>
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
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                                handleChangePerms(
                                  "substitution_read",
                                  _,
                                  _perms
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Read"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                                handleChangePerms(
                                  "substitution_create",
                                  _,
                                  _perms
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Create"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                                handleChangePerms(
                                  "substitution_edit",
                                  _,
                                  _perms
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                                handleChangePerms(
                                  "substitution_remove",
                                  _,
                                  _perms
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Remove"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={12} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Timesheets
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                    direction="row"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        Jobs
                      </Typography>
                    </Grid> */}
                    <Grid item>
                      <div>
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
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_1a")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_1a", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="HGV Accountancy Paid"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_1b")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_1b", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Driver Own (Self Paid)"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_2a")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_2a", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Invoice Managed By The Driver"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_2b")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_2b", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Agency Self Bill"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_all"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_3a")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_3a", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Enhanced Driver"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                    <div>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Read"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Edit"
                          style={styles().checkbox}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
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
                          }
                          label="Remove"
                          style={styles().checkbox}
                        />
                      </Grid>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={6} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Monthly Expenses
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <Grid md={2} sm={12} xs={12} item>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        Jobs
                      </Typography>
                    </Grid> */}
                    <Grid item>
                      <div>
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
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    justify="space-evenly"
                  >
                    {/* <div> */}
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
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
                        }
                        label="Read"
                        style={styles().checkbox}
                      />
                    </Grid>
                    {/* <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              value="timesheet_create"
                              checked={
                                _perms.includes("all") ||
                                _perms.includes("all_create") ||
                                _perms.includes("timesheet_all") ||
                                _perms.includes("timesheet_create")
                                  ? true
                                  : false
                              }
                              onChange={(e, _) =>
                                handleChangePerms("timesheet_create", _, _perms)
                              }
                              color="primary"
                            />
                          }
                          label="Create"
                          style={styles().checkbox}
                        />
                      </Grid> */}
                    {/* </div>
                    <div> */}
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
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
                        }
                        label="Edit"
                        style={styles().checkbox}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
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
                        }
                        label="Remove"
                        style={styles().checkbox}
                      />
                    </Grid>
                    {/* </div> */}
                  </Grid>
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={6} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <Typography variant="h5" component="h3">
              Other Permissions
            </Typography>
            <form onSubmit={() => {}}>
              <Grid md={12} sm={12} xs={12} item>
                <div style={{ width: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    // justify="space-evenly"
                  >
                    <Grid item>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
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
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={3}
                    container
                    alignItems="center"
                    // justify="space-evenly"
                  >
                    {/* <div> */}
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
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
                </div>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid md={12} container spacing={2} item>
          <Paper style={{ ...styles().root, ...{ marginTop: 20 } }}>
            <div>
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
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section4);
