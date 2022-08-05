import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "../demos";
import axios from "axios";
import moment from "moment";
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

function IR35DriverScore(props) {
  const title = brand.name + " - IR35 Driver Scores";
  const description = brand.desc;
  const docSrc = "containers/Tables/demos/";
  const [data, setData] = useState([]);
  const [dataIDs, setDataIDs] = useState([]);
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
      name: "S No.",
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
      name: "Score",
      options: {
        filter: true,
      },
    },
    {
      name: "Last Updated",
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
      url: URL + "webir35Driver",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let items = [];
          for (let i = 0; i < res.data.scores.length; i++) {
            let item = [];
            item.push(res.data.scores[i].driver_id);
            item.push(res.data.scores[i].driver_name);
            item.push(res.data.scores[i].score);
            item.push(res.data.scores[i].updated_at);

            items.push(item);
          }
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
        icon="ion-ios-list-box"
        title="HGV Driver Hub - IR35 Driver Scores"
        desc="Drivers List of IR35 Traffic Lights Score"
      >
        <div>
          <AdvFilter
            title="All Drivers Score"
            columns={columns}
            data={data}
            selectableRowsHideCheckboxes={true}
            noActionButton={true}
            onSelect={({ indexes }) => {}}
          />
        </div>
      </PapperBlock>
      <AlertDialog {...dialog} />
    </div>
  );
}

export default withStyles(styles)(IR35DriverScore);
