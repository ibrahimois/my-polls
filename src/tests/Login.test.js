import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Login from '../components/Login';
import middleware from '../middleware';
import reducer from '../reducers';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
const store = legacy_createStore(reducer, middleware)

const component = render(
    <Provider store={store}>
        <Router>
            <Login />
        </Router>
    </Provider>
)
const inputOne = component.getByPlaceholderText('Enter username');
const inputTwo = component.getByPlaceholderText('Enter password');
const submitBtn = component.getByTestId('submit-button');

describe('Login', () => {

    it("matches the snapshot", () => {
        expect(component).toMatchSnapshot();
    })


    it('matches the snapshot when fields are passed', () => {
        fireEvent.change(inputOne, { target: { value: 'Create a React app' } });
        fireEvent.change(inputTwo, { target: { value: 'Create a Python app' } });
        expect(component).toMatchSnapshot();
    });

})

