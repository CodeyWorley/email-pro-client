import React from 'react';
import { withRouter } from 'react-router-dom';
import '../stylesheets/nav.css';

const Nav = props => {
    let token = localStorage.getItem('jwtToken');

    let navRight;
    if (token) {
        navRight = (
            <button
                onClick={() => logoutUser()}
                className='btn btn-logout'>
                Logout
            </button>
        );
    }

    const logoutUser = async () => {
        await localStorage.removeItem('jwtToken');
        props.history.push('/');
    };
    
    return (
        <React.Fragment>
            <nav className='navbar'>
                <div className='nav-container'>
                <button
                    onClick={() => props.history.push('/')}
                    className='btn btn-logo'>
                    EmailPro
                </button>
                    {navRight}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default withRouter(Nav);
