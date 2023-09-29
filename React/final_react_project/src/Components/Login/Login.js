import React, { useState } from 'react';
import Users from '../Users';
import { useDispatch } from 'react-redux';
import { curentUSer, logStatus } from '../../Redux/Reducers/UserSlice/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|fr)$/;
        const isValidEmail = emailPattern.test(newEmail);
        setValidEmail(isValidEmail);
    };

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const notify = () => toast.error('Email or Password Incorrect');

    const isLogin = (e) => {
        e.preventDefault();
        const userExist = Users.find((userObj) => userObj.email === email && userObj.password === password);
        if (userExist) {
            console.log('true');
            dispatch(curentUSer(userExist));   
            dispatch(logStatus(true));
            navigate('/home');
        } else {
            console.log('Error: Invalid email or password');
            notify();
        }
    };

    return (
        <div className='main'>
            <ToastContainer />
            <div className='login-form'>
                <div className='formulaire'>
                    <h4>Sign In</h4>
                    <form onSubmit={isLogin}>
                        <span className='emailIcon'><i class="fa-solid fa-envelope"></i></span>
                        <input type="text" id='email' placeholder="E-mail" value={email} onChange={handleEmailChange} />
                        {!validEmail && (<p className='errorEmail'>! Please enter a valid email</p>)}
                        <span className='passIcon'><i class="fa-solid fa-lock"></i></span>
                        <input type="password" id='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                        <button type="submit" className='loginButton'>SIGN IN</button>

                    </form>
                    <p>Don't have an account? </p>
                </div>
            </div>
        </div>
    );
};

export default Login;