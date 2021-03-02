import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const ListTodos = ({ allTodos, setTodosChange }) => {

    const [todos, setTodos] = useState([])

    // Delete todo
    const deleteTodo = async (id) => {
        await fetch(`/dashboard/todos/${id}`,{
            method: 'DELETE',
            headers: { token: localStorage.token }
        })
        setTodos(todos.filter(todo => todo.todo_id !== id))
    }

    useEffect(() => {
        setTodos(allTodos)
        // eslint-disable-next-line
    }, [allTodos])

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
                    {todos.length !== 0 && todos[0].todo_id !== null && todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} setTodosChange={setTodosChange} /></td>
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