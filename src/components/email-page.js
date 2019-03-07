import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../stylesheets/email-page.css';

const EmailPage = props => {
    const [emailAddresses, setAddresses] = useState([]);
    const [requestType, setRequestType] = useState('post');
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');

    const setUpdateFields = () => {
        let email = props.location.state;
        if(email) {
            setId(email._id)
            setTitle(email.title);
            setContent(email.content);
            setRequestType('put');
        }
    }

    const fetchAddresses = async () => {
        await axios({
            method: "get",
            url: `${API_BASE_URL}/api/addresses`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
            },
        })   
        .then( res => {
            setAddresses(res.data)
        })
        .catch( () => {
            setError("We're having trouble loading your data, please try refreshing the page.")
        })
    };

    const handleSubmit = async (title, content, emailAddresses, id) => {
        if(requestType === 'post') {
            await axios({
                method: "post",
                url: `${API_BASE_URL}/api/emails`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
                },
                data: {
                    title,
                    content,
                    recipients: emailAddresses
                }
            })   
            .then( () => {
                props.history.push({
                    pathname: '/dashboard',
                    state: { alert: 'Email successfully created' }
                })
            })
            .catch( err => {
                if(err) {
                    setError('error')
                }
            })
        }
        else if(requestType === 'put') {
            await axios({
                method: "put",
                url: `${API_BASE_URL}/api/emails/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
                },
                data: {
                    title,
                    content,
                    recipients: emailAddresses
                }
            })   
            .then( () => {
                props.history.push({
                    pathname: '/dashboard',
                    state: { alert: 'Email successfully updated' }
                })
            })
            .catch( err => {
                if(err) {
                    setError('error')
                }
            })
        }
    }

    useEffect( () => {
        fetchAddresses();
        setUpdateFields();
    }, []);
    
    return (
        <section className='email-page'>
            <div className='email-container'>
                <Link to='/dashboard' className='back-link'>
                    <i className='material-icons left'>keyboard_backspace</i>
                    Back to dashboard
                </Link>
                <div className='form-container'>
                    <div className='email-header'>
                        <h2 className='form-header'>Email</h2>
                    </div>
                    <form
                        className='form email-form'
                        noValidate
                        onSubmit={event => event.preventDefault()}>
                    
                            <label htmlFor='title'/>
                            <input
                                className='input form-input'
                                id='title'
                                type='text'
                                placeholder='Title'
                                onChange={event => setTitle(event.target.value)}
                                value={title}
                            />
                        
                            <label htmlFor='content'/>
                            <textarea
                                className='input form-input'
                                id='content'
                                type='textarea'
                                rows='8'
                                placeholder='Lorum ipsum...'
                                onChange={event => setContent(event.target.value)}
                                value={content}
                            />                        
                        
                            <button
                                onClick={() => handleSubmit(title, content, emailAddresses, id)}
                                type='submit'
                                className='btn btn-login-submit'>
                                Submit
                            </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EmailPage;