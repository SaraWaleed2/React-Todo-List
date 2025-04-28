// import { teal } from '@mui/material/colors';
import './App.css'
import TodoList from './Components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoContext } from './Contexts/todoContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';



const initialTodos = [
  {
    id: uuidv4(),
    title: "Todo 1",
    details: "Details of Todo 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Todo 2",
    details: "Details of Todo 2",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Todo 3",
    details: "Details of Todo 3",
    isCompleted: false,
  }
]

function App() {
  const [todos, setTodos] = useState(initialTodos)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#303f9f',
        dark: '#002884',
        contrastText: 'white',
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <TodoList />
        </div>
      </TodoContext.Provider>
    </ThemeProvider>
  )
}

export default App
