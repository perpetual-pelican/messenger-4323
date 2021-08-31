import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  unreadCountText: {
    fontSize: 10,
    fontWeight: 600
  },
  unreadCount: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1, 2, "auto", "auto"),
    background: theme.palette.primary.main,
  },
  unreadCountWide: {
    width: theme.spacing(3),
    height: theme.spacing(2),
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1, 2, "auto", "auto"),
    background: theme.palette.primary.main,
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
          <Typography className={classes.unreadCountText}>
            {unreadMessageCount}
          </Typography>
        </Avatar>
        : null
      }
    </Box>
  );
};

export default ChatContent;
