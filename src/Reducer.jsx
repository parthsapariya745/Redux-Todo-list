let initialState = { todos: [] }

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AddTodo':
            return { todos: [...state.todos, action.payload] }
        case 'ClearTodo':
            return { todos: [] }
        case 'saveTodo':
            return { todos: state.todos.map((e, i) => i === action.index ? action.editValue : e) }
        case 'DeleteTodo': 
            return { todos: state.todos.filter((_, i) => i !== action.payload) }
        default:
            return state
    }
}