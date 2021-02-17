import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ setAuth }) => {
    const [text, setText] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = text

    const onChange = e => setText({ ...text, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = { name, email, password }
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await res.json()

           // save token to local storage
           localStorage.setItem("token", data.token)
           // Go to Dashboard
           setAuth(true)
        } catch (err) {
            console.error(err.message)
        }
        
    }
    return (
        <Fragment>
            <h1 className='text-center my-5'>Register</h1>
            <form onSubmit={onSubmit}>
                <input className='form-control my-3' value={name} onChange={e => onChange(e)} type='text' name='name' placeholder='Name' />
                <input className='form-control my-3' value={email} onChange={e => onChange(e)} type='email' name='email' placeholder='Email' />
                <input className='form-control my-3' value={password} onChange={e => onChange(e)} type='password' name='password' placeholder='Password' />
                <button className='btn btn-success'>Register</button>
            </form>
            <Link to='/login'>Already Registered? Log in</Link>
        </Fragment>
    )
}
export default Register