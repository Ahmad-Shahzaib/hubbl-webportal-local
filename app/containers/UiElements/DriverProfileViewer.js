import React, { useState, useEffect } from "react";
import FullScreenDialog from "./demos/DialogModal/FullScreenDialog";
import EditDriver from "../../containers/Forms/EditDriver";

function TimesheetViewer(props) {
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <FullScreenDialog
      open={open}
      onClose={handleClose}
      title="Quick View"
    >
      <EditDriver viewMode={true} driverid={props.driverid} />
    </FullScreenDialog>
  );
}

export default TimesheetViewer;
