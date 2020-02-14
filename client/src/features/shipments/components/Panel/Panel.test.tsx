import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";

import { Panel } from "./Panel";
import AuthProvider from "../../../../context/AuthProvider";

configure({ adapter: new Adapter() });

describe("<Panel />", () => {
  let wrapper: any;
  const currentDate = moment().format("MMM Do YY");

  beforeEach(() => {
    wrapper = mount(<Router><AuthProvider><Panel /></AuthProvider></Router>);
  });

  it(`Should display current date ${currentDate}`, () => {
    expect(wrapper.contains(currentDate)).toEqual(true);
  });
});
