import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  useEffect(() => {
    // check if the person is still Authenticated
    const isAuth = async () => {
      try {
        const res = await fetch('/auth/verify', {
          method: 'GET',
          headers: { token: localStorage.token},
        })
        const data = await res.json()
       // if authenticated, then
        data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

      } catch (err) {
        console.error(err.message)
      }
    }
    isAuth()
  })
  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>

            <Route exact path='/login' render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to='/dashboard' /> } />

            <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to='/login' />} />

            <Route exact path='/dashboard' render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to='/login' /> } />

          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
