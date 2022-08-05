import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 5,
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

function Section7(props) {
  const {
    invoice_type,
    day7_units,
    day7_unit_type,
    day7_unit_rate,
    day7_total,
    day7_start_time_hours,
    day7_start_time_mins,
    day7_finish_time_hours,
    day7_finish_time_mins,
    day7_break_time_hours,
    day7_break_time_mins,
    day7_shift,
    day7_payable_amount,
    client,
    depot,
    label,
    handleChange,
    handleChangeCD,
    previous,
    viewMode,
    errors,
  } = props;
  const [forms, setForms] = useState([]);
  let hTypes = [
    "Day Rate",
    "Miscellaneous",
    "Night Out",
    "Not Worked",
    "O/T Hours",
    "Parking",
    "Standard Hours",
    "Toll",
  ];
  if (invoice_type == "Enhanced Driver") {
    hTypes = [
      "Day Rate",
      "Miscellaneous",
      "Night Out",
      "Not Worked",
      "O/T Hours",
      "Parking",
      "Shift",
      "Standard Hours",
      "Toll",
    ];
  }
  const hourTypes = new Array(8).fill(null).map((_, i) => ({
    title: hTypes[i],
    type: i + 1,
  }));
  const shifts = ["Full Shift", "Half Shift"];

  const clockHours = new Array(24).fill(null).map((_, i) => String(i));
  const clockMinutes = new Array(4).fill(null).map((_, i) => String(i * 15));

  const _client = client ? client.split(",") : ["", "", "", "", "", "", ""];
  const _depot = depot ? depot.split(",") : ["", "", "", "", "", "", ""];

  useEffect(() => {
    let count = 0;
    let unit_count = day7_units ? day7_units.split(",") : [];
    let rate_count = day7_unit_rate ? day7_unit_rate.split(",") : [];
    let type_count = day7_unit_type ? day7_unit_type.split(",") : [];
    let total_count = day7_total ? day7_total.split(",") : [];
    let start_hours = day7_start_time_hours
      ? day7_start_time_hours.split(",")
      : [];
    let start_mins = day7_start_time_mins
      ? day7_start_time_mins.split(",")
      : [];
    let finish_hours = day7_finish_time_hours
      ? day7_finish_time_hours.split(",")
      : [];
    let finish_mins = day7_finish_time_mins
      ? day7_finish_time_mins.split(",")
      : [];
    let break_hours = day7_break_time_hours
      ? day7_break_time_hours.split(",")
      : [];
    let break_mins = day7_break_time_mins
      ? day7_break_time_mins.split(",")
      : [];
    let shift = day7_shift ? day7_shift.split(",") : [];
    let payable_amount = day7_payable_amount
      ? day7_payable_amount.split(",")
      : [];
    if (
      unit_count.length >= type_count.length &&
      unit_count.length >= rate_count.length
    ) {
      count = unit_count.length;
    } else if (
      type_count.length >= unit_count.length &&
      type_count.length >= rate_count.length
    ) {
      count = type_count.length;
    } else if (
      rate_count.length >= unit_count.length &&
      rate_count.length >= type_count.length
    ) {
      count = rate_count.length;
    }

    let _forms = [];
    for (let i = 0; i < count; i++) {
      let form = {
        unit: "",
        rate: "",
        type: "",
        total: "",
        start_hours: "",
        start_mins: "",
        finish_hours: "",
        finish_mins: "",
        break_hours: "",
        break_mins: "",
        shift: "",
        payable_amount: "",
      };
      if (typeof unit_count[i] !== "undefined") {
        form.unit = unit_count[i];
      }
      if (typeof rate_count[i] !== "undefined") {
        form.rate = rate_count[i];
      }
      if (typeof type_count[i] !== "undefined") {
        if (type_count[i] == "Shift") {
          form.rate = 1;
        }
        form.type = type_count[i];
      }
      if (typeof total_count[i] !== "undefined") {
        form.total = total_count[i];
      }
      if (typeof start_hours[i] !== "undefined") {
        form.start_hours = start_hours[i];
      }
      if (typeof start_mins[i] !== "undefined") {
        form.start_mins = start_mins[i];
      }
      if (typeof finish_hours[i] !== "undefined") {
        form.finish_hours = finish_hours[i];
      }
      if (typeof finish_mins[i] !== "undefined") {
        form.finish_mins = finish_mins[i];
      }
      if (typeof break_hours[i] !== "undefined") {
        form.break_hours = break_hours[i];
      }
      if (typeof break_mins[i] !== "undefined") {
        form.break_mins = break_mins[i];
      }
      if (typeof shift[i] !== "undefined") {
        form.shift = shift[i];
      }
      if (typeof payable_amount[i] !== "undefined") {
        form.payable_amount = payable_amount[i];
      }
      _forms.push(form);
    }
    setForms(_forms);
  }, [
    day7_units,
    day7_unit_type,
    day7_unit_rate,
    day7_start_time_hours,
    day7_start_time_mins,
    day7_finish_time_hours,
    day7_finish_time_mins,
    day7_break_time_hours,
    day7_break_time_mins,
    day7_shift,
    day7_payable_amount,
  ]);

  function newRow() {
    setForms([
      ...forms,
      {
        unit: "",
        rate: "",
        type: "",
        total: "",
        start_hours: "",
        start_mins: "",
        finish_hours: "",
        finish_mins: "",
        break_hours: "",
        break_mins: "",
        shift: "",
        payable_amount: "",
      },
    ]);
  }

  function removeForm(index) {
    const _forms = forms.filter((_, i) => i !== index);
    handleChange(7, null, index, _forms, null, false);
    setForms(_forms);
  }

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      justify="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Paper style={{ ...styles().root, ...{ marginBottom: 20 } }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            container
            alignItems="center"
            style={{ marginBottom: 20 }}
          >
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              container
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <Typography variant="h5" component="h3">
                {label}
              </Typography>
              {!viewMode ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => newRow()}
                  style={styles().margin}
                >
                  Add New Row
                </Button>
              ) : null}
            </Grid>
            <Grid item xs={12} md={12} lg={12} spacing={3} container>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={_client[6]}
                    name="client"
                    placeholder="Client"
                    label="Client"
                    disabled={viewMode}
                    onChange={(e) =>
                      handleChangeCD("client", 6, _client, e.target.value)
                    }
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={6} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={_depot[6]}
                    name="depot"
                    placeholder="depot"
                    label="Depot"
                    disabled={viewMode}
                    onChange={(e) =>
                      handleChangeCD("depot", 6, _depot, e.target.value)
                    }
                    style={styles().field}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {forms.map((form, index) => {
          return (
            <Paper
              key={index}
              style={{ ...styles().root, ...{ marginBottom: 20 } }}
            >
              <Grid
                md={12}
                container
                spacing={2}
                item
                key={index}
                alignItems="center"
              >
                {form.type == "Shift" ? null : (
                  <Grid md={2} sm={12} xs={12} item>
                    <div>
                      <TextField
                        value={form.unit}
                        name="unit"
                        placeholder="Unit"
                        label="Unit"
                        disabled={viewMode}
                        onChange={(e) =>
                          handleChange(7, "unit", index, forms, e.target.value)
                        }
                        required
                        style={styles().field}
                      />
                    </div>
                    {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    {errors.unit}
                  </Typography> */}
                  </Grid>
                )}
                <Grid md={form.type == "Shift" ? 7 : 3} sm={12} xs={12} item>
                  <div>
                    <FormControl variant="standard" style={styles().field}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        disabled={viewMode}
                        value={
                          form.type == "Miscellaneuos"
                            ? "Miscellaneous"
                            : form.type
                        }
                        onChange={(e) =>
                          handleChange(7, "type", index, forms, e.target.value)
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {hourTypes.map((item, i) => {
                          return (
                            <MenuItem value={item.title} key={i}>
                              {item.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                {form.type == "Shift" ? null : (
                  <Grid md={2} sm={12} xs={12} item>
                    <div>
                      <TextField
                        disabled={viewMode}
                        value={form.rate}
                        name="rate"
                        placeholder="Rate"
                        label="Rate"
                        required
                        inputMode="numeric"
                        onChange={(e) =>
                          handleChange(7, "rate", index, forms, e.target.value)
                        }
                        style={styles().field}
                      />
                    </div>
                    {/* <Typography
                    style={{ fontSize: 13, marginTop: -15, color: "red" }}
                  >
                    {errors.rate}
                  </Typography> */}
                  </Grid>
                )}
                <Grid md={3} sm={12} xs={12} item>
                  <div>
                    <TextField
                      disabled={viewMode}
                      value={form.total}
                      name="total"
                      placeholder="Total"
                      label="Total"
                      style={styles().field}
                    />
                  </div>
                </Grid>
                {index && !viewMode ? (
                  <Grid md={2} sm={12} xs={12} item>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => removeForm(index)}
                        style={styles().margin}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </Grid>
                ) : null}
                {form.type == "Shift" ? (
                  <Grid md={7} sm={12} xs={12} item>
                    <div>
                      <FormControl variant="standard" style={styles().field}>
                        <InputLabel>Shift</InputLabel>
                        <Select
                          disabled={viewMode}
                          value={form.shift}
                          onChange={(e) =>
                            handleChange(
                              7,
                              "shift",
                              index,
                              forms,
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {shifts.map((item, i) => {
                            return (
                              <MenuItem value={item} key={i}>
                                {item}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                ) : null}
                {form.type == "Shift" ? (
                  <Grid md={3} sm={12} xs={12} item>
                    <div>
                      <TextField
                        value={form.unit}
                        name="Payable Amount"
                        placeholder="Payable Amount"
                        label="Payable Amount"
                        disabled={viewMode}
                        onChange={(e) =>
                          handleChange(7, "unit", index, forms, e.target.value)
                        }
                        required
                        style={styles().field}
                      />
                    </div>
                  </Grid>
                ) : null}
                {form.type == "Standard Rate" ||
                form.type == "Standard Hours" ||
                form.type == "Day Rate" ? (
                  <div style={{ width: "100%" }}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      spacing={3}
                      container
                      alignItems="center"
                    >
                      <Grid md={2} sm={12} xs={12} item>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          style={{ textAlign: "center" }}
                        >
                          Start Time
                        </Typography>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Hours</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={form.start_hours}
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "start_hours",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockHours.map((item, i) => {
                                return (
                                  <MenuItem value={item} key={i}>
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    {item > 1 ? "Hours" : "Hour"}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Minutes</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={form.start_mins}
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "start_mins",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockMinutes.map((item, i) => {
                                return (
                                  <MenuItem value={item} key={i}>
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    Minutes
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
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
                    >
                      <Grid md={2} sm={12} xs={12} item>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          style={{ textAlign: "center" }}
                        >
                          Finish Time
                        </Typography>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Hours</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={form.finish_hours}
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "finish_hours",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockHours.map((item, i) => {
                                return (
                                  <MenuItem
                                    value={item.length == 1 ? "0" + item : item}
                                    key={i}
                                  >
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    {item > 1 ? "Hours" : "Hour"}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Minutes</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={form.finish_mins}
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "finish_mins",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockMinutes.map((item, i) => {
                                return (
                                  <MenuItem value={item} key={i}>
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    Minutes
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
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
                    >
                      <Grid md={2} sm={12} xs={12} item>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          style={{ textAlign: "center" }}
                        >
                          Break Hours/Minutes
                        </Typography>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Hours</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={form.break_hours}
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "break_hours",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockHours.map((item, i) => {
                                return (
                                  <MenuItem
                                    value={item.length == 1 ? "0" + item : item}
                                    key={i}
                                  >
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    {item > 1 ? "Hours" : "Hour"}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid md={4} sm={12} xs={12} item>
                        <div>
                          <FormControl
                            variant="standard"
                            style={styles().field}
                          >
                            <InputLabel>Minutes</InputLabel>
                            <Select
                              disabled={viewMode}
                              value={
                                form.break_mins == "0" ? "00" : form.break_mins
                              }
                              onChange={(e) =>
                                handleChange(
                                  7,
                                  "break_mins",
                                  index,
                                  forms,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {clockMinutes.map((item, i) => {
                                return (
                                  <MenuItem
                                    value={item.length == 1 ? "0" + item : item}
                                    key={i}
                                  >
                                    {item.length == 1 ? "0" + item : item}{" "}
                                    Minutes
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                ) : null}
              </Grid>
            </Paper>
          );
        })}
        <div>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={previous}
            style={styles().margin}
          >
            Previous
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section7);
