import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Downshift from './Downshift.js'
import  { Redirect } from 'react-router-dom'

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

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  selectedTopics: [''],};

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        let path = '/feed';
        this.props.history.push(path);
    }


  // handleChange(event) {
  //   //this.setState({name: event.target.value});
  //   event.preventDefault();
  //   this.setState({ name: event.target.value });
  // };

  // handleChange = name => event => {
  //    event.preventDefault();
  //    console.log(event.target.value);
  //     this.setState({ [name]: event.target.value });
  //   };

  handleSubmit = event => {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    this.routeChange();

  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>

      <p className="container">
        <img src={logo} width={300} />
      </p>

      <p className="container">
        <img src={profilepic} width={100} height={100} />
      </p>

        <TextField
          required
          id="name"
          label="Name"
          className={classes.textField}
          type="name"
          margin="normal"
        />

        <TextField
          required
          id="email"
          label="Email"
          className={classes.textField}
          type="email"
          margin="normal"
        />

        <Downshift
          id='topics'
          />

          <Button onClick={this.handleSubmit} variant="contained" color="secondary"
                  className={classes.button} style={{marginTop: '3rem'}}>
              Login
          </Button>


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
