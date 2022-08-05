import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL, IMGURL, resolveUrl } from "dan-api/url";
import { getCookie, setCookie } from "dan-api/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../UIElements/demos/DialogModal/AlertDialog";
import { general } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function AllAdmins(props) {
  const title = brand.name + " - Admins";
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
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Profile",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Avatar
              alt={"Admin"}
              src={IMGURL + resolveUrl(value)}
              className={props.classes.avatar}
            />
          );
        },
      },
    },
    {
      name: "First Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Surname",
      options: {
        filter: true,
      },
    },
    {
      name: "Phone Number",
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

  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "/app/edit-admin";
      history.push("/app/edit-admin");
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
      if (dataIDs.includes(Number(getCookie("id")))) {
        setDialog({
          open: true,
          title: "Exception!",
          text:
            "Changing your own account status will result in your account being blocked. Please contact other admins to perform this action on your account",
          noAgreeButton: true,
          disagreeBtnTitle: "OK",
          onClose: ({ type }) => {
            if (type) {
              updateStatus(value);
            }
            setDialog(defaultDialog);
          },
        });
      } else {
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
      }
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
      if (dataIDs.includes(Number(getCookie("id")))) {
        setDialog({
          open: true,
          title: "Exception!",
          text:
            "Removing your own account is not permitted. Please contact other admins to perform this action on your account",
          noAgreeButton: true,
          disagreeBtnTitle: "OK",
          onClose: ({ type }) => {
            if (type) {
              updateStatus(value);
            }
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
            setDialog(defaultDialog);
            if (type) {
              deleteItems();
            }
          },
        });
      }
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
      url: URL + "webAllAdmins",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let admins = [];
          for (let i = 0; i < res.data.admins.length; i++) {
            let admin = [];
            admin.push(res.data.admins[i].id);
            admin.push(res.data.admins[i].profile_image);
            admin.push(res.data.admins[i].first_name);
            admin.push(res.data.admins[i].surname);
            admin.push(res.data.admins[i].mobile);
            admin.push(res.data.admins[i].email);
            admin.push(res.data.admins[i].status);

            admins.push(admin);
          }
          setDataIDs([]);
          setData(admins);
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
      url: URL + "webUpdateAdminStatus",
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
          toast.success("Selected item(s) updated");
          let admins = [];
          for (let i = 0; i < res.data.admins.length; i++) {
            let admin = [];
            admin.push(res.data.admins[i].id);
            admin.push(res.data.admins[i].profile_image);
            admin.push(res.data.admins[i].first_name);
            admin.push(res.data.admins[i].surname);
            admin.push(res.data.admins[i].mobile);
            admin.push(res.data.admins[i].email);
            admin.push(res.data.admins[i].status);

            admins.push(admin);
          }
          setDataIDs([]);
          setData(admins);
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
      url: URL + "webDeleteAdmin",
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
          let admins = [];
          for (let i = 0; i < res.data.admins.length; i++) {
            let admin = [];
            admin.push(res.data.admins[i].id);
            admin.push(res.data.admins[i].profile_image);
            admin.push(res.data.admins[i].first_name);
            admin.push(res.data.admins[i].surname);
            admin.push(res.data.admins[i].mobile);
            admin.push(res.data.admins[i].email);
            admin.push(res.data.admins[i].status);

            admins.push(admin);
          }
          setDataIDs([]);
          setData(admins);
          toast.success("Selected Admins Removed!");
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
      {/* <PapperBlock
        whiteBg
        icon="ion-ios-clipboard-outline"
        title="Basic Data Table"
        desc="This is default example from Material UI. It Demonstrates the use of Checkbox and clickable rows for selection, with a custom Toolbar. It uses the TableSortLabel component to help style column headings."
      >
        <div>
          <AdvTableDemo />
          <SourceReader componentName={docSrc + "AdvTableDemo.js"} />
        </div>
      </PapperBlock> */}
      <PapperBlock
        whiteBg
        icon="ion-ios-people"
        title="HGV Driver Hub - Admins"
        desc="Authorized Users"
      >
        <div>
          <AdvFilter
            title="Admins"
            menuPrefix="admin"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "/app/add-admin";
              history.push("/app/add-admin");
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
        menuPrefix="admin"
      />
    </div>
  );
}

export default withStyles(styles)(AllAdmins);
