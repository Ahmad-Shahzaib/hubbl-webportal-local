import React, { useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NewPasswordForm } from "dan-components";
import styles from "../../../components/Forms/user-jss";
import axios from "axios";
import { getCookie, setCookie } from "dan-api/cookie";
import { passwordValidator } from "dan-api/validator";
import { URL } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewPassword(props) {
  const [data, setData] = useState({
    new_password: "",
    confirm_password: "",
    user_id: getCookie("user_id_pr"),
  });
  const [isLoading, setIsLoading] = useState(false);

  function loading(status) {
    setIsLoading(status);
  }

  const handleChange = (name) => (event) => {
    // alert('working')
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  const submit = () => {
    const isValid = passwordValidator(data);
    if (typeof isValid == "string") {
      loading(false);
      return toast.warn(isValid);
    }
    axios({
      method: "POST",
      url: URL + "newPasswordWeb",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        loading(false);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          toast.info("Redirecting");
          toast.success("Password Reset Successfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
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
      <ToastContainer />
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
          <NewPasswordForm
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

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPassword);
