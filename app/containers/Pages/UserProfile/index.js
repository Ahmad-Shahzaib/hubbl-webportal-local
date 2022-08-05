import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import AppBar from "@material-ui/core/AppBar";
import dummy from "dan-api/dummy/dummyContents";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Favorite from "@material-ui/icons/Favorite";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Cover,
  About,
  Connection,
  Favorites,
  Albums,
  AgencyAbout,
} from "dan-components";
import bgCover from "dan-images/petal_bg.svg";
import styles from "dan-components/SocialMedia/jss/cover-jss";
import data from "../../SampleApps/Timeline/api/timelineData";
import { fetchAction } from "../../SampleApps/Timeline/reducers/timelineActions";
import { getCookie, setCookie } from "dan-api/cookie";
import { IMGURL, resolveUrl, UPLOADURL } from "dan-api/url";
import avatarApi from "dan-api/images/avatars";

function TabContainer(props) {
  const { children } = props;
  return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function UserProfile(props) {
  const title = brand.name + " - Profile";
  const description = brand.desc;
  const { dataProps, classes, fetchData } = props;
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState(0);
  const [updatedData, setUpdatedData] = useState({
    first_name: "",
    last_name: "",
    profile_image: null,
  });

  useEffect(() => {
    fetchData(data);
  }, [fetchData, data]);

  useEffect(() => {
    setUserData(JSON.parse(getCookie("user")));
  }, [getCookie("user")]);
  // useEffect(() => {
  // const userData = JSON.parse(getCookie("user"));
  let userprofile = avatarApi[6];
  let name = "";
  let email = "";
  if (updatedData) {
    if (updatedData.profile_image) {
      userprofile = userData.profile_image.includes("https:")
        ? IMGURL + resolveUrl(userData.profile_image)
        : IMGURL + userData.profile_image;
    }
    name = updatedData.first_name + " " + updatedData.last_name;
    email = userData.email;
  }
  // }, []);

  const handleChangeData = (data) => {
    setUpdatedData(data);
  };

  const handleChange = (event, val) => {
    setValue(val);
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Cover coverImg={bgCover} avatar={userprofile} name={name} desc={email} />
      <AppBar position="static" className={classes.profileTab}>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label="Update Profile" />
            {/* <Tab icon={<AccountCircle />} label="Change Password" /> */}
          </Tabs>
        </Hidden>
      </AppBar>
      {/* >>> */}
      {value === 0 && (
        <TabContainer>
          {/* {getCookie("userType") == "agency" ? (
            <AgencyAbout data={dataProps} />
          ) : ( */}
            <About
              data={dataProps}
              userData={userData}
              handleChangeData={handleChangeData}
            />
          {/* )} */}
        </TabContainer>
      )}
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  dataProps: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state, // force state from reducer
  dataProps: state.socmed.dataTimeline,
});

const constDispatchToProps = (dispatch) => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
