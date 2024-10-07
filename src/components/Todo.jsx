import { Button, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, setSearch, updateTodo } from '../redux/slices/todoSlice';
import { Delete, Edit } from '@mui/icons-material';

function Todo() {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const todos = useSelector(state => state.todos.todos);
    const search = useSelector(state => state.todos.search);
    const handleAddTodo = () => {
        if (isEditing) {
            dispatch(updateTodo({ id: currentId, text }));
            setIsEditing(false);
            setCurrentId(null)
        }
        else {
            dispatch(addTodo({ id: Date.now(), text }))
        }
        setText("")
    }
    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }
    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))
    return (
        <div style={{ width: "50%", margin: "auto" }}>
            <div style={{ width: "100%" }}>
                <TextField
                    label="Add Todo.."
                    variant='outlined'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "100%" }}
                />
                <Button color='primary' variant='contained' style={{ width: "100%", marginTop: 20 }} onClick={handleAddTodo}>
                    Add Todo
                </Button>
                <TextField
                    label="Search.."
                    variant='outlined'
                    value={search}
                    onChange={handleSearch}
                    style={{ width: "100%", marginTop: 20 }}
                />
                <List>
                    {filteredTodos.map(todo => (
                        <ListItem key={todo.id}>
                            <ListItemText primary={todo.text} />
                            <div>
                                <IconButton onClick={() => {
                                    setText(todo.text)
                                    setIsEditing(true)
                                    setCurrentId(todo.id)
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default Todo