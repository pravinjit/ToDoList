import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AddPopup from '../components/AddPopup';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    fab:{
      margin: theme.spacing(1),  
    }
  }));

  let textStyle = {
    color: 'red',
    textDecoration: "line-through" 
  }

  let paddingStyle = {
    padding: '30px'
  }
  
function AddForm(props)  {
  if(!localStorage.getItem('loggedin')){
    localStorage.clear();
    props.history.push('/');
  }
  
  let [todos, updateTodo] = useState([])
  let [open, setOpen] = React.useState(false);
  let todolist = {
    title: "",
    description: "",
    id: ""
  }
  const [todo, setTodo] = React.useState(todolist)

  let getData = async () => {
    let res = await axios.get('http://localhost:3001/getList')
    updateTodo(res.data)
  }

  useEffect(() => {
    getData();
  }, [])

  let updateLatest = (todo) => updateTodo(todo)

  function handleClose() {
    setOpen(false);
  }

  function editList(val) {
    setTodo({
      title: val.title,
      description: val.description,
      id: val.todo_id
    })
    setOpen(true);
  }

  function handleChange(e) {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value
    })
  }

  async function handleUpdate(type, id = '') {
    if (type === 'edit') {
      await axios.post('http://localhost:3001/updateList', { ...todo, type })
      setOpen(false);
    }
    if (type === 'status') {
      await axios.post('http://localhost:3001/updateList', { id : id.id, status: id.event.target.checked, type })
    }
    if (type === 'delete') {
      await axios.post('http://localhost:3001/updateList', { id, type })
    }
    let res = await axios.get('http://localhost:3001/getList')
    updateTodo(res.data)
  }

  const classes = useStyles();

  return (
    <div style={paddingStyle}>
    <AddPopup updateLatest={(todo) => updateLatest(todo)} editList={() => editList()} />
    <Grid item xs={12} md={4}>
      <List className={classes.root}>
      {
        todos.length > 0 && todos.map(val => (
          <ListItem key={val.todo_id} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                onChange={(event) => handleUpdate('status', { id: val.todo_id, event})}
                edge="start"
                checked={val.status === 1 ? true : false}
                disableRipple
                inputProps={{ 'aria-labelledby': val.todo_id }}
              />
            </ListItemIcon>
            <ListItemText
              id={val.todo_id} primary={ val.status === 1 ? <Typography type="body2" style={textStyle}> {`${val.title} - ${val.date.split('T')[0]}`}</Typography> : <Typography type="body2" >{`${val.title} - ${val.date.split('T')[0]}`} </Typography>}
              secondary={val.status === 1 ? <Typography style={textStyle}> {val.description}  </Typography> : <Typography> {val.description} </Typography> }

            />
            
            
            <ListItemSecondaryAction>
              <IconButton onClick={() => editList(val)} color="secondary" aria-label="comments">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleUpdate('delete', val.todo_id)} edge="end" aria-label="comments" >
                  <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }    
      </List>
    </Grid>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit To-Do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            defaultValue={todo.title}
            onChange={event => handleChange(event)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            defaultValue={todo.description}
            onChange={event => handleChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUpdate('edit')} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default (AddForm);