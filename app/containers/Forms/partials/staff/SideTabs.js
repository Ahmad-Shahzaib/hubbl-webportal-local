import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
//ihasnainbhutta
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import SettingsApplicationsOutlinedIcon from "@material-ui/icons/SettingsApplicationsOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
    // marginTop: 10,
    width: "25%",
    alignItems: "center",
  },
  Btnmargin: {
    marginTop: 10,
    alignItems: "center",
  },
  icon_margin: {
    marginLeft: 15,
    marginRight: 15,
  },
});

function AddStaff(props) {
  const {
    classes,
    handleClick,
    submit,
    active,
    submitDisabled,
    stayHere,
    handleStayHere,
  } = props;

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
            Sections
          </Typography>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(1)}
            style={{ marginBottom: 20 }}
          >
            {active == 1 ? (
              <InfoIcon style={styles().icon_margin} />
            ) : (
              <InfoOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Profile Information"}
            />
            {active == 1 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(2)}
            style={{ marginBottom: 20 }}
          >
            {active == 2 ? (
              <InfoIcon style={styles().icon_margin} />
            ) : (
              <InfoOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Basic Information"}
            />
            {active == 2 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(3)}
            style={{ marginBottom: 20 }}
          >
            {active == 3 ? (
              <AccountBalanceIcon style={styles().icon_margin} />
            ) : (
              <AccountBalanceOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Bank Details"}
            />
            {active == 3 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(4)}
          >
            {active == 4 ? (
              <SettingsApplicationsIcon style={styles().icon_margin} />
            ) : (
              <SettingsApplicationsOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Permissions"}
            />
            {active == 4 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
        </Paper>
      </Grid>
      <Grid item xs={6} md={12} lg={12} container justify="center">
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
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(AddStaff);
