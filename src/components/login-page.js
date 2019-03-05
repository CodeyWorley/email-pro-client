import React, {useState} from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// css import here

// TODO set error html with error hook
const LoginPage = props => {
    let token = localStorage.getItem('jwtToken');
    if (token) {
        props.history.push('/dashboard');
    }

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const loginUser = async history => {
        let data = {
            username,
            password
        };

        axios.post(`${API_BASE_URL}/api/auth/login`, data)
            .then( res => {
                // Set token to localStorage
                const token = res.data.authToken;
                localStorage.setItem('jwtToken', token);
            })
            .then( () => history.push('/dashboard'))
            .catch( err => {
                // set form error by err type
                if(err) {
                    setError('username')
                }
            })
    };

    return (
        <Route render={({history}) => (
            <section className='login'>
                <div className='login-container'>
                    <Link to='/' className=''>
                        <i className='material-icons left'>keyboard_backspace</i>
                        Back to home
                    </Link>
                    <div className='login-header'>
                        <h4>Login below</h4>
                        <p>
                            Don't have an account?{' '}
                            <Link className='register' to='/register'>Register</Link>
                        </p>
                    </div>
                    <form
                        className='form login-form'
                        noValidate
                        onSubmit={event => event.preventDefault()}>
                    
                            <label htmlFor='userName'/>
                            <input
                                className='input form-input'
                                id='userName'
                                type='text'
                                placeholder='Username'
                                onChange={event => setUser(event.target.value)}
                            />
                        
                            <label htmlFor='password'/>
                            <input
                                className='input form-input'
                                id='password'
                                type='password'
                                placeholder='Password'
                                onChange={event => setPassword(event.target.value)}
                            />
                        
                            <button
                                onClick={() => loginUser(history)}
                                type='submit'
                                className='btn btn-login-submit'>
                                Log In
                            </button>
                    </form>
                </div>
            </section>
        )}/>
    );
};

export default LoginPage;