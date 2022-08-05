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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
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
    marginLeft: 10,
    marginRight: 10,
  },
  checkbox: {
    marginLeft: 10,
  },
});

function SideTabs(props) {
  const { classes, active, attachments } = props;

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
            Attachments
          </Typography>
          {attachments
            ? attachments.map((item, index) => (
                <ListItem
                  button
                  key={String(index)}
                  className={classes.nested}
                  activeClassName={classes.active}
                  onClick={() => item.onClick(index)}
                  style={{ marginBottom: 20, marginTop: 20 }}
                >
                  {active == index ? (
                    <AttachmentIcon style={styles().icon_margin} />
                  ) : (
                    <AttachmentOutlinedIcon style={styles().icon_margin} />
                  )}
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset={false}
                    primary={item.title}
                  />
                  <Tooltip title={"Delete"}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={item.onDelete}
                    >
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))
            : null}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SideTabs);
