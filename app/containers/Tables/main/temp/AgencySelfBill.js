import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL, UPLOADURL, resolveUrl } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import Button from "@material-ui/core/Button";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Grid from "@material-ui/core/Grid";
import { sheets } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TimesheetViewer from "../../UIElements/TimesheetViewer";
import { platformConfig } from "dan-api/platformConfig";
import PDFViewer from "../../UIElements/PDFViewer";
import ImageLightbox from "react-image-lightbox";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function AgencySelfBill(props) {
  const title = brand.name + " - Admins";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [limit, setlimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [viewURL, setViewURL] = useState("");
  const [displayImageViewer, setDisplayImageViewer] = useState(false);
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
  const defaultPDFConfig = {
    open: false,
    onClose: () => {},
    url: "",
  };
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
  ];
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);
  const [timesheetConfig, setTimesheetConfig] = useState(
    defaultTimesheetConfig
  );
  const [PDFConfig, setPDFConfig] = useState(defaultPDFConfig);

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
      name: "Total Amount",
      options: {
        filter: true,
      },
    },
    {
      name: "Attachment",
      options: {
        filter: true,
        customBodyRender: (url) => {
          if (url) {
            if (url.includes("hgvdriverhub.app/Portal")) {
              url = url.replace(
                "hgvdriverhub.app/Portal",
                "portal.hgvdriverhub.app"
              );
            }
          }
          return url ? (
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={() => {
                handleView(url);
              }}
            >
              View Attachment
            </Button>
          ) : null;
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
  ];

  useEffect(() => {
    if (getCookie("id")) {
      getData(10);
    } else {
      window.location.href = "/login";
    }
  }, []);

  function handleView(url) {
    let _url = url;
    if (!url.includes("https:") && !url.includes("http:")) {
      _url = UPLOADURL + url;
    }
    if (
      _url.endsWith(".jpg") ||
      _url.endsWith(".jpeg") ||
      _url.endsWith(".png") ||
      _url.endsWith(".webp") ||
      _url.endsWith(".gif")
    ) {
      setViewURL(_url);
      setDisplayImageViewer(true);
    } else {
      setPDFConfig({
        open: true,
        onClose: () => setPDFConfig(defaultPDFConfig),
        url: _url,
      });
    }
  }

  function loading(state) {
    setIsLoading(state);
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
      "Agency%20Self-Bill";
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
            const ts = res.data.timesheets[i];
            timesheet.push(ts.id);
            timesheet.push(ts.week);
            timesheet.push(ts.driver_code);
            timesheet.push(ts.driver_name);
            timesheet.push(ts.agency_name ? ts.agency_name : "N/A");
            timesheet.push("£" + Number(ts.week_total).toFixed(2));
            timesheet.push(ts.attachment);
            timesheet.push(ts.status);
            timesheet.push(ts.id);

            timesheets.push(timesheet);
          }
          setDataIDs([]);
          setData(timesheets);
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

  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      setCookie("redirect", "agency-self-bill");
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
        title="HGV Driver Hub - Agency Self Bill"
        desc="Agency Self Bill Timesheet List"
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
            noAddButton={true}
            onEdit={() => onEdit()}
            onDelete={() => onRemove()}
            onStatusChange={() => onStatusChange()}
            additionalButtons={additionalButtons}
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
          <SelectDialog {...selectDialog} />

          <SpeedDial
            onEdit={() => onEdit()}
            onStatusChange={() => onStatusChange()}
            onRemove={() => onRemove()}
            additionalButtons={additionalButtons}
            hidden={dataIDs.length}
            menuPrefix="timesheet"
          />
        </div>
      </PapperBlock>
      <ToastContainer />
      <AlertDialog {...dialog} />
      <TimesheetViewer {...timesheetConfig} />
      <PDFViewer {...PDFConfig} />
      {displayImageViewer && (
        <ImageLightbox
          mainSrc={UPLOADURL + resolveUrl(viewURL)}
          onCloseRequest={() => setDisplayImageViewer(false)}
        />
      )}
    </div>
  );
}

export default withStyles(styles)(AgencySelfBill);
