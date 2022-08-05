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
  const [isDraftSelected, setIsDraftSelected] = useState(false);
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
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "Details",
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
      name: "No. of Drivers",
      options: {
        filter: true,
      },
    },
    {
      name: "Job Status",
      options: {
        filter: true,
        customBodyRender: (item) => {
          if (Number(item.status) == 0) {
            return (
              <Chip label="Draft/Open" style={{ backgroundColor: "orange" }} />
            );
          }
          if (item.driver > 0 && Number(item.status) == 1) {
            return (
              <Chip
                label="Waiting Driver's Approval"
                style={{ backgroundColor: "purple" }}
              />
            );
          }
          if (Number(item.new_status) == 2) {
            return (
              <Chip
                label="Substituted to a Driver"
                style={{ backgroundColor: "#8E44AD" }}
              />
            );
          }
          if (Number(item.new_status) == 3) {
            return (
              <Chip label="Approved" style={{ backgroundColor: "#229954" }} />
            );
          }
          if (Number(item.new_status) == 4) {
            return (
              <Chip label="Completed" style={{ backgroundColor: "#3498DB" }} />
            );
          }
          if (Number(item.new_status) == 5) {
            return (
              <Chip label="Rejected" style={{ backgroundColor: "#C0392B" }} />
            );
          }
          return <Chip label="In Process" color="secondary" />;
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
      // window.location.href = "edit-agency-jobs";
      history.push("edit-agency-jobs");
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
      if (isDraftSelected) {
        setDialog({
          open: true,
          title: "Exception!",
          text:
            "Job status in draft mode cannot be changed. Please uncheck any selected drafts",
          noAgreeButton: true,
          disagreeBtnTitle: "OK",
          onClose: ({ type }) => {
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
    let userType = getCookie("userType");
    let uri = getCookie("agency_id");
    if (userType == "driver") {
      uri = getCookie("user_id");
    }

    axios({
      method: "GET",
      url:
        URL +
        "jobsagency" +
        "/" +
        "Assignments" +
        "/" +
        getCookie("userType") +
        "/" +
        uri,
    })
      .then((res) => {
        if (res.data.status == 200) {
          let alljob = [];
          for (let i = 0; i < res.data.alljob.length; i++) {
            let job = [];
            job.push(res.data.alljob[i].id);
            job.push(res.data.alljob[i].short_description);
            job.push(res.data.alljob[i]);
            job.push(res.data.alljob[i].drivers_count);
            job.push(res.data.alljob[i]);

            // job.push({
            //   status: res.data.jobs[i].new_status,
            //   driver: res.data.jobs[i].driver_assigned,
            // })

            alljob.push(job);
          }
          setDataIDs([]);
          setData(alljob);
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
        icon="ion-ios-clipboard"
        title="HGV Driver Hub - All Jobs"
        desc="All Jobs List"
      >
        <div>
          <AdvFilter
            title="Jobs"
            menuPrefix="job"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            onAdd={() => {
              // window.location.href = "add-agency-jobs";
              history.push("add-agency-jobs");
            }}
            onEdit={() => onEdit()}
            onDelete={() => onRemove()}
            onStatusChange={() => onStatusChange()}
            onSelect={({ indexes }) => {
              let ids = [];
              let rows = [];
              let isDSelected = false;
              for (let i = 0; i < indexes.length; i++) {
                if (data[indexes[i].dataIndex]) {
                  if (!isDSelected) {
                    isDSelected =
                      data[indexes[i].dataIndex][4].status == 0 ? true : false;
                  }
                  ids.push(data[indexes[i].dataIndex][0]);
                  rows.push(indexes[i].dataIndex);
                }
              }
              setIsDraftSelected(isDSelected);
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
