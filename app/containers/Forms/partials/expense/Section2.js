import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";

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
  const { previous, next, errors } = props;

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
            Use of home as office
          </Typography>
          <Grid md={12} container spacing={2} item alignItems="center">
            <Grid md={3} sm={3} xs={3} item>
              <div>
                <Typography variant="subtitle2" component="p">
                  Home Office Allowance (£26)
                </Typography>
              </div>
            </Grid>
            <Grid md={4} sm={4} xs={4} item>
              <div>
                <TextField
                  value={1}
                  name="unit"
                  placeholder="Unit"
                  label="Unit"
                  disabled
                  style={styles().field}
                />
              </div>
            
            </Grid>
            <Grid md={4} sm={4} xs={4} item>
              <div>
                <TextField
                  value={"£26"}
                  name="total"
                  placeholder="Total"
                  label="Total"
                  disabled
                  style={styles().field}
                />
              </div>
            </Grid>
          </Grid>
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
