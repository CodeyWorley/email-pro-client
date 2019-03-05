import React from "react";
import { Route } from "react-router-dom";

const LandingPage = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route render={({history}) => (
            <section className='landing'>
                <div className='landing-container'>
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
            </section>
        )}/>
    );
};

export default LandingPage;