import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import PhoneIcon from "@material-ui/icons/LocalPhone";
import Chat from "@material-ui/icons/Chat";
import Mail from "@material-ui/icons/Mail";
import Check from "@material-ui/icons/CheckCircle";
import AccountBox from "@material-ui/icons/AccountBox";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./widget-jss";
import { IMGURL, resolveUrl } from "dan-api/url";

/* Tab Container */
function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
/* END Tab Container */

/* Contact List */
function ContactList(props) {
  const getItem = (dataArray) =>
    dataArray.map((data) => {
      return (
        <ListItem button key={data.id}>
          <Avatar
            alt={"Driver"}
            src={
              data.avatar == "avatar.png" || data.avatar == null
                ? IMGURL + "avatar.png"
                : IMGURL + resolveUrl(data.avatar)
            }
            className={props.classes.avatar}
          />
          <ListItemText primary={data.name} secondary={data.title} />
          {/* <Hidden xsDown>
          <ListItemSecondaryAction>
            <Tooltip title="Chat">
              <IconButton className={props.classes.blueText} aria-label="Chat">
                <Chat />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton className={props.classes.pinkText} aria-label="Email">
                <Mail />
              </IconButton>
            </Tooltip>
            <Tooltip title="Call">
              <IconButton className={props.classes.tealText} aria-label="Telp">
                <PhoneIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </Hidden>
        <Hidden smUp>
          <ListItemSecondaryAction>
            <IconButton
              aria-label="More"
              aria-haspopup="true"
              onClick={props.openMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Hidden> */}
        </ListItem>
      );
    });
  return <List>{getItem(props.data)}</List>;
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

const ContactListStyled = withStyles(styles)(ContactList);
/* END Contact List */

/* Conversation List */
// function MessagesList(props) {
//   const { classes } = props;
//   return (
//     <List>
//       <ListItem button component={NavLink} to="/app/pages/chat">
//         <Avatar
//           alt={dataContact[2].name}
//           src={dataContact[2].avatar}
//           className={classes.avatar}
//         />
//         <ListItemText
//           primary={dataContact[2].name}
//           className={classes.messages}
//           secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//         />
//         <ListItemSecondaryAction>
//           <Typography variant="caption">10:42 PM</Typography>
//         </ListItemSecondaryAction>
//       </ListItem>
//     </List>
//   );
// }

// MessagesList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const MessagesListStyled = withStyles(styles)(MessagesList);
// /* END Conversation List */

// /* Email List */
// function NotifList(props) {
//   const { classes, openMenu } = props;
//   return (
//     <List>
//       <ListItem button className={messageStyles.messageInfo}>
//         <Avatar className={messageStyles.icon}>
//           <Info />
//         </Avatar>
//         <ListItemText primary="Lorem ipsum dolor" secondary="12 Oct 2018" />
//         <Hidden xsDown>
//           <ListItemSecondaryAction>
//             <Button
//               variant="outlined"
//               size="small"
//               color="primary"
//               className={classes.button}
//             >
//               Fix it
//             </Button>
//             <Button variant="outlined" size="small" className={classes.button}>
//               Skip
//             </Button>
//           </ListItemSecondaryAction>
//         </Hidden>
//         <Hidden smUp>
//           <ListItemSecondaryAction>
//             <IconButton
//               aria-label="More"
//               aria-haspopup="true"
//               onClick={openMenu}
//             >
//               <MoreVertIcon />
//             </IconButton>
//           </ListItemSecondaryAction>
//         </Hidden>
//       </ListItem>
//     </List>
//   );
// }

// NotifList.propTypes = {
//   classes: PropTypes.object.isRequired,
//   openMenu: PropTypes.func.isRequired,
// };

// const NotifListStyled = withStyles(styles)(NotifList);
// /* END Email List */

function ContactWidget(props) {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAction, setAnchorElAction] = useState(null);

  const handleChange = (event, val) => {
    setValue(val);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenAction = (event) => {
    setAnchorElAction(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElAction(null);
  };

  const { classes, data } = props;
  const open = Boolean(anchorEl);
  const openAct = Boolean(anchorElAction);
  return (
    <Fragment>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Chat className={classes.blueText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Chat" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Mail className={classes.pinkText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Email" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PhoneIcon className={classes.tealText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Call" />
        </MenuItem>
      </Menu>
      <Menu
        id="long-menu-act"
        anchorEl={anchorElAction}
        open={openAct}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Check className={classes.tealText} />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Fix it" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PlaylistAddCheck />
          </ListItemIcon>
          <ListItemText variant="inset" primary="Skip" />
        </MenuItem>
      </Menu>
      <Paper className={classes.rootContact}>
        <AppBar position="static" color="default">
          <Hidden mdUp>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab icon={<AccountBox />} />
              <Tab icon={<Chat />} />
              <Tab icon={<PhoneIcon />} />
            </Tabs>
          </Hidden>
          <Hidden smDown>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Timesheets" icon={<AccountBox />} />
              <Tab label={"Income E-Forms"} icon={<Chat />} />
              <Tab label={"Travel Expenses"} icon={<PhoneIcon />} />
            </Tabs>
          </Hidden>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <ContactListStyled
              data={data.latest_timesheets}
              openMenu={handleOpen}
            />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ContactListStyled
              data={data.latest_incomeFomrs}
              openMenu={handleOpen}
            />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <ContactListStyled
              data={data.latest_expensesheet}
              openMenu={handleOpen}
            />
          </TabContainer>
        )}
      </Paper>
    </Fragment>
  );
}

ContactWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactWidget);
