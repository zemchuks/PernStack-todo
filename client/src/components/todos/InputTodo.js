/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState('') 

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = { description }
            const res = await fetch('/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            window.location = '/'
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Pern Todo List</h1>
            <form className='d-flex m-5' onSubmit={onSubmit}>
                <input className='form-control' type='text' placeholder='Add Todo' onChange={e => setDescription(e.target.value)} />
                <button className='btn btn-success ml-3'>Add</button>
            </form>
        </Fragment>
    )
}
export default InputTodo