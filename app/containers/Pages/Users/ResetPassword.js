import React, { useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ResetForm } from "dan-components";
import styles from "../../../components/Forms/user-jss";
import axios from "axios";
import { setCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword(props) {
  const [data, setData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function loading(status) {
    setIsLoading(status);
  }

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  const submit = () => {
    axios({
      method: "GET",
      url: URL + "WebReset/" + data.email,
    })
      .then((res) => {
        loading(false);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          setCookie("user_id_pr", res.data.user_id);
          window.location.href = "/verify";
        }
      })

      .catch((err) => {
        toast.error("Something Went Wrong!");
        loading(false);
      });
  };

  const title = brand.name + " - Reset Password";
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
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
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <ResetForm
            {...data}
            handleChange={handleChange}
            onSubmit={() => {
              loading(true);
              submit();
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
