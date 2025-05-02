import { createContext, useState, useContext } from "react";
import SimpleSnackbar from "../Components/MySnackBar";

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function showHideToast(message) {
        setOpen(true)
        setMessage(message)
        setTimeout(() => {
            setOpen(false)
        }, 1500);
    }
    return (
        <ToastContext.Provider value={{ showHideToast, setOpen }}>
            <SimpleSnackbar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext);
};