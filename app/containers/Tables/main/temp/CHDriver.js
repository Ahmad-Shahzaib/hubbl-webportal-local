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

function AllCHDrivers(props) {
  const title = brand.name + " - Company House";
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
      name: "Driver Code",
      options: {
        filter: true,
      },
    },
    {
      name: "Company Name",
      options: {
        filter: false,
      },
    },
    {
      name: "Registration Number",
      options: {
        filter: true,
      },
    },
    {
      name: "Registered Office Address",
      options: {
        filter: true,
      },
    },
    {
      name: "Company Status",
      options: {
        filter: true,
      },
    },
    {
      name: "Incorporated On",
      options: {
        filter: true,
      },
    },
    {
      name: "Officers Name & Address",
      options: {
        filter: true,
      },
    },
    {
      name: "Last Account Made Up",
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
      url: URL + "webAllCHDrivers",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          let company_houses = [];
          for (let i = 0; i < res.data.ch.length; i++) {
            let company_house = [];
            company_house.push("D" + res.data.ch[i].driver_id);
            company_house.push(res.data.ch[i].company_name);
            company_house.push(res.data.ch[i].registration_number);
            company_house.push(res.data.ch[i].office_address);
            company_house.push(res.data.ch[i].company_status);
            company_house.push(res.data.ch[i].incorporated_on);
            company_house.push(res.data.ch[i].Officers_details);
            company_house.push(res.data.ch[i].made_up);

            company_houses.push(company_house);
          }
          setData(company_houses);
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
        icon="ion-md-car"
        title="HGV Driver Hub - Company Houses"
        desc="Companies House Verification List"
      >
        <div>
          <AdvFilter
            title="Drivers"
            columns={columns}
            data={data}
            noActionButton={true}
            onAdd={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onStatusChange={() => {}}
            onSelect={({ indexes }) => {}}
            selectableRowsHideCheckboxes={true}
          />
        </div>
      </PapperBlock>
      <AlertDialog {...dialog} />
    </div>
  );
}

export default withStyles(styles)(AllCHDrivers);
