import { useEffect, useMemo, useState } from "react";
import { Container, Divider, Box } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Todo from "./Todo";
import { useToast } from "../Contexts/ToastContext";
import { useTodos } from "../Contexts/todoContext";


// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function TodoList() {
  const { todos, dispatch } = useTodos()

  const { showHideToast } = useToast();
  const [todoInput, setTodoInput] = useState("")
  const [filteredButtons, setFilteredButtons] = useState("all")

  //Close Dialog
  const [open, setOpen] = useState(false);
  const [trackTodos, setTrackTodos] = useState(null);

  //Update Dialog
  const [openUpdate, setOpenUpdate] = useState(false);


  const compeleteTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted
    })
  }, [todos])

  const inCompeleteTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted
    })
  }, [todos])

  let filteredTodos = todos

  if (filteredButtons == 'complete') {

    filteredTodos = compeleteTodos

  } else if (filteredButtons == 'incomplete') {

    filteredTodos = inCompeleteTodos

  } else {
    filteredTodos = todos
  }


  useEffect(() => {
    dispatch({ type: "getTodos" })
  }, [])


  function handleAddClick() {
    dispatch({ type: "AddTodo", payload: { titleInput: todoInput } })
    setTodoInput("")
    showHideToast("Added Successfully")
  }

  function handleFilterChange(filter) {
    setFilteredButtons(filter)
  }
  // Close Dialog
  const handleDeleteModalClose = () => {
    setOpen(false);
  };

  function handleDeleteClick(todo) {
    console.log(todo.id)
    setTrackTodos(todo)
    setOpen(true);
  }

  function handleDeleteConfirmation() {
    dispatch({ type: "DeleteTodo", payload: trackTodos })
    setOpen(false);
    showHideToast("Deleted Successfully")

  }

  //Update Dialog

  const handleUpdateModalClose = () => {
    setOpenUpdate(false);
  };

  function handleUpdateClick(todo) {
    setTrackTodos(todo)
    setOpenUpdate(true);
  }
  function updateTask() {
    dispatch({ type: "UpdateTodo", payload: trackTodos })
    setOpenUpdate(false);
    showHideToast("Updated Successfully")
  }

  const todoList = filteredTodos.map((t) => {
    return (<Todo key={t.id} todo={t} DeleteClick={handleDeleteClick} updateClick={handleUpdateClick} />)
  })

  return (
    <>
      {/*  Dialog  */}
      <Dialog
        open={open}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to complete the deletion?"}
        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">
            You cannot undo a delete once it is completed
          </DialogContentText>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteConfirmation} autoFocus>
            Agree
          </Button>
          <Button onClick={handleDeleteModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/*  Dialog  */}

      {/* /////////////////////////////////////////////////////////// */}

      <Dialog
        open={openUpdate}
        onClose={handleUpdateModalClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
            },
          },
        }}
      >
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Todo Title"
            type="text"
            fullWidth
            variant="standard"
            value={trackTodos?.title}
            onChange={(event) => {
              setTrackTodos({ ...trackTodos, title: event.target.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={trackTodos?.details}
            onChange={(event) => {
              setTrackTodos({ ...trackTodos, details: event.target.value })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateTask}>Update</Button>
          <Button onClick={handleUpdateModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* /////////////////////////////////////////////////////////// */}

      <Container maxWidth="sm">
        <Card sx={{
          minWidth: 275, maxHeight: '95vh', overflow: 'scroll', '&::-webkit-scrollbar': {
            display: 'none'
          }
        }} elevation={3}>

          <CardContent >

            <Typography variant="h4" sx={{ fontWeight: '600', textAlign: 'center', fontSize: '2.5rem' }}>
              Todo
            </Typography>

            {/* /////////////////////////////////////////////////////////////// */}

            <Divider sx={{ margin: "20px 0" }} />

            {/* /////////////////////////////////////////////////////////////// */}

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => handleFilterChange('all')} sx={{ textTransform: "capitalize" }} variant={filteredButtons == 'all' ? 'contained' : 'outlined'}>ALL</Button>
                <Button onClick={() => handleFilterChange('incomplete')} sx={{ textTransform: "capitalize" }} variant={filteredButtons == 'incomplete' ? 'contained' : 'outlined'}>Incomplete</Button>
                <Button onClick={() => handleFilterChange('complete')} sx={{ textTransform: "capitalize" }} variant={filteredButtons == 'complete' ? 'contained' : 'outlined'}>Complete</Button>
              </ButtonGroup>
            </Box>

            {/* /////////////////////////////////////////////////////////////// */}

            {
              todoList
            }

            {/* /////////////////////////////////////////////////////////////// */}

            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid size={8}>
                <TextField id="outlined-basic" label="Task Title" variant="outlined" sx={{ width: '100%' }} value={todoInput} onChange={(event) => {
                  setTodoInput(event.target.value)
                }} />
              </Grid>
              <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                <Button disabled={todoInput.length == 0} onClick={handleAddClick} variant="contained" sx={{ textTransform: "capitalize", width: '100%', height: "100%" }}>Add Task</Button>
              </Grid>
            </Grid>

            {/* /////////////////////////////////////////////////////////////// */}

          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default TodoList
