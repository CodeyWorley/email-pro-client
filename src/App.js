import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/nav';
import Footer from './components/footer';
import LandingPage from './components/landing-page';
import RegisterPage from './components/register-page';
import LoginPage from './components/login-page';
import Dashboard from './components/dashboard-page';
import EmailPage from './components/email-page';

// import ErrorPage from './components/error-page';

const App = () => {
  return (
    <Router>
        <div className='App'>
            <Nav />
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/email' component={EmailPage} />
            </Switch>
            <Footer />
        </div>
    </Router>
  );
};

export default App;