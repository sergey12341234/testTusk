/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { actionFullLogin } from '../store/store';

const Login = ({ getLogin }) => {
    const [login, setLogin] = useState('');
    return (
        <div className='Login'>
            <h1>Login</h1>
            <input type="text" onChange={(e) => setLogin(e.target.value) } placeholder='input login...'/>
            <Link className="loginLink" to="/"><button onClick={() => getLogin(login)}>Login</button></Link>
        </div>
    );
};

export const CLogin = connect(null, { getLogin: actionFullLogin })(Login);
