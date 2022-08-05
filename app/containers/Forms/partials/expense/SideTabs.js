import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
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
  checkbox: {
    marginLeft: 10,
  },
});

function AddStaff(props) {
  const {
    classes,
    handleClick,
    active,
    submit,
    submitDisabled,
    stayHere,
    onStayHere,
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
              <AccountBalanceWalletIcon style={styles().icon_margin} />
            ) : (
              <AccountBalanceWalletOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Monthly Expenses"}
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
              <HomeWorkIcon style={styles().icon_margin} />
            ) : (
              <HomeWorkOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Use of home as office"}
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
              <LocalShippingIcon style={styles().icon_margin} />
            ) : (
              <LocalShippingOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Travel Expenses"}
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
              <AssignmentIcon style={styles().icon_margin} />
            ) : (
              <AssignmentOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Other Expenses"}
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
              onChange={onStayHere}
              color="primary"
            />
          }
          label="Stay on this page"
          style={styles().checkbox}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(AddStaff);
