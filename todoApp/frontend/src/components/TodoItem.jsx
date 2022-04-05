/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionChange, actionDelete, actionEdit } from '../store/store';

export const TodoItem = ({ data, getUpdate, getDelete, getEdit }) => {
    const { _id, todoData, isDone } = data;
    const [check, setCheck] = useState(isDone);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState(todoData);

    return (
        <li>
            <div className="check">
                <label className="container">
                    <input onChange={() => { setCheck(!check); getUpdate(_id, editData, !check); }} checked={check} type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="tusk">
                {
                    edit
                        ? <input type="text" value={editData} onChange={(e) => setEditData(e.target.value)}/>
                        : <p className={`${check ? 'line-through' : ''}`}>{todoData}</p>
                }
            </div>
            <div className="delete">
                <button onClick={() => getDelete(_id)}>
                    DELETE
                </button>
            </div>
            <div className="edit">
                {
                    edit
                        ? <button onClick={ () => getEdit(_id, editData, check) } >SAVE</button>
                        : <button onClick={ () => { setEdit(!edit); setEdit(!edit); }} >EDIT</button>
                };
            </div>
        </li>
    );
};

export const CTodoItem = connect(null, { getUpdate: actionChange, getDelete: actionDelete, getEdit: actionEdit })(TodoItem);
