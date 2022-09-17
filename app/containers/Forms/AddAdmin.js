import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { SourceReader, PapperBlock } from "dan-components";
import { AddAdminForm } from "./demos";
import axios from "axios";
import FormData from "form-data";
import { getCookie, setCookie } from "dan-api/cookie";
import { adminValidator } from "dan-api/validator";
import { URL } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function AddAdmin() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stayHere, setStayHere] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  function loading(status) {
    setIsLoading(status);
  }

  const submit = (values) => {
    const isValid = adminValidator(values);
    if (typeof isValid == "string") {
      toast.warn(isValid);
      loading(false);
      return;
    }
    const formdata = new FormData();

    if (files.length) {
      formdata.append("file", files[0]);
    }
    for (const property in values) {
      formdata.append(property, values[property]);
    }
    axios({
      method: "POST",
      url: URL + "addAdmin",
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setIsSuccess(true);
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/all-admins";
              history.back();
            }, 3000);
          }
          toast.success(res.data.message);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  };

  const title = brand.name + " - Add Admin";
  const description = brand.desc;
  const docSrc = "containers/Forms/demos/";
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
        title="Create New Admin Account"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to create a new user account with admin privilages"
      >
        <div>
          <AddAdminForm
            onSubmit={(values) => {
              setIsSuccess(false);
              loading(true);
              submit(values);
            }}
            onUpload={(f) => setFiles(f)}
            submitDisabled={isLoading}
            stayHere={stayHere}
            handleStayHere={() => setStayHere(!stayHere)}
            isSuccess={isSuccess}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(AddAdmin);
