/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CTodoList } from './TodoList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('tests', () => {
    const initialState = {
        promise: {
            allPosts: {
                payload: [
                    { _id: '1', todoData: 'q', isDone: true },
                    { _id: '2', todoData: 'qw', isDone: false },
                    { _id: '3', todoData: 'qwe', isDone: true }
                ]
            }
        }
    };

    const mockStore = configureStore(initialState);
    const store = mockStore(initialState);

    test('+++ render the connected(SMART) component', async () => {
        const wrapper = mount(<Provider store={store}><CTodoList /></Provider>);
        render(wrapper);
        expect(screen.queryByText('q')).toBeInTheDocument();
    });

    it('+++ check Prop matches with initialState', () => {
        const wrapper = mount(<Provider store={store}><CTodoList /></Provider>);
        render(wrapper);
        console.log(store);
        // console.log(wrapper.debug());
        expect(screen.queryByText('q')).toBeInTheDocument();
    });
});
