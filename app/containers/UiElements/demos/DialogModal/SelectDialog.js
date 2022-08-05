import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

const SimpleDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { classes, onClose, selectedValue, ...other } = props;

  useEffect(() => {
    if (props.open && isReady) {
      handleClickOpen();
    } else {
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [props.open]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    onClose({ title: null, value: null });
  }

  function handleListItemClick(item) {
    onClose(item);
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle style={{ paddingRight: 200 }} id="simple-dialog-title">
        {props.title}
      </DialogTitle>
      <div>
        <List>
          {props.statuslist.map((item) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item)}
              key={item.value}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: item.backgroundColor }}>
                  {item.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleDialog);

function SelectDialog() {
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <div>
      <Grid container justify="center" direction="column">
        <Typography variant="subtitle1">
          Selected:&nbsp;
          <strong>{selectedValue}</strong>
        </Typography>
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleClickOpen()}
        >
          Open simple dialog
        </Button>
        <SimpleDialogWrapped
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </div>
  );
}

// export default SelectDialog;
