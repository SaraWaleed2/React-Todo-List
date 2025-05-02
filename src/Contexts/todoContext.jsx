import { useReducer, createContext, useContext } from "react";
import todosReducer from "../Reducers/todoReducer";

const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    return (
        <TodosContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
};

export const useTodos = () => {
    return useContext(TodosContext);
};


export default TodosProvider;
