import React, { useState, useEffect } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { getCookie } from "dan-api/cookie";

function SpeedDialComp(props) {
  const { menuPrefix } = props;
  const [isSpeedDial, toggleSpeedDial] = useState(false);
  let perms = getCookie("permissions");
  const _perms = perms ? perms.split(",") : [];

  useEffect(() => {
    if (props.hidden == false) {
      toggleSpeedDial(props.hidden);
    }
  }, [props.hidden]);
  return (
    <SpeedDial
      open={isSpeedDial ? true : false}
      // onFocusCapture={() => toggleSpeedDial(true)}
      // onBlurCapture={() => toggleSpeedDial(false)}
      hidden={props.hidden ? false : true}
      FabProps={{ variant: "extended" }}
      role="menu"
      ariaLabel="Speed Dial"
      direction="right"
      icon={
        <div>
          <SpeedDialIcon
            icon={<SettingsIcon style={{ color: "white" }} />}
            openIcon={<CloseIcon style={{ color: "white" }} />}
          />{" "}
          Actions
        </div>
      }
      onClick={() => toggleSpeedDial(!isSpeedDial)}
      style={{
        position: "fixed",
        left:
          getCookie("layout") == "big-sidebar"
            ? 100 + 16
            : getCookie("layout") == "left-sidebar"
            ? 65 + 16
            : 16,
        bottom: 16,
      }}
    >
      {props.additionalButtons &&
        props.additionalButtons.map((button, index) => (
          <SpeedDialAction
            key={String(index)}
            icon={button.icon}
            tooltipTitle={button.tooltipTitle}
            onClick={button.onClick}
          />
        ))}
      {props.noEditButton ? null : ((_perms.includes("all") ||
          _perms.includes("all_edit") ||
          _perms.includes(menuPrefix + "_all") ||
          _perms.includes(menuPrefix + "_edit")) &&
          getCookie("userType") == "staff") ||
        getCookie("userType") !== "staff" ? (
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle={"Edit"}
          onClick={props.onEdit}
        />
      ) : null}
      {props.noStatusButton ? null : ((_perms.includes("all") ||
          _perms.includes("all_edit") ||
          _perms.includes(menuPrefix + "_all") ||
          _perms.includes(menuPrefix + "_edit")) &&
          getCookie("userType") == "staff") ||
        getCookie("userType") !== "staff" ? (
        <SpeedDialAction
          icon={<AutorenewIcon />}
          tooltipTitle={"Change Status"}
          onClick={props.onStatusChange}
        />
      ) : null}
      {props.noRemoveButton ? null : ((_perms.includes("all") ||
          _perms.includes("all_remove") ||
          _perms.includes(menuPrefix + "_all") ||
          _perms.includes(menuPrefix + "_remove")) &&
          getCookie("userType") == "staff") ||
        getCookie("userType") !== "staff" ? (
        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle={"Remove"}
          onClick={props.onRemove}
        />
      ) : null}
    </SpeedDial>
  );
}

export default SpeedDialComp;
