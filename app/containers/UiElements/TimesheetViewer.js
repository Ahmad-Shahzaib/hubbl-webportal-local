import React, { useState, useEffect } from "react";
import FullScreenDialog from "./demos/DialogModal/FullScreenDialog";
import EditTimesheet from "../../containers/Forms/EditTimesheet";

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
      title="Timesheet Quick View"
    >
      <EditTimesheet viewMode={true} timesheetId={props.timesheetId} />
    </FullScreenDialog>
  );
}

export default TimesheetViewer;
