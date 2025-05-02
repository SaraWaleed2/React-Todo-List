import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useToast } from "../Contexts/ToastContext";
import { useTodos } from "../Contexts/todoContext";



export default function Todo({ todo, DeleteClick, updateClick }) {
    const { todos, dispatch } = useTodos()

    const { showHideToast } = useToast();


    function handleCompele() {
        dispatch({ type: "CompleteTodo", payload: todo })
        showHideToast("Status Updated")

    }

    function handleDeleteClick() {
        DeleteClick(todo);
    }
    function handleUpdateClick() {
        updateClick(todo)
    }

    return (
        <>

            <Card className='card-box' sx={{ minWidth: 275, marginTop: "10px", background: "#303f9f", color: "white" }} elevation={2} >

                <CardContent>

                    <Grid container spacing={2}>
                        <Grid size={8} >
                            <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '1.3rem', textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                                {todo.title}
                            </Typography>
                            <Typography variant="body1" >
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            <IconButton onClick={handleCompele} aria-label="delete" size='small' className='icon-button' style={{ color: todo.isCompleted ? "white" : "#8bc24a", backgroundColor: todo.isCompleted ? "#8bc24a" : "white", border: "2px solid #8bc24a" }}>
                                <CheckIcon />
                            </IconButton>

                            <IconButton onClick={handleUpdateClick} aria-label="delete" size='small' className='icon-button' style={{ color: "#0277bd", backgroundColor: "white", border: "2px solid #0277bd" }}>
                                <EditIcon />
                            </IconButton>

                            <IconButton onClick={handleDeleteClick} aria-label="delete" size='small' className='icon-button' style={{ color: "#e91e62", backgroundColor: "white", border: "2px solid #e91e62" }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                </CardContent>


            </Card>
        </>
    )

}