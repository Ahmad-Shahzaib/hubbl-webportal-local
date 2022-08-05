import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { SourceReader, PapperBlock } from "dan-components";
import { AdvTableDemo, AdvFilter } from "../demos";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import Button from "@material-ui/core/Button";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Grid from "@material-ui/core/Grid";
import SpeedDial from "../../UIElements/SpeedDial";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function Devices(props) {
  const title = brand.name + " - Admins";
  const description = brand.desc;
  const docSrc = "containers/Tables/demos/";
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [limit, setlimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const defaultDialog = {
    open: false,
    onClose: () => {},
    title: "",
    text: "",
    agreeBtnTitle: "",
    disagreeBtnTitle: "",
  };
  const [dialog, setDialog] = useState(defaultDialog);

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Device Token",
      options: {
        filter: true,
      },
    },
    {
      name: "Platform",
      options: {
        filter: true,
        customBodyRender: (value) => {
          // if (value) {
          //   return <Chip label={"Android"} color="primary" />;
          // }
          return <Chip label={"Android | iOS"} color="primary" />;
        },
      },
    },
    {
      name: "Last accessed",
      options: {
        filter: true,
      },
    },
  ];

  function loading(state) {
    setIsLoading(state);
  }

  useEffect(() => {
    if (getCookie("id")) {
      getData(10);
    } else {
      window.location.href = "/login";
    }
  }, []);

  function onRemove() {
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
  }

  function getData(limit) {
    let url = URL + "webAllDevices";
    if (limit) {
      url += "/" + limit;
    }
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let devices = [];
          for (let i = 0; i < res.data.devices.length; i++) {
            let device = [];
            device.push(res.data.devices[i].id);
            device.push(res.data.devices[i].token);
            device.push(res.data.devices[i].platform);
            device.push(res.data.devices[i].created_at);

            devices.push(device);
          }
          setDataIDs([]);
          setData(devices);
        } else {
          toast.error("Something Went Wrong!");
        }
        loading(false);
      })
      .catch((err) => {
        loading(false);
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function deleteItems() {
    axios({
      method: "POST",
      url: URL + "webDeleteDevices",
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
          toast.success(res.data.message);
          loading(true);
          getData();
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        icon="ion-ios-clipboard-outline"
        title="HGV Driver Hub - Devices"
        desc="All Devices List"
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
            title="Drivers"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            noAddButton={true}
            noEditButton={true}
            noStatusButton={true}
            onDelete={() => onRemove()}
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
          {/* <SourceReader componentName={docSrc + "AdvFilter.js"} /> */}
        </div>
      </PapperBlock>
      <SpeedDial
        noEditButton={true}
        noStatusButton={true}
        onRemove={() => onRemove()}
        hidden={dataIDs.length}
        menuPrefix="device"
      />
      <AlertDialog {...dialog} />
    </div>
  );
}

export default withStyles(styles)(Devices);
