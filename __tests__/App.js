import React from 'react';
import ReactDOM from 'react-dom';
import { App, Title, Input, Button } from '../src/App';
import  { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('there should be child component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
});

test('reflect className when this.state.text is changed', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
        text: 'newText',
    });
    expect(wrapper.find('.newText').length).toBe(1);
});

test('setState is called when handleClick is called', () => {
    const wrapper = shallow(<App />);
    const setStateSpy = jest.spyOn(App.prototype, 'setState');

    wrapper.setState({
        inputValue: 'newValue',
    })

    wrapper.instance().handleClick();

    expect(setStateSpy).toHaveBeenCalledWith({
        text: 'newValue',
        inputValue: '',
    });
});

test('display props', () => {
    const wrapper = shallow(<Title text='React'/>);
    expect(wrapper.text()).toBe('Hello React');
    wrapper.setProps({ text: 'World' });
    expect(wrapper.text()).toBe('Hello World');
})

test('fire callback function when change event is called', () => {
    const handleChangeSpy = jest.fn();

    const wrapper = shallow(<Input handleChange={handleChangeSpy} />);
    const event = { target: { value: 'value' } };
    wrapper.find('input').simulate('change', event);
    expect(handleChangeSpy).toHaveBeenCalledWith('value');
})

test('snapshot of <App />', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});