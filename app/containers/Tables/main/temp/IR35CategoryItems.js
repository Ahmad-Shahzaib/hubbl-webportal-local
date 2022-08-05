import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import { general } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function IR35CategoryItems(props) {
  const title = brand.name + " - IR35 Category Items";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
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

  const columns = [
    {
      name: "S No.",
      options: {
        filter: true,
      },
    },
    {
      name: "Category",
      options: {
        filter: true,
      },
    },
    {
      name: "Category Item",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value) {
            return value;
          }
          return <Chip label={<CloseIcon />} />;
        },
      },
    },
    {
      name: "Score",
      options: {
        filter: true,
      },
    },
    {
      name: "Default Value",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 1) {
            return <Chip label="Yes" color="primary" />;
          }
          if (value === 0) {
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
          if (value === 1) {
            return <Chip label="Active" color="primary" />;
          }
          if (value === 0) {
            return <Chip label="Not Active" />;
          }
          return <Chip label="Unknown" />;
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

  // constant methods
  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "edit-IR35-Item";
      history.push("edit-IR35-Item");
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

  function getData() {
    axios({
      method: "GET",
      url: URL + "webir35items",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let items = [];
          for (let i = 0; i < res.data.items.length; i++) {
            let item = [];
            item.push(res.data.items[i].id);
            item.push(res.data.items[i].category_title);
            item.push(res.data.items[i].calculation_method_title);
            item.push(
              res.data.items[i].min_score == "-25"
                ? "(-ve)25 - " + res.data.items[i].max_score
                : res.data.items[i].min_score +
                    " - " +
                    res.data.items[i].max_score
            );
            item.push(res.data.items[i].is_max_default);
            item.push(res.data.items[i].status);

            items.push(item);
          }
          setDataIDs([]);
          setData(items);
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
      url: URL + "webUpdateIR35ItemStatus",
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
          let items = [];
          for (let i = 0; i < res.data.items.length; i++) {
            let item = [];
            item.push(res.data.items[i].id);
            item.push(res.data.items[i].category_title);
            item.push(res.data.items[i].calculation_method_title);
            item.push(
              res.data.items[i].min_score == "-25"
                ? "(-ve)25 - " + res.data.items[i].max_score
                : res.data.items[i].min_score +
                    " - " +
                    res.data.items[i].max_score
            );
            item.push(res.data.items[i].is_max_default);
            item.push(res.data.items[i].status);

            items.push(item);
          }
          setDataIDs([]);
          setData(items);
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
      url: URL + "webDeleteIR35Item",
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
        icon="ion-ios-list-box"
        title="HGV Driver Hub - IR35 Items List"
        desc="Category Items List of IR35 Traffic Lights Score"
      >
        <div>
          <AdvFilter
            title="Items"
            menuPrefix="ir35item"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "add-IR35-Item";
              history.push("add-IR35-Item");
            }}
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
      <AlertDialog {...dialog} />
      <SelectDialog {...selectDialog} />

      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        hidden={dataIDs.length}
        menuPrefix="ir35item"
      />
    </div>
  );
}

export default withStyles(styles)(IR35CategoryItems);
