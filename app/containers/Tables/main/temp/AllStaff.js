import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { SourceReader, PapperBlock } from "dan-components";
import { AdvTableDemo, AdvFilter } from "../demos";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { URL } from "dan-api/url";
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

function AllStaff(props) {
  const title = brand.name + " - Staff";
  const description = brand.desc;
  const docSrc = "containers/Tables/demos/";
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
      name: "Hirer Name",
      options: {
        filter: true,
      },
    },
    {
      name: "First Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Last Name",
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
      name: "Employee Number",
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

  // constaint methods
  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "/app/edit-staff";
      history.push("/app/edit-staff");
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
      url:
        URL +
        "webAllStaff/" +
        getCookie("userType") +
        "/" +
        getCookie("agency_id"),
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let staffs = [];
          for (let i = 0; i < res.data.staff.length; i++) {
            let staff = [];
            staff.push(res.data.staff[i].id);
            staff.push(res.data.staff[i].hirer_name);
            staff.push(res.data.staff[i].first_name);
            staff.push(res.data.staff[i].last_name);
            staff.push(res.data.staff[i].mobile);
            staff.push(res.data.staff[i].email);
            staff.push(res.data.staff[i].emp_no);
            staff.push(Number(res.data.staff[i].status));

            staffs.push(staff);
          }
          setData(staffs);
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
      url: URL + "webUpdateStaffStatus",
      data: JSON.stringify({
        ids: dataIDs.join(","),
        status: status,
        myId: getCookie("id"),
        type: getCookie("userType"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Status updated successfully");
          let staffs = [];
          for (let i = 0; i < res.data.staff.length; i++) {
            let staff = [];
            staff.push(res.data.staff[i].id);
            staff.push(res.data.staff[i].hirer_name);
            staff.push(res.data.staff[i].first_name);
            staff.push(res.data.staff[i].last_name);
            staff.push(res.data.staff[i].mobile);
            staff.push(res.data.staff[i].email);
            staff.push(res.data.staff[i].emp_no);
            staff.push(Number(res.data.staff[i].status));

            staffs.push(staff);
          }
          setData(staffs);
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
      url: URL + "webDeleteStaff",
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
          let staffs = [];
          for (let i = 0; i < res.data.staff.length; i++) {
            let staff = [];
            staff.push(res.data.staff[i].id);
            staff.push(res.data.staff[i].hirer_name);
            staff.push(res.data.staff[i].first_name);
            staff.push(res.data.staff[i].last_name);
            staff.push(res.data.staff[i].mobile);
            staff.push(res.data.staff[i].email);
            staff.push(res.data.staff[i].emp_no);
            staff.push(Number(res.data.staff[i].status));

            staffs.push(staff);
          }
          setDataIDs([]);
          setData(staffs);
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
        icon="ion-ios-call"
        title="HGV Driver Hub - Staff"
        desc="Authorized Users"
      >
        <div>
          <AdvFilter
            title="Staff"
            menuPrefix="staff"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "add-staff";
              history.push("add-staff");
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
        menuPrefix="staff"
      />
    </div>
  );
}

export default withStyles(styles)(AllStaff);
