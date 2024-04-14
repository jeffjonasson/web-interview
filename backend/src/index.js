import express from 'express'
import cors from 'cors'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const defaultData = {
  [uuidv4()]: {
    title: 'First New List',
    todos: [{ title: 'First todo of first list!', completed: false }],
  },
  [uuidv4()]: {
    title: 'Second New List',
    todos: [{ title: 'First todo of second list!', completed: false }],
  },
}

const db = new LowSync(new JSONFileSync('db.json'), defaultData)
db.read()
db.write()

app.get('/todos', (req, res) => res.send(db.data))

app.post('/update-todo', (req, res) => {
  try {
    const { id, todos } = req.body
    db.data[id].todos = todos
    db.write()
    res.send(db.data)
  } catch (error) {
    console.error('Error adding todo:', error)
    res.status(500).send('Error adding todo')
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
