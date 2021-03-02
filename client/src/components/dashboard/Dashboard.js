import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

// components
import InputTodo from '../todos/InputTodo'
import ListTodos from '../todos/ListTodos'

const Dashboard = ({ setAuth, setLoader }) => {
    const [name, setName] = useState('')
    const [allTodos, setAllTodos] = useState([])
    const [todosChange, setTodosChange] = useState(false)

    const getName = async () => {
        try {
            const res = await fetch('/dashboard', {
                method: 'GET', 
                // Get the token in localStorage into the header
                headers: { token: localStorage.token }
            })
            const data = await res.json()
            setAllTodos(data)
            setName(data[0].user_name)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getName()
        setTodosChange(false)
        // eslint-disable-next-line
    }, [todosChange])

    // Log out 
    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        setLoader(false)
        toast.success('Logging Out')
    }

    return (
        <Fragment>
           <div className='d-flex mt-5 justify-content-around'>
           <h2>{name}'s Todo List</h2>
            <button className='btn btn-primary' onClick={e => logOut(e)}>Log Out</button>
           </div>
           
            <InputTodo setTodosChange={setTodosChange} />
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
        </Fragment>
    )
}

export default Dashboard