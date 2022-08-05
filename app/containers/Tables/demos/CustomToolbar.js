import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { getCookie } from "dan-api/cookie";

const defaultToolbarStyles = {
  iconButton: {},
};

function CustomToolbar(props) {
  let perms = getCookie("permissions");
  const _perms = perms ? perms.split(",") : [];
  const { classes, onAdd, menuPrefix } = props;

  return (
    <Tooltip title={"Add"}>
      <IconButton className={classes.iconButton} onClick={onAdd}>
        <AddIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  );
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
