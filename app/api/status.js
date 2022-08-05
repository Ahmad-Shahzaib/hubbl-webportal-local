import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CachedIcon from "@material-ui/icons/Cached";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import moment from "moment";

export const general = [
  {
    title: "Active",
    value: 1,
    backgroundColor: "#229954",
    icon: <CheckIcon style={{ color: "white" }} />,
  },
  {
    title: "Not Active",
    value: 0,
    backgroundColor: "#C0392B",
    icon: <CloseIcon style={{ color: "white" }} />,
  },
];

export const commands = [
  {
    title: "Approve",
    value: 1,
    backgroundColor: "#229954",
    icon: <CheckIcon style={{ color: "white" }} />,
  },
  {
    title: "Reject",
    value: 0,
    backgroundColor: "#C0392B",
    icon: <CloseIcon style={{ color: "white" }} />,
  },
];

export const jobsStatus = [
  {
    title: "Substituted to a Driver",
    value: 2,
    backgroundColor: "#8E44AD",
    icon: <CachedIcon style={{ color: "white" }} />,
  },
  {
    title: "Approve",
    value: 3,
    backgroundColor: "#229954",
    icon: <CheckIcon style={{ color: "white" }} />,
  },
  {
    title: "Complete",
    value: 4,
    backgroundColor: "#3498DB",
    icon: <DoneAllIcon style={{ color: "white" }} />,
  },
  {
    title: "Reject",
    value: 5,
    backgroundColor: "#C0392B",
    icon: <CloseIcon style={{ color: "white" }} />,
  },
];

export const sheets = [
  {
    title: "Submitted | In Review",
    value: 0,
    backgroundColor: "#8E44AD",
    icon: <CachedIcon style={{ color: "white" }} />,
  },
  {
    title: "Approve",
    value: 1,
    backgroundColor: "#229954",
    icon: <CheckIcon style={{ color: "white" }} />,
  },
  {
    title: "Complete",
    value: 2,
    backgroundColor: "#3498DB",
    icon: <DoneAllIcon style={{ color: "white" }} />,
  },
  {
    title: "Reject",
    value: 3,
    backgroundColor: "#C0392B",
    icon: <CloseIcon style={{ color: "white" }} />,
  },
];

export const downloadOptions = [
  {
    title: "Download Selected Timesheet(s)",
    value: 1,
    backgroundColor: "#27AE60",
    icon: <ArrowDownwardOutlinedIcon style={{ color: "white" }} />,
  },
  {
    title: "Download Timesheets By Week",
    value: 2,
    backgroundColor: "#27AE60",
    icon: <EventOutlinedIcon style={{ color: "white" }} />,
  },
  {
    title: "Download Timesheets By Date",
    value: 4,
    backgroundColor: "#27AE60",
    icon: <EventOutlinedIcon style={{ color: "white" }} />,
  },
  {
    title: "Download All Timesheets",
    value: 3,
    backgroundColor: "#27AE60",
    icon: <CloudDownloadOutlinedIcon style={{ color: "white" }} />,
  },
];

const currentSunday = moment()
  .startOf("week")
  .format("YYYY-MM-DD");

export const dateList = new Array(8).fill(null).map((_, i) => {
  let date = moment(currentSunday)
    .add(-i, "week")
    .format("YYYY-MM-DD");
  return {
    title: date,
    value: date,
    backgroundColor: "#27AE60",
    icon: <EventOutlinedIcon style={{ color: "white" }} />,
  };
});
