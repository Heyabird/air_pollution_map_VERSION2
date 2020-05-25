import React from 'react';
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom';
import TimeSeriesChart from './timeSeriesChart.js';

Enzyme.configure({ adapter: new Adapter() });


describe('Time Series Chart component', () => {
    it('Renders without crashing', () => {
      shallow(<TimeSeriesChart />)
    })
})