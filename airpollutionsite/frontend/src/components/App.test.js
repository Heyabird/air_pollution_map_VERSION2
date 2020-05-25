import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// somehow the mapbox import is making this testsuite not run :(. Need to figure how to work this out...
describe('App component', () => {
    global.URL.createObjectURL = jest.fn();
    it('Renders without crashing', () => {
        global.URL.createObjectURL = jest.fn(() => 'details');
      shallow(<App />)
    })
})