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

const styles = {
  root: {
    flexGrow: 1,
  },
};

function ErrorLogs(props) {
  const title = brand.name + " - Admins";
  const description = brand.desc;
  const docSrc = "containers/Tables/demos/";
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
  const [dialog, setDialog] = useState(defaultDialog);

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Exception",
      options: {
        filter: true,
      },
    },

    {
      name: "File",
      options: {
        filter: true,
      },
    },
    {
      name: "Line #",
      options: {
        filter: true,
      },
    },
    {
      name: "Error Occured Count",
      options: {
        filter: true,
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

  function getData() {
    axios({
      method: "GET",
      url: URL + "WebErrorLogsList",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let errorlogs = [];
          for (let i = 0; i < res.data.errorlogs.length; i++) {
            let logs = [];
            logs.push(res.data.errorlogs[i].id);
            logs.push(res.data.errorlogs[i].exception);
            logs.push(res.data.errorlogs[i].file);
            logs.push(res.data.errorlogs[i].line);
            logs.push(res.data.errorlogs[i].count);

            errorlogs.push(logs);
          }
          setData(errorlogs);
        } else {
          toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
        console.log(err);
      });
  }

  function updateStatus() {
    axios({
      method: "POST",
      url: URL + "webUpdateAdminStatus",
      data: JSON.stringify({
        ids: dataIDs.join(","),
        type: getCookie("userType"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Status updated successfully");
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
        title="HGV Driver Hub - Error Logs"
        desc="Error Logs List"
      >
        <div>
          <AdvFilter
            title="Error List"
            columns={columns}
            data={data}
            rowsSelected={dataIDs.length ? rowsSelected : []}
            noActionButton={true}
            selectableRowsHideCheckboxes={true}
            onAdd={() => {
              window.location.href = "#";
            }}
            onEdit={() => {
              setCookie("editDataId", dataIDs[0]);
              window.location.href = "#";
            }}
            onDelete={() => {
              deleteItems();
            }}
            onStatusChange={() => {
              setDialog({
                open: true,
                title: "Confirmation!",
                text: "Change the status of the selected item(s)?",
                agreeBtnTitle: "Yes",
                disagreeBtnTitle: "No",
                onClose: ({ type }) => {
                  if (type) {
                    updateStatus();
                    setDialog(defaultDialog);
                  } else {
                    setDialog(defaultDialog);
                  }
                },
              });
            }}
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
    </div>
  );
}

export default withStyles(styles)(ErrorLogs);
