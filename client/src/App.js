import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Components/dashboard/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import Landing from './Components/layout/Landing'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Components/layout/Spinner'

toast.configure()

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
 
  // set isAuthenticated to true or false
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }
  const setLoader = (boolean) => {
    setLoading(boolean)
  }
      // check if the person is still Authenticated
  const isAuth = async () => {
    try {
      const res = await fetch('/auth/verify', {
        method: 'GET',
        headers: { token: localStorage.token },
      })
      const data = await res.json()
     // if authenticated, then
     if(data === true) {
     setIsAuthenticated(true)
     } else {
      setLoading(false)
      setIsAuthenticated(false)
     }
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    isAuth()
    // eslint-disable-next-line
  }, [])
  
    return (
      <Fragment>
        <Router>
         <div className='container'>
           <Switch>
           <Route exact path='/' render={props => !isAuthenticated ? (<Landing {...props} />) :( <Redirect to='/dashboard' />) } />

          <Route exact path='/login' render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to='/dashboard' /> } />

          <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to='/login' />} />

          <Route exact path='/dashboard' render={props => isAuthenticated ? <Dashboard {...props} setLoader={setLoader} setAuth={setAuth} /> : loading ? <Spinner /> : <Redirect to='/login' /> } />
          </Switch>
         </div>
       </Router>
       
      </Fragment>
    );
  
 
 
}

export default App;
