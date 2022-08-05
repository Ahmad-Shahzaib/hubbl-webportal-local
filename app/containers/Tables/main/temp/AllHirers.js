import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL, IMGURL, UPLOADURL, resolveUrl } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import Button from "@material-ui/core/Button";
import ImageLightbox from "react-image-lightbox";
import { Document, Page, pdfjs } from "react-pdf/dist/umd/entry.webpack";
import Grid from "@material-ui/core/Grid";
import ToggleHGVStatus from "./partials/ToggleHGVStatus";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import { general } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import HomeIcon from "@material-ui/icons/Home";
import CHViewer from "../../UIElements/CHViewer";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function AllHirers(props) {
  const title = brand.name + " - Hirers";
  const description = brand.desc;
  const docSrc = "containers/Tables/demos/";
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [VIEWURL, setViewURL] = useState("");
  const [displayPDFViewer, setDisplayPDFViewer] = useState(false);
  const [displayImageViewer, setDisplayImageViewer] = useState(false);
  const [numPage, setNumPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setlimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isCHLoading, setIsCHLoading] = useState(false);
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
    statuslist: general,
  };
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);

  const additionalButtons = [
    {
      tooltipTitle: "Company House Details",
      icon: <HomeIcon />,
      onClick: () => {
        if (dataIDs.length == 1) {
          setIsCHLoading(true);
          getCHDetils(dataIDs[0]);
        } else {
          setDialog({
            open: true,
            title: "Exception!",
            text: "Please select one item from the list to view its details",
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
  const defaultCHDetails = {
    company_name: "",
    registration_number: "",
    company_status: "",
    incorporated_on: "",
    made_up: "",
    office_address: "",
    officers_details: "",
    status: "",
    created_at: "",
    updated_at: "",
    onClose: () => {},
    open: false,
  };
  const [CHDetails, setCHDetails] = useState(defaultCHDetails);

  const columns = [
    {
      name: "Hirer Code",
      options: {
        filter: true,
      },
    },
    {
      name: "Company Trading Name",
      options: {
        filter: true,
      },
    },
    {
      name: "HGV Accountancy",
      options: {
        filter: false,
        customBodyRender: (item) =>
          item ? (
            <ToggleHGVStatus data={item} />
          ) : (
            <Chip label={<CloseIcon />} />
          ),
      },
    },
    {
      name: "Company Reg #",
      options: {
        filter: true,
      },
    },
    {
      name: "Haulier Flag",
      options: {
        filter: true,
        customBodyRender: (value) =>
          value ? (
            <Chip label={<CheckIcon />} color="primary" />
          ) : (
            <Chip label={<CloseIcon />} />
          ),
      },
    },
    {
      name: "Account Verification",
      options: {
        filter: true,
        customBodyRender: (value) =>
          value ? (
            <Chip label={<CheckIcon />} color="primary" />
          ) : (
            <Chip label={<CloseIcon />} />
          ),
      },
    },
    {
      name: "Email",
      options: {
        filter: true,
      },
    },
    {
      name: "Last Login",
      options: {
        filter: true,
      },
    },
    {
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (value) =>
          Number(value) ? (
            <Chip label="Active" color="primary" />
          ) : (
            <Chip label="Not Active" />
          ),
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

  // constant methods

  function onDocumentLoadSuccess({ numPages }) {
    setNumPage(numPages);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    setPageNumber(pageNumber - 1);
  }

  function loading(state) {
    setIsLoading(state);
  }

  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "edit-hirer";
      history.push("edit-hirer");
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

  // main methods
  function getData(l) {
    let url =
      URL +
      "allagencies" +
      "/" +
      getCookie("userType") +
      "/" +
      getCookie("agency_id");
    if (l) {
      url += "/" + l;
    }
    axios({
      method: "GET",
      url: url,
      timeout: 200000,
    })
      .then((res) => {
        if (res.data.status == 200) {
          let items = [];
          for (let i = 0; i < res.data.agencies.length; i++) {
            let item = [];
            item.push(res.data.agencies[i].id);
            item.push(res.data.agencies[i].company_trading_name);
            item.push({
              id: res.data.agencies[i].id,
              value: res.data.agencies[i].accountancy,
            });
            item.push(res.data.agencies[i].company_re_no);
            item.push(res.data.agencies[i].flag);
            item.push(res.data.agencies[i].account_verified);
            item.push(res.data.agencies[i].email);
            item.push(res.data.agencies[i].last_login);
            item.push(res.data.agencies[i].status);

            items.push(item);
          }
          setDataIDs([]);
          setData(items);
        } else {
          toast.error("Something Went Wrong!");
        }
        loading(false);
      })
      .catch((err) => {
        loading(false);
        toast.error("Something Went Wrong!");
        // console.log(err);
      });
  }

  function updateStatus(status) {
    axios({
      method: "POST",
      url: URL + "updateAgencyStatus",
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
          toast.success("Status updated successfully");
          loading(true);
          getData(limit);
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
      url: URL + "removeAgency",
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
          toast.success(res.data.message);
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function getCHDetils(id) {
    axios({
      method: "GET",
      url: URL + "chHouse/Hirer/" + id,
    })
      .then((res) => {
        setIsCHLoading(false);
        // console.log(res);
        if (res.data.status == 200) {
          setCHDetails({
            // ...CHDetails,
            ...res.data.ch,
            open: true,
            onClose: () => setCHDetails(defaultCHDetails),
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        toast.error("Something Went Wrong!");
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
      {displayImageViewer && (
        <ImageLightbox
          mainSrc={UPLOADURL + resolveUrl(VIEWURL)}
          onCloseRequest={() => setDisplayImageViewer(false)}
        />
      )}
      {displayPDFViewer ? (
        <PapperBlock
          whiteBg
          icon="ion-ios-clipboard-outline"
          title="Cest Report"
          desc="PDF Viewer"
        >
          <Grid xs={12} md={12} lg={12} item>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => setDisplayPDFViewer(false)}
                style={styles.margin}
              >
                Close
              </Button>
              <Document
                renderMode="canvas"
                file={{ url: UPLOADURL + resolveUrl(VIEWURL) }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={nextPage}
                    style={styles.margin}
                  >
                    Previous
                  </Button>
                  <p>
                    Page {pageNumber} of {numPage}
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={previousPage}
                    style={styles.margin}
                  >
                    Next
                  </Button>
                </div>
              </Document>
            </div>
          </Grid>
        </PapperBlock>
      ) : (
        <PapperBlock
          whiteBg
          icon="ion-ios-briefcase"
          title="HGV Driver Hub - Hirers"
          desc="All Hirers List"
        >
          <Grid
            xs={12}
            md={12}
            lg={12}
            item
            container
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
              title="Agencies"
              menuPrefix="agency"
              columns={columns}
              data={data}
              rowsSelected={dataIDs.length ? rowsSelected : []}
              onAdd={() => {
                // window.location.href = "add-hirer";
                history.push("add-hirer");
              }}
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
          </div>
        </PapperBlock>
      )}
      <ToastContainer />
      <AlertDialog {...dialog} />
      <SelectDialog {...selectDialog} />
      <CHViewer {...CHDetails} />

      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        additionalButtons={additionalButtons}
        hidden={dataIDs.length}
        menuPrefix="agency"
      />
      {isCHLoading ? (
        <div
          style={{
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
            }}
          >
            <Dots color="white" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(AllHirers);
