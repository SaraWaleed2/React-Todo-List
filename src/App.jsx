import './App.css'
import TodoList from './Components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TodosProvider from './Contexts/todoContext';
import { ToastProvider } from './Contexts/ToastContext';


function App() {

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
      <TodosProvider>
        <ToastProvider>
          <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  )
}

export default App
