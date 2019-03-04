import React from "react";
import { Route } from "react-router-dom";

const LoginPage = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route
            render={({history}) => (
                <section className='login-page'>
                    login
                </section>
            )}
        />
    );
};

export default LoginPage;