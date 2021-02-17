import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path='/login' render={props => <Login {...props} /> } />
            <Route exact path='/register' render={props => <Register  {...props} />} />
            <Route exact path='/dashboard' render={props => <Dashboard  {...props} /> } />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
