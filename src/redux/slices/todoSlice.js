import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    search: ""
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.text = text;
                localStorage.setItem("todos", JSON.stringify(state.todos))
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});


export const { addTodo, updateTodo, deleteTodo, setSearch } = todoSlice.actions;

export default todoSlice.reducer;