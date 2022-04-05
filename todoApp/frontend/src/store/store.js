import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const { REACT_APP_BASE_URL } = process.env;

const customFetch = url =>
    (method, variables) => fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {})
        },
        ...(variables ? { body: JSON.stringify(variables) } : {})
    }).then(res => res.json());

const getRequestLogin = customFetch(`${REACT_APP_BASE_URL}/login`);
const getRequestToApi = customFetch(`${REACT_APP_BASE_URL}/api/todo`);

export function promiseReducer (state = {}, { type, name, status, payload, error }) {
    if (type === 'PROMISE') {
        return {
            ...state,
            [name]: { status, payload, error }
        };
    }
    if (type === 'CLEAR') {
        return {};
    }
    return state;
}

const authReducer = function (state, { type, token }) {
    let payload;

    if (state === undefined) {
        if (localStorage.authToken) {
            type = 'AUTH_LOGIN';
            token = localStorage.authToken;
        } else {
            type = 'AUTH_LOGOUT';
        };
    };
    if (type === 'AUTH_LOGIN') {
        payload = jwtDecode(token);
        console.log(payload);
        if (payload) {
            localStorage.authToken = token;
            return {
                token: token,
                payload: payload
            };
        }
    }
    if (type === 'AUTH_LOGOUT') {
        localStorage.removeItem('authToken');

        return {};
    };

    return state || {};
};

export const jwtDecode = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        throw new Error(e);
    }
};

export const actionFullLogout = () =>
    async dispatch => {
        await dispatch(actionAuthLogout());
        dispatch(actionClear());
    };
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });
const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token });
const actionPending = name => ({ type: 'PROMISE', name, status: 'PENDING' });
const actionFulfilled = (name, payload) => ({ type: 'PROMISE', name, status: 'FULFILLED', payload });
const actionRejected = (name, error) => ({ type: 'PROMISE', name, status: 'REJECTED', error });
const actionClear = (name, error) => ({ type: 'CLEAR' });
const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name));
        try {
            const payload = await promise;
            dispatch(actionFulfilled(name, payload));
            return payload;
        } catch (error) {
            dispatch(actionRejected(name, error));
        }
    };

export const actionFullLogin = (userName) =>
    async (dispatch, getState) => {
        const token = await dispatch(actionPromise('login', getRequestLogin('POST', { userName })));
        if (token) {
            await dispatch(actionAuthLogin(token.token));
            dispatch(actionPromise('allPosts', getRequestToApi('GET')));
        }
    };

export const actionLogin = () =>
    async (dispatch, getState) => {
        const token = localStorage.authToken;
        if (token) {
            await dispatch(actionAuthLogin(token));
            dispatch(actionPromise('allPosts', getRequestToApi('GET')));
        }
    };

export const actionChange = (id, todoData, isDone) =>
    async dispatch => {
        const requestToUpdate = customFetch(`${REACT_APP_BASE_URL}/api/todo/${id}`);
        dispatch(actionPromise('update', requestToUpdate('PUT', { todoData, isDone })));
    };

export const actionEdit = (id, todoData, isDone) =>
    async dispatch => {
        const requestToUpdate = customFetch(`${REACT_APP_BASE_URL}/api/todo/${id}`);
        await dispatch(actionPromise('update', requestToUpdate('PUT', { todoData, isDone })));
        dispatch(actionPromise('allPosts', getRequestToApi('GET')));
    };

export const actionDelete = (id) =>
    async dispatch => {
        const requestToDelete = customFetch(`${REACT_APP_BASE_URL}/api/todo/${id}`);
        await dispatch(actionPromise('remove', requestToDelete('DELETE', { id })));
        dispatch(actionPromise('allPosts', getRequestToApi('GET')));
    };

export const actionCreate = (todoData) =>
    async dispatch => {
        await dispatch(actionPromise('create', getRequestToApi('POST', { todoData })));
        dispatch(actionPromise('allPosts', getRequestToApi('GET')));
    };

export const reducers = combineReducers({ promise: promiseReducer, auth: authReducer });

export const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(actionLogin());
console.log(REACT_APP_BASE_URL);
