import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useToast } from "../Contexts/ToastContext";

export default function SimpleSnackbar({ open ,message}) {

    const { setOpen } = useToast();
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                message="Note archived"
                action={action}
            >
                <Alert variant="filled" severity="success" onClose={()=>{setOpen(false)}}>{message}</Alert>

            </Snackbar>
        </div>
    );
}
