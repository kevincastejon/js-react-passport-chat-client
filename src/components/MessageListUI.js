import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Utils from '../Utils';

let autoScroll = true;
let lastScrollIndex = null;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '80px',
    marginBottom: '80px',
    width: '100%',
    // height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    // maxHeight: '80vh',
    paddingLeft: '10px',
  },
  inline: {
    // display: 'inline',
    overflowWrap: 'anywhere',
  },
  avatar: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function MessageListUI(props) {
  const classes = useStyles();
  const { loading, messages, onLoadMore } = props;
  const itemScroll = autoScroll ? messages.length - 1 : (
    lastScrollIndex ? messages.length - 1 - lastScrollIndex : messages.length - 1
  );
  return (
    <div
      className={classes.root}
      onScroll={(e) => {
        if (e.target.scrollTop === 0) {
          autoScroll = false;
          lastScrollIndex = messages.length;
          onLoadMore();
        } else if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
          autoScroll = true;
          lastScrollIndex = null;
        }
      }}
    >
      {!loading ? null : (
        <div style={{ textAlign: 'center' }}>
Loading
          <CircularProgress />
        </div>
      )}
      <List>
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            ref={i === itemScroll ? (el) => {
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            } : null}
          >
            {(i === 0 || (i > 0 && !Utils.sameDay(messages[i - 1].createdAt, msg.createdAt))) ? (
              <>
                <Divider component="li" />
                <li>
                  <Typography
                    className={classes.dividerFullWidth}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >
                    {Utils.extractSimpleDate(msg.createdAt)}
                  </Typography>
                </li>
              </>
            ) : null}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  style={{
                    color: '#fff',
                    backgroundColor: msg.postedBy.color,
                  }}
                  alt={msg.postedBy.name}
                  src={msg.postedBy.avatar ? msg.postedBy.avatar : null}
                >
                  {msg.postedBy.avatar ? null : msg.postedBy.name[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${msg.postedBy.name} - ${Utils.extractHour(msg.createdAt)}`}
                secondary={(
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {msg.content}
                    </Typography>
                  </>
  )}
              />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}
MessageListUI.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    postedBy: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      avatar: PropTypes.string,
    }),
  })).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
