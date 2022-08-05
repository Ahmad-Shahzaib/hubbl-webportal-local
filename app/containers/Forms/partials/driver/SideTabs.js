import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import PetsIcon from "@material-ui/icons/Pets";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import AttachmentIcon from "@material-ui/icons/Attachment";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  attachment: {
    flexGrow: 1,
    padding: 30,
    margin: 10,
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
    handleClick,
    active,
    submit,
    viewMode,
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
            Driver
          </Typography>
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            onClick={() => handleClick(1)}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            {active == 1 ? (
              <InfoIcon style={styles().icon_margin} />
            ) : (
              <InfoOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              inset={false}
              primary={"Personal Information"}
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
              <AccountBalanceIcon style={styles().icon_margin} />
            ) : (
              <AccountBalanceOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Bank Information"}
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
              <ReceiptIcon style={styles().icon_margin} />
            ) : (
              <ReceiptOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"B2B Operation"}
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
              <PetsIcon style={styles().icon_margin} />
            ) : (
              <PetsOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Legal"}
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
            activeClassName={classes.active}
            onClick={() => handleClick(5)}
            style={{ marginBottom: 20 }}
          >
            {active == 5 ? (
              <AttachmentIcon style={styles().icon_margin} />
            ) : (
              <AttachmentOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"Attachments"}
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
            activeClassName={classes.active}
            onClick={() => handleClick(6)}
          >
            {active == 6 ? (
              <InfoIcon style={styles().icon_margin} />
            ) : (
              <InfoOutlinedIcon style={styles().icon_margin} />
            )}
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={"General Information"}
            />
            {active == 6 && (
              <Chip
                color="primary"
                label={"Active"}
                className={classes.badge}
              />
            )}
          </ListItem>
        </Paper>
      </Grid>
      {viewMode ? null : (
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
            style={styles().checkbox}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default withStyles(styles)(SideTabs);
