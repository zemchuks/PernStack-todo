const express = require('express')
const router = express.Router()
const pool = require('../db')

/**
 *  @route      GET api/todos
 *  @descr      Get all users todos
 */
router.get('/', async (req, res) => {
    try {
       const allTodos = await pool.query(
           "SELECT * FROM todo"
       )
       res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

/**
 *  @route      POST api/todos
 *  @descr      Add new todo
 *  @access     Private
 */
router.post('/', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description])
            res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

/**
 *  @route      GET api/todos
 *  @descr      Get a particular todo
 *  @access     Private
 */
router.get('/:id', async (req, res) => {
    try {
       const id = req.params.id
       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
       if(todo) {
           res.status(200).json(todo.rows[0])
       } else {
           res.json({ message: 'No valid entry found for provided ID'})
       }
    
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err}) 
    }
})

/**
 *  @route      PUT api/todos
 *  @descr      Update a todo
 *  @access     Private
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    try {
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]
        )
        res.json('Todo was updated')
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err})
    }
})

/**
 *  @route      DELETE api/todos
 *  @descr      Update a todo
 *  @access     Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id]
        )
        res.json("Todo was delettyed")
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err})
    }
})
module.exports = router