import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const { message } = props;
  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          {message}
        </Typography>
      </Paper>
    </div>
  );
}
PaperSheet.propTypes = {
  message: PropTypes.string.isRequired,
};
