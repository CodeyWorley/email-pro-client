import React from "react";
import { Route } from "react-router-dom";

const LandingPage = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route
            render={({history}) => (
                <section className='landing-page'>
                   landing
                </section>
            )}
        />
    );
};

export default LandingPage;