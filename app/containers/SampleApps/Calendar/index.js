import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import "dan-styles/vendors/react-big-calendar/react-big-calendar.css";
import {
  EventCalendar,
  DetailEvent,
  AddEvent,
  Notification,
} from "dan-components";
import {
  fetchAction,
  addAction,
  discardAction,
  submitAction,
  deleteAction,
  closeNotifAction,
} from "./reducers/calendarActions";
import events from "./api/eventData";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL } from "dan-api/url";
import axios from "axios";
import moment from "moment";

const styles = {
  root: {
    display: "block",
  },
};

function Calendar(props) {
  // Redux State
  const [eventData, setData] = useState([]);
  const messageNotif = useSelector((state) => state.calendar.notifMsg);

  // Dispatcher
  const remove = useDispatch();
  const closeNotif = useDispatch();

  const [anchorEl, setAnchorEl] = useState(false);
  const [event, setEvent] = useState(null);
  const [anchorPos, setAnchorPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (getCookie("id")) {
      getData();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleClick = (e) => {
    setTimeout(() => {
      const target = document.getElementsByClassName("rbc-selected")[0];
      const targetBounding = target.getBoundingClientRect();
      setEvent(e);
      setAnchorEl(true);
      setAnchorPos({ top: targetBounding.top, left: targetBounding.left });
    }, 200);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  // main methods
  function getData(l) {
    let url =
      URL +
      "getCalendar" +
      "/" +
      getCookie("userType") +
      "/" +
      getCookie("agency_id");

    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data);
          let items = [];
          for (let i = 0; i < res.data.calendars.length; i++) {
            let item = {
              id: res.data.calendars[i].id,
              title:
                res.data.calendars[i].event +
                " - " +
                res.data.calendars[i].driver_name,
              start: new Date(moment(res.data.calendars[i].event_date)),
              end: new Date(moment(res.data.calendars[i].event_date)),
              hexColor: "EE930F",
            };
            items.push(item);
          }
          console.log(items);
          setData(items);
        } else {
          // toast.error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        // toast.error("Something Went Wrong!");
        // console.log(err);
      });
  }

  const title = brand.name + " - Calendar";
  const description = brand.desc;
  const { classes } = props;
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
      <Notification
        close={() => closeNotif(closeNotifAction)}
        message={messageNotif}
      />
      <div className={classes.root}>
        <EventCalendar
          events={eventData}
          handleEventClick={(e) => handleClick(e)}
        />
        <DetailEvent
          event={event}
          anchorEl={anchorEl}
          anchorPos={anchorPos}
          close={handleClose}
          remove={(payload) => remove(deleteAction(payload))}
        />
        {/* <AddEvent
          openForm={openFrm}
          addEvent={() => addEvent(addAction)}
          closeForm={() => discardEvent(discardAction)}
          submit={(payload) => submit(submitAction(payload))}
        /> */}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
