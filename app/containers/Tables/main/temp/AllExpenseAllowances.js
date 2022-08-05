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
import { general } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function AllExpenseAllowances(props) {
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
      name: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "Rate",
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
      // window.location.href = "/app/Edit-Expense-Allowances";
      history.push("/app/Edit-Expense-Allowances");
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
        "WebAllowance" +
        "/" +
        getCookie("agency_id") +
        "/" +
        getCookie("userType"),
    })
      .then((res) => {
        if (res.data.status == 200) {
          let WebAllowances = [];
          for (let i = 0; i < res.data.WebAllowances.length; i++) {
            let allowance = [];
            allowance.push(res.data.WebAllowances[i].id);
            allowance.push(res.data.WebAllowances[i].name);
            allowance.push(res.data.WebAllowances[i].rate);
            allowance.push(res.data.WebAllowances[i].status);

            WebAllowances.push(allowance);
          }
          setDataIDs([]);
          setData(WebAllowances);
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
      url: URL + "WebAllowanceStatus",
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
          getData();
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
    // console.log(dataIDs)
    axios({
      method: "POST",
      url: URL + "WebAllowanceDelete",
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
          // for (let i = 0; i < res.data.admins.length; i++) {
          //   let admin = []
          //   admin.push(res.data.admins[i].id)
          //   admin.push(res.data.admins[i].profile_image)
          //   admin.push(res.data.admins[i].first_name)
          //   admin.push(res.data.admins[i].surname)
          //   admin.push(res.data.admins[i].mobile)
          //   admin.push(res.data.admins[i].email)
          //   admin.push(res.data.admins[i].status)

          //   admins.push(admin)
          // }
          // setData(admins)
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
        title="HGV Driver Hub - All Expense Allowances"
        desc="All Expense Allowances List"
      >
        <div>
          <AdvFilter
            title="Expense Allowances"
            menuPrefix="allowance"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "/app/Add-Expense-Allowances";
              history.push("/app/Add-Expense-Allowances");
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
      <ToastContainer />
      <SelectDialog {...selectDialog} />
      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        hidden={dataIDs.length}
        menuPrefix="allowance"
      />
    </div>
  );
}

export default withStyles(styles)(AllExpenseAllowances);
