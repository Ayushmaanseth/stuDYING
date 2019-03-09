import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Downshift from './Downshift.js'

import profilepic from './profilepic.jpg';
import logo from './logo.jpg';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '50',
    // height: '..',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // alignItems: 'center',
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];


class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">

      <p class="container">
        <img src={logo} width={300} />
      </p>

      <p class="container">
        <img src={profilepic} width={100} height={100} />
      </p>

        <TextField
          required
          id="standard-password-input"
          label="Name"
          className={classes.textField}
          type="name"
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          required
          id="standard-password-input"
          label="Email"
          className={classes.textField}
          type="email"
          autoComplete="current-password"
          margin="normal"
        />

        <Downshift />

      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(IntegrationDownshift);
export default withStyles(styles)(TextFields);
// export {TextFields, IntegrationDownshift};
