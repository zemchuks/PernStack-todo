import React, { Fragment } from 'react'

const Login = ({ setAuth }) => {
    return (
        <Fragment>
           <h1 className='mt-5'>Login</h1> 
           <button onClick={() => setAuth(true)}>Authenticate</button>
        </Fragment>
    )
}
export default Login