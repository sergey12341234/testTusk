/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreate } from '../store/store';

const AddTask = ({ createTusk }) => {
    const [data, setData] = useState('');
    return (
        <div className="AddTusk">
            <textarea onChange={(e) => setData(e.target.value) } maxLength="108" placeholder="type some tusk..."/>
            <button onClick={() => { createTusk(data); setData(''); }}>ADD</button>
        </div>
    );
};

export const CAddTask = connect(null, { createTusk: actionCreate })(AddTask);
