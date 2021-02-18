import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({ setAuth }) => {
    const [text, setText] = useState({
        email: '',
        password: ''
    })

    const { email, password } = text

    const onChange = e => setText({ ...text, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            // Get the body data
            const body = { email, password }
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if(data.token) {
                 // save token to local storage
                localStorage.setItem("token", data.token)
                setAuth(true)
                toast.success('Login Successful')
            } else {
                setAuth(false)
                toast.error(data)
            }
        } catch (err) {
            console.error(err.message)
        }
        
    }
    return (
        <Fragment>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={onSubmit}>

                <input className='form-control my-3' value={email} onChange={e => onChange(e)} type='email' name='email' placeholder='Email' />

                <input className='form-control my-3' value={password} onChange={e => onChange(e)} type='password' name='password' placeholder='Password' />

                <button className='btn btn-success'>Login</button>
            </form>
            <Link to='/register'>Don't have an Account? Register</Link>
        </Fragment>
    )
}
export default Login