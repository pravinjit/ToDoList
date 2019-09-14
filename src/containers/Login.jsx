import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import jwt from 'jsonwebtoken'
import LoginForm from '../components/LoginForm';
import { SALT_KEY } from '../config';
import Helmet from 'react-helmet';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleClick() {
    /* Form Validation */
    let validEmail = /\S+@\S+\.\S+/.test(this.state.email) ? true : this.setState({error: true});
    let validPassword = this.state.password ? true : this.setState({error: true});
    if (!validEmail || !validPassword) return false;

    if(this.state.email === "test@todo.com" && this.state.password === "todo"){
      
      localStorage.setItem('loggedin', jwt.sign({ id: "test@todo.com" }, SALT_KEY));

      this.props.history.push('/home');
    }
  }

  componentWillMount(){
    if(localStorage.getItem('loggedin')){
      this.props.history.push('/home');
    }
  }


  render() {
    return (
      <div className="user-wrapper">
        <Helmet>
            <title>Welcome To Do</title>
        </Helmet>
        <Grid container spacing={0}>
          <Grid className="bg-image" item xs={12} sm={6}></Grid>
          
          <Grid className="form-block" item xs={12} sm={6}>
            <LoginForm 
              handleChange={this.handleChange} 
              handleClick={this.handleClick}
              error={this.state.error}
              alert={this.props.alert}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter (Login);