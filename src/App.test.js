import React from 'react';
import App from './App';
import { shallow, configure, mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('App components', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<App />).exists()).toBe(true)
  })

  it('should have text fields', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('TextField').exists()).toBe(true)
  })

  it('should have create squad button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('button.createSquads').exists()).toBe(true)
  })

  it('should have reset squad button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('button.resetSquads').exists()).toBe(true)
  })

  it('Pressing reset squad button should reset squads to 2 as default', () => {
    const wrapper = mount(<App />);
    wrapper.find('button.resetSquads').simulate('click')
    expect(wrapper.instance().state.squads).toEqual(2);
  })

});
