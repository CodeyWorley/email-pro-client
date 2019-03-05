import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Emails = props => {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState('');

    const fetchEmails = async () => {
        await axios({
            method: "get",
            url: `${API_BASE_URL}/api/emails`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
            },
        })   
        .then( res => {
            setEmails(res.data)
        })
        .catch( () => {
            setError("We're having trouble loading your data, please try refreshing the page.")
        })
    };

    const deleteEmail = async (id) => {
        await axios({
            method: "delete",
            url: `${API_BASE_URL}/api/emails/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
            },
        })   
        .then( () => {
            fetchEmails()
        })
    };

    const sendEmail = async (id, title, content, recipients) => {
        console.log('sending email', id, title, content, recipients)
    }

    useEffect( () => {
        fetchEmails();
    }, []);

    if(error) {
        console.log('do error stuff')
    }
    
    return (
        <Route render={({history}) => (
            <section className='emails'>
                <div className='emails-container'>
                <div className='emails-header'>
                    <h2>Emails</h2>
                    <button
                        onClick={() => history.push('/email')}
                        className='btn btn-delete-email'>
                        New
                    </button>
                </div>
                <div className='email-list'>
                    {emails.map( email => {
                        return (
                            <div className='email' key={email._id}>
                                <div className='email-title'>{email.title}</div>
                                <div className='email-content'>{email.content}</div>
                                <div className='email-recipients'>
                                    {email.recipients.map( recipient => {
                                        return (
                                            <div className='email-recipient'>{recipient.emailAddress}</div>
                                        )
                                    })}
                                </div>
                                <button
                                    onClick={() => deleteEmail(email._id)}
                                    className='btn btn-delete-email'>
                                    X
                                </button>
                                <button
                                    onClick={() => history.push({
                                        pathname: '/email',
                                        state: email
                                    })}
                                    className='btn btn-delete-email'>
                                    Edit
                                </button>
                                <button
                                    onClick={() => sendEmail(email._id, email.title, email.content, email.recipients)}
                                    className='btn btn-delete-email'>
                                    Send
                                </button>
                            </div>
                        )
                    })}
                </div>
                </div>
            </section>
        )}/>
    );
};

export default Emails;