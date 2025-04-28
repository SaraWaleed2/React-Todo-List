import { Container, Divider, Box } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../Contexts/todoContext";


function TodoList() {
  const { todos, setTodos } = useContext(TodoContext)
  const [todoInput, setTodoInput] = useState("")
  const [filteredButtons, setFilteredButtons] = useState("all")

  const compeleteTodos = todos.filter((t) => {
    return t.isCompleted
  })

  const inCompeleteTodos = todos.filter((t) => {
    return !t.isCompleted
  })

  let filteredTodos = todos

  if (filteredButtons == 'complete') {

    filteredTodos = compeleteTodos

  } else if (filteredButtons == 'incomplete') {

    filteredTodos = inCompeleteTodos

  } else {
    filteredTodos = todos
  }


  const todoList = filteredTodos.map((t) => {
    return (<Todo key={t.id} todo={t} />)
  })


  useEffect(() => {
    let todoStorage = JSON.parse(localStorage.getItem("todo")) || [];
    setTodos(todoStorage)
  }, [])


  function handleAddClick() {
    // setTodos([...todos, { id: uuidv4(), title: todoInput, details: "", isCompleted: false }]);
    let addedTodo = [...todos, { id: uuidv4(), title: todoInput, details: "", isCompleted: false }];

    setTodos(addedTodo);
    localStorage.setItem('todo', JSON.stringify(addedTodo))
    setTodoInput("")
  }

  function handleFilterChange(filter) {
    setFilteredButtons(filter)
  }

  return (
    <>
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
                <TextField id="outlined-basic" label="Task Title" variant="outlined" sx={{ width: '100%'}} value={todoInput} onChange={(event) => {
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
