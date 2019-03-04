import React from "react";
import { Route } from "react-router-dom";

const RegisterPage = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route
            render={({history}) => (
                <section className='register-page'>
                    register
                </section>
            )}
        />
    );
};

export default RegisterPage;