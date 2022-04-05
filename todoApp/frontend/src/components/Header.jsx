/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { actionFullLogout } from '../store/store';

const Header = ({ getLogout, currentUser }) => {
    return (
        <header>
            <ul>
                <li><Link className="Link" to="/">TodoList</Link></li>
                <li><Link className="Link" to="/loginF">Login</Link></li>
                <li onClick={() => getLogout()}>Logout[{ currentUser }]</li>
            </ul>
        </header>
    );
};

export const CHeader = connect(state => ({ currentUser: state?.auth?.payload?.userName || 'anon' }), { getLogout: actionFullLogout })(Header);
