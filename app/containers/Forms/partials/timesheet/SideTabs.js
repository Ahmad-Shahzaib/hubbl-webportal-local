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

function AddStaff(props) {
  const {
    classes,
    handleClick,
    submit,
    viewMode,
    submitDisabled,
    active,
    labels,
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
            Days
          </Typography>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(1)}
            style={{ marginBottom: 20 }}
          >
            {active == 1 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[0]}
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
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[1]}
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
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[2]}
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
            style={{ marginBottom: 20 }}
          >
            {active == 4 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[3]}
            />
            {active == 4 && (
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
            onClick={() => handleClick(5)}
            style={{ marginBottom: 20 }}
          >
            {active == 5 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[4]}
            />
            {active == 5 && (
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
            onClick={() => handleClick(6)}
            style={{ marginBottom: 20 }}
          >
            {active == 6 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[5]}
            />
            {active == 6 && (
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
            onClick={() => handleClick(7)}
            style={{ marginBottom: 20 }}
          >
            {active == 7 ? (
              <CalendarTodayIcon style={styles().icon_margin} />
            ) : (
              <CalendarTodayOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={labels[6]}
            />
            {active == 7 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
        </Paper>
      </Grid>
      {!viewMode ? (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          container
          justify="center"
          alignItems="center"
        >
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
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(AddStaff);
