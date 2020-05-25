import React from 'react';
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom';
import averageTable from './averageTable.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Average Table component', () => {
    it('Renders without crashing', () => {
      shallow(<averageTable />)
    })
})