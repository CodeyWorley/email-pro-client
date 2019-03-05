import React, {useState} from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// css import here

// TODO set error html with error hook ***look at register user endpoint errors**
const RegisterPage = props => {
    let token = localStorage.getItem('jwtToken');
    if (token) {
        props.history.push('/dashboard');
    }

    const [username, setUser] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const registerUser = history => {
        let data = {
            username,
            emailAddress,
            password
        };

        axios.post(`${API_BASE_URL}/api/users`, data)
            .then( () => history.push("/login"))
            .catch( err => {
                if(err) {
                    setError('username')
                }
            });
    };

    return (
        <Route render={({history}) => (
            <section className='register'>
                <div className='register-container'>
                    <Link to='/' className=''>
                        <i className='material-icons left'>keyboard_backspace</i>
                        Back to home
                    </Link>
                    <div className='register-header'>
                        <h4>Register below</h4>
                        <p>
                            Already have an account?{" "}
                            <Link className="loginLink" to='/login'>Log In</Link>
                        </p>
                    </div>
                    <form
                        className='form registration-form'
                        noValidate
                        onSubmit={event => event.preventDefault()}>

                        <label htmlFor='userName'></label>
                        <input
                            className='input form-input'
                            id='userName'
                            type='text'
                            placeholder='Username'
                            onChange={event => setUser(event.target.value)}
                        />

                        <label htmlFor='email'/>
                        <input
                            className='input form-input'
                            id='email'
                            type='email'
                            placeholder='Email'
                            onChange={event => setEmail(event.target.value)}
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
                            onClick={() => registerUser(history)}
                            type='submit'
                            className='btn btn-register-submit'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </section>
        )}/>
    );
};

export default RegisterPage;