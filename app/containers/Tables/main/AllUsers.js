import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL, IMGURL, UPLOADURL, resolveUrl } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import Button from "@material-ui/core/Button";
import ImageLightbox from "react-image-lightbox";
import Grid from "@material-ui/core/Grid";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import { general } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import CHViewer from "../../UIElements/CHViewer";
import { platformConfig } from "dan-api/platformConfig";
import PDFViewer from "../../UIElements/PDFViewer";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function AllUsers(props) {
  const title = brand.name + " - Admins";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [viewUrl, setViewURL] = useState("");
  const [displayImageViewer, setDisplayImageViewer] = useState(false);
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
  const defaultPDFConfig = {
    open: false,
    onClose: () => {},
    url: "",
  };
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
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);
  const [CHDetails, setCHDetails] = useState(defaultCHDetails);
  const [PDFConfig, setPDFConfig] = useState(defaultPDFConfig);

  function handleView(url) {
    let _url = url;
    if (!url.includes("https:") && !url.includes("http:")) {
      _url = IMGURL + url;
    }
    // console.log(_url);
    if (_url.endsWith(".pdf") || _url.endsWith(".PDF")) {
      setPDFConfig({
        open: true,
        onClose: () => setPDFConfig(defaultPDFConfig),
        url: _url,
      });
    } else {
      setViewURL(_url);
      setDisplayImageViewer(true);
    }
  }

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Username",
      options: {
        filter: true,
      },
    },
    {
      name: "Email",
      options: {
        filter: true,
      },
    },
    {
      name: "Phone",
      options: {
        filter: true,
      },
    },
    {
      name: "Country",
      options: {
        filter: true,
      },
    },
    {
      name: "Is Varified",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value == true) {
            return <Chip label="Yes" color="primary" />;
          } else {
            return <Chip label="No" />;
          }
        },
      },
    },
    {
      name: "Can Host",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value == true) {
            return <Chip label="Yes" color="primary" />;
          } else {
            return <Chip label="No" />;
          }
        },
      },
    },
    {
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value == true) {
            return <Chip label="Active" color="primary" />;
          } else {
            return <Chip label="Not Active" />;
          }
        },
      },
    },
  ];

  useEffect(() => {
    if (getCookie("id")) {
      if (!data.length) {
        getData(10);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  // constant methods

  function loading(state) {
    setIsLoading(state);
  }

  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "edit-driver";
      window.location.href = "/app/edit-user";
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
              title: "Confirmtion!",
              text:
                "Change the status of the selected item(s) to " + title + "?",
              agreeBtnTitle: "Yes",
              disagreeBtnTitle: "No",
              onClose: ({ type }) => {
                if (type) {
                  console.log(dataIDs[0]);
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
    let url = URL + "users/except" + "/" + getCookie("id");
    if (l) {
      url += "/" + l;
    } else {
      url += "/" + 100000;
    }
    console.log(getCookie("token"))
    axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: getCookie("token"),
      },
      //   timeout: 200000,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 200) {
          let items = [];
          for (let i = 0; i < res.data.users.length; i++) {
            let item = [];
            item.push(res.data.users[i].id);
            item.push(
              res.data.users[i].first_name && res.data.users[i].last_name
                ? res.data.users[i].first_name +
                    " " +
                    res.data.users[i].last_name
                : "N/A"
            );
            item.push(res.data.users[i].username);
            item.push(
              res.data.users[i].email ? res.data.users[i].email : "N/A"
            );
            item.push(
              res.data.users[i].phone ? res.data.users[i].phone : "N/A"
            );
            item.push(
              res.data.users[i].country ? res.data.users[i].country : "N/A"
            );
            item.push(res.data.users[i].isVerified ? true : false);
            item.push(res.data.users[i].can_host ? true : false);
            item.push(res.data.users[i].status ? true : false);
            console.log(res.data.users[i].status);

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
        // if (err.response) {
        //   console.log(err.response.status);
        //   console.log(err.response.data);
        // }
      });
  }

  function updateStatus(status) {
    // console.log(dataIDs);
    axios({
      method: "PUT",
      url: URL + "users/update/" + dataIDs[0],
      data: { status: status },
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
      url: URL + "removeDriver",
      data: JSON.stringify({
        ids: dataIDs.join(","),
        type: getCookie("userType"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getCookie("token"),
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
      url: URL + "chHouse/Driver/" + id,
    })
      .then((res) => {
        setIsCHLoading(false);
        // console.log(res);
        if (res.data.status == 200) {
          setCHDetails({
            ...CHDetails,
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
      <PapperBlock
        whiteBg
        icon="ion-md-car"
        title="Hubbl - Users"
        desc="All Users List"
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
            title="Users"
            menuPrefix="users"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            noAddButton={true}
            noEditButton={true}
            noActionButton={true}
            onAdd={() => {
              // window.location.href = "add-driver";
              history.push("add-driver");
            }}
            onEdit={() => onEdit()}
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
      <CHViewer {...CHDetails} />
      <PDFViewer {...PDFConfig} />
      {displayImageViewer && (
        <ImageLightbox
          mainSrc={UPLOADURL + resolveUrl(viewUrl)}
          onCloseRequest={() => setDisplayImageViewer(false)}
        />
      )}

      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        hidden={dataIDs.length}
        menuPrefix="driver"
        noRemoveButton={true}
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

export default withStyles(styles)(AllUsers);
