import React from "react";
import { Route } from "react-router-dom";
import '../stylesheets/landing.css';

const LandingPage = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route render={({history}) => (
            <section className='landing'>
                <div className='landing-container'>
                    <div className='landing-header'>
                        <h2>Do Email Marketing Like A Pro</h2>
                    </div>
                    <div className='btn-container'>
                        <button
                            className='btn btn-register'
                            onClick={() => history.push(`/register`)}>
                            Register
                        </button>
                        <button
                            className='btn btn-login'
                            onClick={() => history.push(`/login`)}>
                            Log In
                        </button>
                    </div>
                </div>
            </section>
        )}/>
    );
};

export default LandingPage;