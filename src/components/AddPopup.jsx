import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  let todolist = {
      title: "",
      description: ""
  }

  let padding = {
    float: "right"
  }

  const [todo, setTodo] = React.useState(todolist)


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
    
  async function handleSubmit() {
    await axios.post('http://localhost:3001/addList', todo)
    let res = await axios.get('http://localhost:3001/getList')
    props.updateLatest(res.data)
    setOpen(false);
  }
  
  function handleChange(e) {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value
    })
  }

  function handleLogout (){
    localStorage.clear();window.location.reload();
  }

  return (
    <div>
      <Fab color="primary" aria-label="add"  onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Button variant="contained" color="secondary" style={padding} onClick={handleLogout}>
        Log Out
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add To-Do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            onChange={event => handleChange(event)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            onChange={event => handleChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}