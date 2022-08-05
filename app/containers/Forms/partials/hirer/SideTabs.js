import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
import CallIcon from "@material-ui/icons/Call";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Button from "@material-ui/core/Button";
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

function SideTabs(props) {
  const {
    classes,
    handleClick,
    submit,
    active,
    submitDisabled,
    stayHere,
    onStayHere,
    is_portal,
    handleIsPortal,
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
          <Grid
            item
            container
            xs={12}
            md={12}
            lg={12}
            alignItems="center"
            direction="row"
            justify="space-between"
          >
            <Typography variant="h5" component="h3">
              Sections
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  value="checkedD"
                  checked={is_portal == 1 ? true : false}
                  onChange={handleIsPortal}
                  color="primary"
                />
              }
              label="Activate Portal"
              style={{ marginLeft: 10 }}
            />
          </Grid>
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            onClick={() => handleClick(1)}
            style={{ marginBottom: 20 }}
          >
            {active == 1 ? (
              <BusinessCenterIcon style={styles().icon_margin} />
            ) : (
              <BusinessCenterOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Company Details"}
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
            activeClassName={classes.active}
            onClick={() => handleClick(2)}
            style={{ marginBottom: 20 }}
          >
            {active == 2 ? (
              <ContactMailIcon style={styles().icon_margin} />
            ) : (
              <ContactMailOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Address Details"}
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
            activeClassName={classes.active}
            onClick={() => handleClick(3)}
            style={{ marginBottom: 20 }}
          >
            {active == 3 ? (
              <CallIcon style={styles().icon_margin} />
            ) : (
              <CallOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Contact Details"}
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
            activeClassName={classes.active}
            onClick={() => handleClick(4)}
            style={{ marginBottom: 20 }}
          >
            {active == 4 ? (
              <AccountBoxIcon style={styles().icon_margin} />
            ) : (
              <AccountBoxOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Bio & Other Details"}
            />
            {active == 4 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
          {is_portal == 1 ? (
            <ListItem
              button
              className={classes.nested}
              activeClassName={classes.active}
              onClick={() => handleClick(5)}
            >
              {active == 5 ? (
                <DashboardIcon style={styles().icon_margin} />
              ) : (
                <DashboardOutlinedIcon style={styles().icon_margin} />
              )}
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={"Portal Details"}
              />
              {active == 5 && (
                <Chip
                  color="primary"
                  label={"Active"}
                  className={classes.badge}
                />
              )}
            </ListItem>
          ) : null}
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12} container justify="center">
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
          style={{ marginLeft: 10 }}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SideTabs);
