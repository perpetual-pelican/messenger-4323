import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const unreadCountBaseStyle = {
  marginTop: 10,
  marginRight: 20,
  height: 20,
  borderRadius: 10,
  background: "#3A8DFF",
  fontFamily: "OpenSans-semibold",
  fontSize: 10,
  letterSpacing: -0.5,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadCount: {
    width: 20,
    ...unreadCountBaseStyle
  },
  unreadCountWide: {
    width: 30,
    ...unreadCountBaseStyle
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessageCount } = conversation;
  const unreadCountClass =
    unreadMessageCount > 9 ? classes.unreadCountWide : classes.unreadCount;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessageCount ?
        <Avatar className={unreadCountClass}>
          {unreadMessageCount}
        </Avatar>
        : null
      }
    </Box>
  );
};

export default ChatContent;
