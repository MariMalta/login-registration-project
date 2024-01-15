import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Validation from './Validation';


function Login() {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    
    const handleInput = (event) => {
        console.log(values);
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
        console.log(values);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        console.log(values);
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:3001/login', values)
                .then(res => {
                    if(res.data === "success") {
                        navigate('/home');
                    }
                    else{
                        console.log(res.data)
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded'>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
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
                    <button className='btn btn-success w-100'>Log in</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-default w-100 bg-light'>Create account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login