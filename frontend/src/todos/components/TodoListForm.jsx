import React, { useState } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Autosave, useAutosave } from 'react-autosave'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  useAutosave({ data: todos, onSave: saveTodoList })

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todos[index].completed}
                onChange={() => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      ...todos[index],
                      completed: !todos[index].completed,
                    },
                    ...todos.slice(index + 1),
                  ])
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.title}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      ...todos[index],
                      title: event.target.value,
                    },
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { title: '', completed: false }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
        <Autosave data={todos} onSave={saveTodoList} />
      </CardContent>
    </Card>
  )
}
