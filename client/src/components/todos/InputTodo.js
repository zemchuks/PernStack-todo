/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState('') 

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            //to add more than one headers
            const newHeader = new Headers()

            newHeader.append('Content-Type', 'application/json')
            newHeader.append('token', localStorage.token)

            const body = { description }
            const res = await fetch('/dashboard/todos', {
                method: 'POST',
                headers: newHeader,
                body: JSON.stringify(body)
            })
            const data = await res.json()
            console.log(data);
            // window.location = '/'
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