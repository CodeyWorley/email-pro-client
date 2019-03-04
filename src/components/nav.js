import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Nav = props => {
    let token = localStorage.getItem("jwtToken");

    let navRight;
    if (token) {
        navRight = (
            <div>
                logged in
            </div>
        );
    }

    const logoutUser = async () => {
        await localStorage.removeItem("jwtToken");
        props.history.push("/");
    };
    
    return (
        <React.Fragment>
            <section>
                nav
                {navRight}
            </section>
        </React.Fragment>
    );
};

export default withRouter(Nav);
