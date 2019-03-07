import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { Link, Route } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../stylesheets/addresses.css';

const Addresses = props => {
    const [emailAddresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);

    const [addressName, setAddressesName] = useState('');
    const [addressEmail, setAddressesEmail] = useState('');

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

    const deleteAddress = async (id) => {
        await axios({
            method: "delete",
            url: `${API_BASE_URL}/api/addresses/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
            },
        })   
        .then( () => {
            fetchAddresses()
        })
    };

    const createAddress = async (name, email) => {
        await axios({
            method: "post",
            url: `${API_BASE_URL}/api/addresses/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken"))
            },
            data: {
                name,
                emailAddress: email
            }
        })   
        .then( () => {
            fetchAddresses();
            setAddressesName('');
            setAddressesEmail('');
        })
        .catch( err => {
            if(err) {
                setError('email exists')
            }
        })
    };

    useEffect( () => {
        fetchAddresses();
    }, []);
    
    return (
        <section className='email-addresses'>
            <div className='addresses-container'>
            <div className='emails-header'>
                <h2>Addresses</h2>
            </div>
            <form
                className='address-form'
                noValidate
                onSubmit={event => event.preventDefault()}>
            
                    <label htmlFor='name'/>
                    <input
                        className='input form-input address-input'
                        id='name'
                        type='text'
                        placeholder='name'
                        onChange={event => setAddressesName(event.target.value)}
                        value={addressName}
                    />
                
                    <label htmlFor='email'/>
                    <input
                        className='input form-input address-input'
                        id='email'
                        type='email'
                        placeholder='email'
                        onChange={event => setAddressesEmail(event.target.value)}
                        value={addressEmail}
                    />
                
                    <button
                        onClick={() => createAddress(addressName, addressEmail)}
                        type='submit'
                        className='btn btn-create-address'>
                        Add
                    </button>
            </form>
            
            <div className='email-address-list'>
                {emailAddresses.map( email => {
                    return (
                        <div className='address' key={email._id}>
                            <div className='email-address'>{email.emailAddress}</div>
                            <button
                                onClick={() => deleteAddress(email._id)}
                                className='btn btn-delete-address'>
                                delete
                            </button>
                        </div>
                    )
                })}
            </div>
            </div>
        </section>
    );
};

export default Addresses;