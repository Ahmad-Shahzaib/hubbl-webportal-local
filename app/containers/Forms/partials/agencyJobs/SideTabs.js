import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import WorkIcon from "@material-ui/icons/Work";
import WorkOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
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

function SideTabs(props) {
  const {
    classes,
    status,
    handleClick,
    submit,
    active,
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
            New Job
          </Typography>
          <ListItem
            button
            exact
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
              primary={"Title & Description"}
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
            exact
            className={classes.nested}
            activeClassName={classes.active}
            onClick={() => handleClick(2)}
            style={{ marginBottom: 20 }}
          >
            {active == 2 ? (
              <WorkIcon style={styles().icon_margin} />
            ) : (
              <WorkOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Job Details"}
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
            exact
            className={classes.nested}
            activeClassName={classes.active}
            onClick={() => handleClick(3)}
            style={{ marginBottom: 20 }}
          >
            {active == 3 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Job Starting Details"}
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
            exact
            className={classes.nested}
            activeClassName={classes.active}
            onClick={() => handleClick(4)}
            style={{ marginBottom: 20 }}
          >
            {active == 4 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Job Ending Details"}
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
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justify="center"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => submit("Publish")}
          disabled={submitDisabled}
          style={{ ...styles().margin, ...{ marginRight: 10 } }}
        >
          Publish
        </Button>
        {status ? null : (
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => submit("Draft")}
            disabled={submitDisabled}
            style={styles().margin}
          >
            Draft
          </Button>
        )}
        <Grid item md={6}>
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
    </Grid>
  );
}

export default withStyles(styles)(SideTabs);
