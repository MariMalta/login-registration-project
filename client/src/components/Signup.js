import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './Validation';

function Signup() {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        const {name, value } = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        console.log(errors);
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            console.log(values);
            axios.post('http://localhost:3001/signup', values)
                .then(res => {
                    console.log("success")
                    navigate('/');
                })
                console.log("error to add info")
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign-up</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='Enter name' name='name' onChange={handleInput} className='form-control'></input>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='text' placeholder='Enter email' name='email' onChange={handleInput} className='form-control'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password' onChange={handleInput} className='form-control'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100'>Create account</button>
                    {/* <Link to="/" className='btn btn-default w-100 bg-light'>Create account</Link> */}
                    <p>You agree to our terms and policies</p>
                    <Link to="/home" className='btn btn-default w-100 bg-light'>Login</Link>
                </form>
            </div>
        </div>

    )
}

export default Signup