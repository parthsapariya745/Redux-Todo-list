let initialState = { todos: [] }

export let reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AddTodo':
            return { todos: [...state.todos, action.payload] }
        case 'ClearTodo':
            return { todos: [] }
        case 'saveTodo':
            return { todos: state.todos.map(() => [...state.todos, action.payload]) }
        case 'DeleteTodo': 
            return { todos: state.todos.filter((_, i) => i !== action.payload) }
        default:
            return state
    }
}