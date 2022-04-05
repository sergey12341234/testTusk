import React from 'react';
import { CAddTask } from './AddTask';
import { CTodoList } from './TodoList';

const Main = () => {
    return (
        <div className="content">
            <h1>TODO List</h1>
            <CAddTask />
            <CTodoList />
        </div>
    );
};

export default Main;
