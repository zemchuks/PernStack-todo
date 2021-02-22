import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const ListTodos = () => {
    const [todos, setTodos] = useState([])

    // Delete todo
    const deleteTodo = async (id) => {
        await fetch(`/todos/${id}`,{
            method: 'DELETE',
        })
    setTodos(todos.filter(todo => todo.todo_id !== id))
    }
    
    const getTodos = async () => {
            const res = await fetch('/todos')
            const data = await res.json()
            setTodos(data)
            console.log(data);
    }

    useEffect(() => {
        getTodos()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default ListTodos