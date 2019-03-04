import React from "react";
import { Route } from "react-router-dom";

const Dashboard = props => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
        props.history.push("/dashboard");
    }

    return (
        <Route
            render={({history}) => (
                <section className='dashboard-page'>
                    dashboard
                </section>
            )}
        />
    );
};

export default Dashboard;