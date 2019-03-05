import React from 'react';
import { withRouter } from 'react-router-dom';

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
            <nav>
                EmailPro
                {navRight}
            </nav>
        </React.Fragment>
    );
};

export default withRouter(Nav);
