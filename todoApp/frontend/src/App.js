import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { CLogin } from './components/Login';
import Main from './components/Main';
import { CHeader } from './components/Header';

const history = createHistory();

function App () {
    return (
        <Router history={history}>
            <Provider store={store}>
                <CHeader />
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/loginF" exact component={CLogin}/>
                    </Switch>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
