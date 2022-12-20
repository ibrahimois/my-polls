import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import middleware from '../middleware';
import reducer from '../reducers';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
const store = legacy_createStore(reducer, middleware)

const component = render(
    <Provider store={store}>
        <Router>
            <Dashboard />
        </Router>
    </Provider>
)
describe('Dashboard', () => {

    it("matches the snapshot", () => {
        expect(component).toMatchSnapshot();
    })
})