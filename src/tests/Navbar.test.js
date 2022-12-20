import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Navbar from '../components/Navbar';
import middleware from '../middleware';
import reducer from '../reducers';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
const store = legacy_createStore(reducer, middleware)

const component = render(
    <Provider store={store}>
        <Router>
            <Navbar />
        </Router>
    </Provider>
)
describe('Navbar', () => {

    it("matches the snapshot", () => {
        expect(component).toMatchSnapshot();
    })
})