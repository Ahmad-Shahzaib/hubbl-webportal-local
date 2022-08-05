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
import { jobsStatus } from "dan-api/status";
import SelectDialog from "../../UIElements/demos/DialogModal/SelectDialog";
import SpeedDial from "../../UIElements/SpeedDial";
import { useHistory } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function AllJobs(props) {
  const title = brand.name + " - Admins";
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
    statuslist: jobsStatus,
  };
  const [dialog, setDialog] = useState(defaultDialog);
  const [selectDialog, setSelectDialog] = useState(defaultSelectDialog);

  const columns = [
    {
      name: "#",
      options: {
        filter: true,
      },
    },
    {
      name: "Job Detail",
      options: {
        filter: true,
        customBodyRender: (item) => {
          let time = <Chip label={item.start_date} />;
          return (
            <div>
              On: <Chip label={item.start_date + " " + item.start_time} />
              <br />
              <br />
              From:{" "}
              <Chip
                label={
                  item.start +
                  ", " +
                  item.start1 +
                  ", " +
                  item.start2 +
                  ", " +
                  item.start3
                }
              />
              <br />
              <br />
              To:{" "}
              <Chip
                label={
                  item.end +
                  ", " +
                  item.end1 +
                  ", " +
                  item.end2 +
                  ", " +
                  item.end3
                }
              />
            </div>
          );
        },
      },
    },
    {
      name: "Hirer",
      options: {
        filter: true,
      },
    },
    {
      name: "Original Driver",
      options: {
        filter: true,
      },
    },
    {
      name: "Published To",
      options: {
        filter: true,
        customBodyRender: (item) => {
          if (item == 1) {
            return <Chip label="Global" color="primary" />;
          }
          return <Chip label="Private" color="primary" />;
        },
      },
    },
    {
      name: "Substituted/Accepted",
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
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (item) => {
          if (Number(item.status) == 0) {
            return (
              <Chip
                label="Draft/Open"
                style={{ backgroundColor: "orange", color: "white" }}
              />
            );
          }
          if (item.driver > 0 && Number(item.status) == 1) {
            return (
              <Chip
                label="Waiting Driver's Approval"
                style={{ backgroundColor: "purple", color: "white" }}
              />
            );
          }
          if (Number(item.new_status) == 2) {
            return (
              <Chip
                label="Substituted to a Driver"
                style={{ backgroundColor: "#8E44AD", color: "white" }}
              />
            );
          }
          if (Number(item.new_status) == 3) {
            return (
              <Chip
                label="Approved"
                style={{ backgroundColor: "#229954", color: "white" }}
              />
            );
          }
          if (Number(item.new_status) == 4) {
            return (
              <Chip
                label="Completed"
                style={{ backgroundColor: "#3498DB", color: "white" }}
              />
            );
          }
          if (Number(item.new_status) == 5) {
            return (
              <Chip
                label="Rejected"
                style={{ backgroundColor: "#C0392B", color: "white" }}
              />
            );
          }
          return <Chip label="In Process" color="primary" />;
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
      // window.location.href = "edit-job";
      history.push("edit-job");
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
        "WebjobsAll" +
        "/" +
        getCookie("agency_id") +
        "/" +
        getCookie("userType"),
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let jobs = [];
          for (let i = 0; i < res.data.jobs.length; i++) {
            let job = [];
            job.push(res.data.jobs[i].id);
            job.push(res.data.jobs[i]);
            job.push(res.data.jobs[i].hirer_name);
            job.push(res.data.jobs[i].driver_name);
            job.push(res.data.jobs[i].flag);
            job.push(res.data.jobs[i].driver_assigned_name);
            job.push(res.data.jobs[i].phone_number);
            job.push({
              status: res.data.jobs[i].status,
              new_status: res.data.jobs[i].new_status,
              driver: res.data.jobs[i].driver_assigned,
            });
            job.push(res.data.jobs[i].id);

            if (
              getCookie("agency_id") == res.data.jobs[i].agency_id &&
              Number(res.data.jobs[i].status) == 0
            ) {
              jobs.push(job);
            } else if (Number(res.data.jobs[i].status) !== 0) {
              jobs.push(job);
            }
          }
          setDataIDs([]);
          setData(jobs);
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
      url: URL + "WebjobsStatus" + "/" + status,
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
    // return console.log(dataIDs);
    axios({
      method: "POST",
      url: URL + "WebjobsDelete",
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
        icon="ion-ios-clipboard"
        title="HGV Driver Hub - All Jobs"
        desc="All Jobs List"
      >
        <div>
          <AdvFilter
            title="Drivers"
            menuPrefix="job"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "add-job";
              history.push("add-job");
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
        menuPrefix="job"
      />
    </div>
  );
}

export default withStyles(styles)(AllJobs);
