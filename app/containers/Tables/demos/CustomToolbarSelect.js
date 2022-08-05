import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { withStyles } from "@material-ui/core/styles";
import { getCookie } from "dan-api/cookie";

const defaultToolbarStyles = {
  iconButton: {},
};

class CustomToolbarSelect extends React.Component {
  render() {
    const {
      classes,
      noStatusButton,
      noEditButton,
      noDeleteButton,
      numSelected,
      additionalButtons,
      menuPrefix,
    } = this.props;
    let perms = getCookie("permissions");
    const _perms = perms ? perms.split(",") : [];
    return (
      <React.Fragment>
        <div>
          {additionalButtons &&
            additionalButtons.map((button, index) => (
              <Tooltip key={String(index)} title={button.tooltipTitle}>
                <IconButton
                  className={classes.iconButton}
                  onClick={button.onClick}
                  style={{ marginLeft: 3, marginRight: 3 }}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            ))}
          {noEditButton ? null : (
            <Tooltip title={"Edit"}>
              <IconButton
                className={classes.iconButton}
                onClick={this.props.onEdit}
              >
                <EditIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
          )}
          {noStatusButton ? null : (
            <Tooltip title={"Change Status"}>
              <IconButton
                className={classes.iconButton}
                onClick={this.props.onStatusChange}
              >
                <AutorenewIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
          )}
          {noDeleteButton ? null : (
            <Tooltip title={"Delete"}>
              <IconButton
                className={classes.iconButton}
                onClick={this.props.onDelete}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "CustomToolbarSelect",
})(CustomToolbarSelect);
