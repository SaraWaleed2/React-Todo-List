import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from "react";
import { TodoContext } from "../Contexts/todoContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


export default function Todo({ todo }) {
    const { todos, setTodos } = useContext(TodoContext)
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateInput, setUpdateInput] = useState({ UpdatedTitle: todo.title, UpdatedDesc: todo.details })

    function handleCompele() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted
            }
            return t
        })
        setTodos(updatedTodos)
        localStorage.setItem('todo', JSON.stringify(updatedTodos))

    }

    const handleDeleteModalClose = () => {
        setOpen(false);
    };
    const handleUpdateModalClose = () => {
        setOpenUpdate(false);
    };


    function handleDeleteClick() {
        setOpen(true);
    }
    function handleUpdateClick() {
        setOpenUpdate(true);
    }

    function handleDeleteConfirmation() {
        const filteredTodos = todos.filter((t) => {
            return t.id != todo.id
        })
        setTodos(filteredTodos)
        localStorage.setItem('todo', JSON.stringify(filteredTodos))

    }

    function updateTask() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                return { ...t, title: updateInput.UpdatedTitle, details: updateInput.UpdatedDesc }
            }
            else {
                return t
            }
        })
        setTodos(updatedTodos);
        localStorage.setItem('todo', JSON.stringify(updatedTodos))
        setOpenUpdate(false);
    }

    return (
        <>

            {/* /////////////////////////////////////////////////////////// */}

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
                            handleDeleteModalClose();
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
                        value={updateInput.UpdatedTitle}
                        onChange={(event) => {
                            setUpdateInput({ ...updateInput, UpdatedTitle: event.target.value })
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
                        value={updateInput.UpdatedDesc}
                        onChange={(event) => {
                            setUpdateInput({ ...updateInput, UpdatedDesc: event.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateTask}>Update</Button>
                    <Button onClick={handleUpdateModalClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* /////////////////////////////////////////////////////////// */}

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