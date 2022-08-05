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

function Section1(props) {
  const {
    allowances,
    allowances_prices,
    allowances_units,
    allowances_totals,
    handleChange,
    next,
    errors,
  } = props;
  const [forms, setForms] = useState([]);

  useEffect(() => {
    let count = 0;
    let unit_count = allowances_units ? allowances_units.split(",") : [];
    let rate_count = allowances_prices ? allowances_prices.split(",") : [];
    let type_count = allowances ? allowances.split(",") : [];
    let total_count = allowances_totals ? allowances_totals.split(",") : [];
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

    // console.log(count);
    let _forms = [];
    for (let i = 0; i < count; i++) {
      let form = {
        unit: "",
        rate: "",
        type: "",
        total: "",
      };
      if (typeof unit_count[i] !== "undefined") {
        form.unit = unit_count[i];
      }

      if (typeof rate_count[i] !== "undefined") {
        form.rate = rate_count[i];
      }
      if (typeof type_count[i] !== "undefined") {
        form.type = type_count[i];
      }
      if (typeof total_count[i] !== "undefined") {
        form.total = total_count[i];
      }
      // console.log(form);
      _forms.push(form);
    }
    setForms(_forms);
  }, [allowances_units]);

  function newRow() {
    setForms([
      ...forms,
      {
        unit: "",
        rate: "",
        type: "",
        total: "",
      },
    ]);
  }

  function removeForm(index) {
    const _forms = forms.filter((_, i) => i !== index);
    handleChange(1, null, index, _forms, null, false);
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
        <Paper style={styles().root}>
          <Typography variant="h5" component="h3">
            Monthly Expenses
          </Typography>
          {forms.map((form, index) => {
            return (
              <Grid
                md={12}
                container
                spacing={2}
                item
                key={index}
                alignItems="center"
              >
                <Grid md={3} sm={3} xs={3} item>
                  <div>
                    <Typography variant="subtitle2" component="p">
                      {form.type}
                    </Typography>
                  </div>
                </Grid>
                <Grid md={4} sm={4} xs={4} item>
                  <div>
                    <TextField
                      value={form.unit}
                      name="unit"
                      placeholder="Unit"
                      label="Unit"
                      onChange={(e) =>
                        handleChange(index, forms, e.target.value)
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
                {/* <Grid md={4} sm={6} xs={6} item>
                  <div>
                    <TextField
                      value={form.rate}
                      name="rate"
                      placeholder="Rate"
                      label="Rate"
                      required
                      inputMode="numeric"
                      onChange={(e) =>
                        handleChange(1, "rate", index, forms, e.target.value)
                      }
                      style={styles().field}
                    />
                  </div>
                </Grid> */}
                <Grid md={4} sm={4} xs={4} item>
                  <div>
                    <TextField
                      value={form.total}
                      name="total"
                      placeholder="Total"
                      label="Total"
                      style={styles().field}
                    />
                  </div>
                </Grid>
                {/* {index ? (
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
                ) : null} */}
              </Grid>
            );
          })}
          <div>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={next}
              style={styles().margin}
            >
              Next
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Section1);
