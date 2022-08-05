import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

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
    props.onClose({ type: false });
    setOpen(false);
  }
  function handleClose2() {
    props.onClose({ type: true });
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.noDisagreeButton ? null : (
            <Button onClick={handleClose} color="primary">
              {props.disagreeBtnTitle ? props.disagreeBtnTitle : "Disagree"}
            </Button>
          )}
          {props.noAgreeButton ? null : (
            <Button onClick={handleClose2} color="primary" autoFocus>
              {props.agreeBtnTitle ? props.agreeBtnTitle : "Agree"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
