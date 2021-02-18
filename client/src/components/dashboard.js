import React, { Fragment, useState, useEffect } from 'react'

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState('')

    useEffect(() => {
        const getName = async () => {
            try {
                const res = await fetch('/dashboard', {
                    method: 'GET', 
                    // Get the token in localStorage into the header
                    headers: { token: localStorage.token }
                })
                const data = await res.json()

                setName(data.user_name)

            } catch (err) {
                console.error(err.message)
            }
        }
        getName()
        // eslint-disable-next-line
    }, [])

    // Log out 
    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    return (
        <Fragment>
            <h1 className='mt-5'>Dashboard</h1>
            <p>Hello, {name}</p>
            <button className='btn btn-primary my-3' onClick={e => logOut(e)}>Log Out</button>
        </Fragment>
    )
}

export default Dashboard