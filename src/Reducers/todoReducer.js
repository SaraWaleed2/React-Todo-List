import { v4 as uuidv4 } from 'uuid';

export default function todoReducer(currentTodo, action) {
    switch (action.type) {
        case 'AddTodo':
            {
                let addedTodo = [...currentTodo,
                {
                    id: uuidv4(),
                    title: action.payload.titleInput,
                    details: "",
                    isCompleted: false
                }];

                localStorage.setItem('todo', JSON.stringify(addedTodo))
                return addedTodo
            }
        case 'DeleteTodo':
            {
                console.log(action.payload)
                const filteredTodos = currentTodo.filter((t) => {
                    return t.id != action.payload.id
                })
                localStorage.setItem('todo', JSON.stringify(filteredTodos))
                return filteredTodos
            }
        case 'UpdateTodo':
            {
                const updatedTodos = currentTodo.map((t) => {
                    if (t.id == action.payload.id) {
                        return { ...t, title: action.payload.title, details: action.payload.details }
                    }
                    else {
                        return t
                    }
                })
                localStorage.setItem('todo', JSON.stringify(updatedTodos))
                return updatedTodos;

            }
        case 'getTodos': {
            let todoStorage = JSON.parse(localStorage.getItem("todo")) || [];
            return todoStorage
        }
        case 'CompleteTodo':
            {
                const updatedTodos = currentTodo.map((t) => {
                    // console.log(action.payload.id)
                    if (t.id == action.payload.id) {
                        return { ...t, isCompleted: !t.isCompleted }
                    }
                    return t
                })
                localStorage.setItem('todo', JSON.stringify(updatedTodos))
                return updatedTodos

            }
        default:
            throw Error(`Unhandled action type: ${action.type}`);


    }

}