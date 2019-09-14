import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default props => {
  return (
    <div className="form">
    
      <p><h2>Login Now</h2> </p>
      <br/>
      <p>Email: test@todo.com </p>
      <p>Password: todo </p>

      <TextField error={props.error} onChange={props.handleChange} fullWidth label="Email" placeholder="Enter your Email ID" name="email" margin="normal" />

      <TextField error={props.error} onChange={props.handleChange} fullWidth label="Password" placeholder="Enter Password" type="password" name="password" margin="normal" />
      
      <Button onClick={props.handleClick} className="form-btn" fullWidth variant="contained">Login</Button>
      
    </div>
  )
}