/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { CTodoItem } from './TodoItem';

export const TodoList = ({ posts }) => {
    return (
        <ul>
            {posts.reverse().map(item => <CTodoItem key={`${item._id}`} id={item._id.toString()} data={item}/>)}
        </ul>
    );
};

export const CTodoList = connect(state => ({ posts: state?.promise?.allPosts?.payload || [] }))(TodoList);
