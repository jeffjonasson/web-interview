import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckIcon from '@mui/icons-material/Check'
import { TodoListForm } from './TodoListForm'

const fetchTodoLists = () => {
  return fetch('http://localhost:3001/todos')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error fetching todo lists:', error)
      return {}
    })
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const updateTodoListHandler = async (id, todos) => {
    try {
      const response = await fetch('http://localhost:3001/update-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, todos }),
      })
      if (response.ok) {
        const data = await response.json()
        setTodoLists(data)
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => {
              const isCompletedTodos = todoLists[key].todos.every((todo) => todo.completed)
              return (
                <ListItemButton key={key} onClick={() => setActiveList(key)}>
                  <ListItemIcon>{isCompletedTodos && <CheckIcon />}</ListItemIcon>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={todoLists[key].title} />
                </ListItemButton>
              )
            })}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(todos) => updateTodoListHandler(activeList, todos)}
        />
      )}
    </Fragment>
  )
}
