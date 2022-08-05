import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { LoginForm } from "dan-components";
import styles from "dan-components/Forms/user-jss";
import axios from "axios";
import { removeCookie, setCookie } from "dan-api/cookie";
import { loginValidator } from "dan-api/validator";
import { login as loginRequest } from "dan-api/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname == "/") {
      history.replace("/login");
    }
  }, []);
  const submitForm = (values) => {
    const isValid = loginValidator(values);
    if (typeof isValid == "string") {
      return toast.warn(isValid);
    }
    loginRequest(values)
      .then((res) => {
        // console.log(res.data);
        setIsLoading(false);
        if (res.data.status == 400) {
          toast.warn(res.data.message);
        } else if (res.data.status == 200) {
          setCookie("userType", "admin", 2);
          setCookie("user_id", res.data.id, 2);
          setCookie("email", res.data.email, 2);
          setCookie("profile_image", JSON.stringify(res.data.avatar), 2);
          setCookie("user", JSON.stringify(res.data), 2);

          setCookie("id", res.data.id, 2);

          window.location.href = "/app";
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something Went Wrong!");
        // console.log(err);
      });
  };

  const title = brand.name + " - Login";
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
          <LoginForm
            isLoading={isLoading}
            onSubmit={(values) => {
              setIsLoading(true);
              submitForm(values);
            }}
          />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
