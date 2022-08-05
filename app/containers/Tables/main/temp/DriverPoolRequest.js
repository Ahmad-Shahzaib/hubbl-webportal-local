import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import axios from "axios";
import { URL } from "dan-api/url";
import { getCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import ReferanceHandler from "./partials/ReferanceHandler";
import Button from "@material-ui/core/Button";
import SpeedDial from "../../UIElements/SpeedDial";
import { commands } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import DriverProfileViewer from "../../UIElements/DriverProfileViewer";

const DriversPool = () => {
  const title = brand.name + " - Driver";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
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
    statuslist: commands,
  };
  const defaultDriverConfig = {
    open: false,
    onClose: () => {},
    driverid: "",
  };
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);
  const [driverconfig, setDriverConfig] = useState(defaultDriverConfig);

  const columns = [
    {
      name: "SR #",
      options: {
        filter: true,
      },
    },
    {
      name: "DriverName",
      options: {
        filter: true,
      },
    },
    {
      name: "Address",
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
      name: "Ref Action",
      options: {
        viewColumns: false,
        display: false,
        filter: true,
        customBodyRender: (item) => {
          return (
            <ReferanceHandler
              data={item}
              onSuccess={() => {
                getData();
                toast.success("Driver Reference Updated");
              }}
            />
          );
        },
      },
    },
    {
      name: "Action",
      options: {
        filter: true,
        customBodyRender: (id) => {
          return (
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={() => {
                viewDriverProfile(id);
              }}
            >
              View Profile
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (getCookie("id")) {
      getData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  function viewDriverProfile(id) {
    setDriverConfig({
      open: true,
      driverid: id,
      onClose: () => setDriverConfig(defaultDriverConfig),
    });
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
                  if (value) {
                    updateStatus(value);
                  } else {
                    deleteItems();
                  }
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

  function getData() {
    axios({
      method: "GET",
      url: URL + "WebAgencyDrivers" + "/" + getCookie("agency_id") + "/Pool",
    })
      .then((res) => {
        if (res.data.status == 200) {
          let Driverspools = [];
          for (let i = 0; i < res.data.Driverspool.length; i++) {
            let DriverPool = [];
            DriverPool.push(res.data.Driverspool[i].assigned_driver_id);
            DriverPool.push(
              res.data.Driverspool[i].first_name +
                " " +
                res.data.Driverspool[i].last_name
            );
            DriverPool.push(res.data.Driverspool[i].id);
            DriverPool.push(res.data.Driverspool[i].address_line1);
            DriverPool.push(res.data.Driverspool[i].phone_no);
            DriverPool.push(res.data.Driverspool[i].id);

            Driverspools.push(DriverPool);
          }
          setDataIDs([]);
          setData(Driverspools);
        } else {
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
      url: URL + "webAssignedDriverStatus",
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
          getData();
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

  function onRemove() {
    if (!dataIDs.length) {
      setDialog({
        open: true,
        title: "Exception!",
        text: "Remove selected item(s)?",
        noAggreeButton: true,
        disagreeBtnTitle: "OK",
        onClose: ({ type }) => {
          setDialog(defaultDialog);
        },
      });
    } else {
      setDialog({
        open: true,
        title: "Confirmation!",
        text: "Remove selected item(s)?",
        agreeBtnTitle: "Yes",
        disagreeBtnTitle: "No",
        onClose: ({ type }) => {
          if (type) {
            deleteItems();
            setDialog(defaultDialog);
          } else {
            setDialog(defaultDialog);
          }
        },
      });
    }
  }

  function deleteItems() {
    // console.log(dataIDs)
    axios({
      method: "POST",
      url: URL + "webAssignedDriverRemove",
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
          getData();
          toast.success("Selected Item(s) Removed");
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
      <ToastContainer />
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
        title="HGV Driver Hub - Drivers"
        desc="Driver Pool Request List"
      >
        <div>
          <AdvFilter
            title="Drivers"
            menuPrefix="driverpool"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            noAddButton={true}
            noEditButton={true}
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
      <AlertDialog {...dialog} />
      <SelectDialog {...selectDialog} />
      <SpeedDial
        noEditButton={true}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        hidden={dataIDs.length}
        menuPrefix="driverpool"
      />
      <DriverProfileViewer {...driverconfig} />
    </div>
  );
};

export default DriversPool;
