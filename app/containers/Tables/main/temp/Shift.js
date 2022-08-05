import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import Receipt from "@material-ui/icons/Receipt";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Grid from "@material-ui/core/Grid";
import { sheets, downloadOptions, dateList } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import TimesheetViewer from "../../UIElements/TimesheetViewer";
import { platformConfig } from "dan-api/platformConfig";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function Shift(props) {
  const title = brand.name + " - Timesheets";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [limit, setlimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const history = useHistory();
  const defaultDialog = {
    open: false,
    onClose: () => {},
    title: "",
    text: "",
    agreeBtnTitle: "",
    disagreeBtnTitle: "",
  };
  const defaultSelectDialog = {
    open: false,
    onClose: () => {},
    title: "Change Status",
    statuslist: sheets,
  };
  const defaultTimesheetConfig = {
    open: false,
    onClose: () => {},
    timesheetId: "",
  };
  const defaultDownloadConfig = {
    open: false,
    onClose: () => {},
    title: "Select Download Option",
    statuslist: downloadOptions,
  };
  const defaultDateConfig = {
    open: false,
    onClose: () => {},
    title: "Select Week to download the Timesheets",
    statuslist: dateList,
  };
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);
  const [timesheetConfig, setTimesheetConfig] = useState(
    defaultTimesheetConfig
  );
  const additionalButtons = [
    {
      tooltipTitle: "Timesheet Quick View",
      icon: <VisibilityIcon />,
      onClick: () => {
        if (dataIDs.length == 1) {
          setTimesheetConfig({
            open: true,
            timesheetId: dataIDs[0],
            onClose: () => setTimesheetConfig(defaultTimesheetConfig),
          });
        } else {
          setDialog({
            open: true,
            title: "Exception!",
            text: "Please select one timesheet to view it",
            noAgreeButton: true,
            disagreeBtnTitle: "OK",
            onClose: ({ type }) => {
              setDialog(defaultDialog);
            },
          });
        }
      },
    },
    {
      tooltipTitle: "Download Timesheets in a excel file",
      icon: <CloudDownloadIcon />,
      onClick: () => {
        setSelectDialog({
          ...defaultDownloadConfig,
          ...{
            open: true,
            onClose: ({ title, value }) => {
              setSelectDialog(defaultSelectDialog);
              if (value) {
                if (value == 1) {
                  if (dataIDs.length) {
                    downloadItemsById();
                  } else {
                    setDialog({
                      open: true,
                      title: "Exception!",
                      text: "Please select a timesheet to download it",
                      noAgreeButton: true,
                      disagreeBtnTitle: "OK",
                      onClose: ({ type }) => {
                        setDialog(defaultDialog);
                      },
                    });
                  }
                } else if (value == 2) {
                  setSelectDialog({
                    ...defaultDateConfig,
                    ...{
                      open: true,
                      onClose: ({ title, value }) => {
                        if (value) {
                          downloadItemsByDate(value);
                        }
                        setSelectDialog(defaultSelectDialog);
                      },
                    },
                  });
                } else if (value == 3) {
                  downloadAllItems();
                } else if (value == 4) {
                  setIsDatePickerOpen(true);
                }
              }
            },
          },
        });
      },
    },
  ];

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Week Commencing",
      options: {
        filter: true,
      },
    },
    {
      name: "Driver Code",
      options: {
        filter: true,
      },
    },
    {
      name: "Driver Name",
      options: {
        filter: true,
      },
    },

    {
      name: "Agency Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Total Units",
      options: {
        filter: true,
      },
    },
    {
      name: "Total Amount",
      options: {
        filter: true,
      },
    },

    {
      name: "Invoiced",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (Number(value) == 0) {
            return <Chip label={<CloseIcon style={{ color: "white" }} />} />;
          }
          if (Number(value) == 1) {
            return (
              <Chip
                label={<CheckIcon style={{ color: "white" }} />}
                color="primary"
              />
            );
          }
        },
      },
    },

    {
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (Number(value) == 0) {
            return (
              <Chip
                label="Submitted | In-Review"
                style={{ backgroundColor: "#3498DB", color: "white" }}
              />
            );
          }
          if (Number(value) == 1) {
            return (
              <Chip
                label="Approved"
                style={{ backgroundColor: "#229954", color: "white" }}
              />
            );
          }
          if (Number(value) == 2) {
            return (
              <Chip
                label="Completed"
                style={{ backgroundColor: "#8E44AD", color: "white" }}
              />
            );
          }
          if (Number(value) == 3) {
            return (
              <Chip
                label="Rejected"
                style={{ backgroundColor: "#C0392B", color: "white" }}
              />
            );
          }
        },
      },
    },

    {
      name: "Options",
      options: {
        filter: true,
        customBodyRender: (item) => {
          return (
            <Grid item xs={12} md={12} lg={12}>
              <div>
                <Tooltip title="Invoice">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {
                      if (item.status != 1 && item.status != 2) {
                        return toast.warn("Timesheet is not approved!");
                      } else printInvoice(item.id);
                    }}
                  >
                    <Receipt />
                  </Button>
                </Tooltip>
              </div>
            </Grid>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (getCookie("id")) {
      getData(10);
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(state) {
    setIsLoading(state);
  }

  function onEdit() {
    if (dataIDs.length == 1) {
      const ts = defaultData.find((t) => t.id == dataIDs[0]);
      if (ts) {
        if (Number(ts.is_invoiced)) {
          return toast.warn(
            "Approved timesheet is NOT allowed to Edit. Try view or contact IT Technical support team"
          );
        }
      }
      setCookie("editDataId", dataIDs[0]);
      setCookie("redirect", "shift");
      // window.location.href = "/app/Edit-Timesheet";
      history.push("/app/Edit-Timesheet");
    } else {
      setDialog({
        open: true,
        title: "Exception!",
        text: "Please select one item to edit",
        noAgreeButton: true,
        disagreeBtnTitle: "OK",
        onClose: ({ type }) => {
          setDialog(defaultDialog);
        },
      });
    }
  }

  function onStatusChange() {
    if (dataIDs.length) {
      setSelectDialog({
        ...defaultSelectDialog,
        open: true,
        onClose: ({ title, value }) => {
          setSelectDialog(defaultSelectDialog);
          if (value !== null) {
            setDialog({
              open: true,
              title: "Confirmation!",
              text:
                "Change the status of the selected item(s) to " + title + "?",
              agreeBtnTitle: "Yes",
              disagreeBtnTitle: "No",
              onClose: ({ type }) => {
                if (type) {
                  updateStatus(value);
                }
                setDialog(defaultDialog);
              },
            });
          }
        },
      });
    } else {
      setDialog({
        open: true,
        title: "Exception!",
        text: "Please select the items to update from the list",
        noAgreeButton: true,
        disagreeBtnTitle: "OK",
        onClose: ({ type }) => {
          setDialog(defaultDialog);
        },
      });
    }
  }

  function onRemove() {
    if (dataIDs.length) {
      setDialog({
        open: true,
        title: "Confirmation!",
        text: "Remove selected item(s)?",
        agreeBtnTitle: "Yes",
        disagreeBtnTitle: "No",
        onClose: ({ type }) => {
          setDialog(defaultDialog);
          if (type) {
            deleteItems();
          }
        },
      });
    } else {
      setDialog({
        open: true,
        title: "Exception!",
        text: "Please select the items to remove them from the list",
        noAgreeButton: true,
        disagreeBtnTitle: "OK",
        onClose: ({ type }) => {
          setDialog(defaultDialog);
        },
      });
    }
  }

  function printInvoice(id) {
    axios({
      method: "GET",
      url: URL + "encryptID" + "/" + id,
    })
      .then((res) => {
        if (res.data.status == 200) {
          window.open(
            URL + "Invoice" + "/" + getCookie("userType") + "/" + res.data.hash
          );
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function getData(limit) {
    let url =
      URL +
      "webTimeSheet" +
      "/" +
      getCookie("agency_id") +
      "/" +
      getCookie("userType") +
      "/" +
      "Shift";
    if (limit) {
      url += "/" + limit;
    }
    if (platformConfig.prefix == "dps" || platformConfig.prefix == "accounts") {
      if (limit) {
        url += "/" + platformConfig.prefix;
      } else {
        url += "/" + 10000 + "/" + platformConfig.prefix;
      }
    }
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        // console.log(res);
        loading(false);
        if (res.data.status == 200) {
          let timesheets = [];
          for (let i = 0; i < res.data.timesheets.length; i++) {
            let timesheet = [];
            let units = 0;
            const dayCount = 7;
            const ts = res.data.timesheets[i];
            for (let i = 1; i <= dayCount; i++) {
              let total_day_units = 0;
              const day_units = ts["day" + i + "_units"];
              if (day_units) {
                total_day_units = day_units
                  .split(",")
                  .reduce((a, b) => Number(a) + Number(b));
              }
              units += Number(total_day_units);
            }
            timesheet.push(ts.id);
            timesheet.push(ts.week);
            timesheet.push(ts.driver_code);
            timesheet.push(ts.driver_name);
            timesheet.push(ts.agency_name ? ts.agency_name : "N/A");
            timesheet.push(units.toFixed(2));
            timesheet.push("£" + Number(ts.week_total).toFixed(2));
            timesheet.push(ts.is_invoiced);
            timesheet.push(ts.status);
            timesheet.push({ status: ts.status, id: ts.id });

            timesheets.push(timesheet);
          }
          setDataIDs([]);
          setData(timesheets);
          setDefaultData(res.data.timesheets);
        } else {
          loading(false);
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function updateStatus(status) {
    axios({
      method: "POST",
      url: URL + "webUpdateTimesheetStatus" + "/" + status,
      data: JSON.stringify({
        ids: dataIDs.join(","),
        status: status,
        type: getCookie("userType"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (res.data.status == 200) {
          loading(true);
          getData(limit);
          toast.success(res.data.message);
        } else {
          toast.warn(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function deleteItems() {
    axios({
      method: "POST",
      url: URL + "WebTimeSheetDelete",
      data: JSON.stringify({
        ids: dataIDs.join(","),
        type: getCookie("userType"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          loading(true);
          getData(limit);
          toast.success("Selected item(s) removed!");
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function downloadItemsById() {
    window.open(URL + "downloadTimesheets_byId/" + dataIDs.join(","));
    toast.success("Selected Timesheet(s) are downloaded in a excel file!");
  }
  function downloadItemsByDate(date) {
    const userType =
      platformConfig.prefix == "dps" || platformConfig.prefix == "accounts"
        ? "admin"
        : getCookie("userType");
    window.open(
      URL +
        "downloadTimesheets_byDate/" +
        userType +
        "/" +
        date +
        "/" +
        "Shift" +
        "/" +
        getCookie("agency_id")
    );
    toast.success(
      "Timesheet(s) for week " + date + " are downloaded in a excel file!"
    );
  }
  function downloadAllItems() {
    const userType =
      platformConfig.prefix == "dps" || platformConfig.prefix == "accounts"
        ? "admin"
        : getCookie("userType");
    window.open(
      URL +
        "downloadTimesheets_all" +
        "/" +
        userType +
        "/" +
        "Shift" +
        "/" +
        getCookie("agency_id")
    );
    toast.success("All Timesheet(s) are downloaded in a excel file!");
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        whiteBg
        icon="ion-ios-paper"
        title="HGV Driver Hub - Shift Timesheet"
        desc="Shift Timesheet List"
      >
        <Grid
          xs={12}
          md={12}
          lg={12}
          container
          item
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            variant="contained"
            color={limit == 10 ? "secondary" : "primary"}
            type="button"
            disabled={limit == 10}
            onClick={() => {
              loading(true);
              setlimit(10);
              getData(10);
            }}
            style={styles.margin}
          >
            Load 10 Results
          </Button>
          <Button
            variant="contained"
            color={limit == 100 ? "secondary" : "primary"}
            type="button"
            disabled={limit == 100}
            onClick={() => {
              loading(true);
              setlimit(100);
              getData(100);
            }}
            style={styles.margin}
          >
            Load 100 Results
          </Button>
          <Button
            variant="contained"
            color={limit == 1000 ? "secondary" : "primary"}
            type="button"
            disabled={limit == 1000}
            onClick={() => {
              loading(true);
              setlimit(1000);
              getData(1000);
            }}
            style={styles.margin}
          >
            Load 1000 Results
          </Button>
          {" OR "}
          <Button
            variant="contained"
            color={limit == null ? "secondary" : "primary"}
            type="button"
            disabled={limit == null}
            onClick={() => {
              loading(true);
              setlimit(null);
              getData();
            }}
            style={styles.margin}
          >
            Load All Results
          </Button>
          <Grid xs={1} md={1} lg={1} item>
            {isLoading && <Dots color="secondary" />}
          </Grid>
        </Grid>
        <div>
          <AdvFilter
            title="Timesheets"
            menuPrefix="timesheet"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            additionalButtons={additionalButtons}
            noAddButton={true}
            onEdit={() => onEdit()}
            onDelete={() => onRemove()}
            onStatusChange={() => onStatusChange()}
            onSelect={({ indexes }) => {
              let ids = [];
              let rows = [];
              for (let i = 0; i < indexes.length; i++) {
                if (data[indexes[i].dataIndex]) {
                  ids.push(data[indexes[i].dataIndex][0]);
                  rows.push(indexes[i].dataIndex);
                }
              }
              setRowsSelected(rows);
              setDataIDs(ids);
            }}
          />
        </div>
      </PapperBlock>
      <ToastContainer />
      <AlertDialog {...dialog} />
      <SelectDialog {...selectDialog} />
      <TimesheetViewer {...timesheetConfig} />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          selected={new Date()}
          onChange={(date) => {
            downloadItemsByDate(moment(date._d).format("YYYY-MM-DD"));
            // setIsDatePickerOpen(false);
          }}
          onAbort={() => setIsDatePickerOpen(false)}
          onClose={() => setIsDatePickerOpen(false)}
          style={{ display: "none" }}
          open={isDatePickerOpen}
        />
      </MuiPickersUtilsProvider>

      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        additionalButtons={additionalButtons}
        hidden={dataIDs.length}
        menuPrefix="timesheet"
      />
    </div>
  );
}

export default withStyles(styles)(Shift);
