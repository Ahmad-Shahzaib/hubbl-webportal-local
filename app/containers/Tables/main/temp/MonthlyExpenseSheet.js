import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { URL, sendNotification } from "dan-api/url";
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
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: 10,
  },
};

function MonthlyExpenseSheet(props) {
  const title = brand.name + " - Montly Expense Theets";
  const description = brand.desc;
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [limit, setlimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
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
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);

  const columns = [
    {
      name: "Row ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Month",
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
      name: "Total Amount",
      options: {
        filter: true,
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
                style={{ backgroundColor: "#8E44AD", color: "white" }}
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
                style={{ backgroundColor: "#3498DB", color: "white" }}
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

  function onEdit() {
    if (dataIDs.length == 1) {
      setCookie("editDataId", dataIDs[0]);
      // window.location.href = "/app/edit-expense-sheet";
      history.push("/app/edit-expense-sheet");
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

  function getData(limit) {
    let url =
      URL +
      "WebExpenseSheet" +
      "/" +
      getCookie("agency_id") +
      "/" +
      getCookie("userType");
    if (limit) {
      url += "/" + limit;
    }
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        loading(false);
        if (res.data.status == 200) {
          let expenses = [];
          for (let i = 0; i < res.data.expense.length; i++) {
            let expense = [];
            expense.push(res.data.expense[i].id);
            expense.push(res.data.expense[i].month);
            expense.push(res.data.expense[i].driver_code);
            expense.push(res.data.expense[i].driver_name);
            expense.push(
              res.data.expense[i].total ? "£" + res.data.expense[i].total : "£0"
            );
            expense.push(res.data.expense[i].status);

            expenses.push(expense);
          }
          setDataIDs([]);
          setData(expenses);
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        loading(false);
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function updateStatus(status) {
    axios({
      method: "POST",
      url: URL + "webExpenseStatus" + "/" + status,
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
          toast.success(res.data.message);
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
      url: URL + "WebExpenseDelete",
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
        icon="ion-ios-create"
        title="HGV Driver Hub - Monthly Expense Sheet"
        desc="Monthly Expense Sheets List"
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
            title="Monthly Expense"
            menuPrefix="expense"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
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
      <AlertDialog {...dialog} />
      <SelectDialog {...selectDialog} />

      <SpeedDial
        onEdit={() => onEdit()}
        onStatusChange={() => onStatusChange()}
        onRemove={() => onRemove()}
        hidden={dataIDs.length}
        menuPrefix="expense"
      />
    </div>
  );
}

export default withStyles(styles)(MonthlyExpenseSheet);
