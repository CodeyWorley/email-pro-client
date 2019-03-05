import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import Addresses from './addresses';
import Emails from './emails';

const Dashboard = props => {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
        props.history.push("/");
    }

    // good idea for global push messages after completing forms on all pages
    const [alert, setAlert] = useState('');
    // if(props.location.state.alert) {
    //     //setAlert(props.location.state.alert);
    // }
    
    return (
        <Route render={({history}) => (
            <section className='dashboard'>
                <div className='dashboard-container'>
                    {alert}
                    <Addresses />
                    <Emails />
                </div>
            </section>
        )}/>
    );
};

export default Dashboard;