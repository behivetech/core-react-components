import TextFieldControlled from '../TextFieldControlled';

jest.mock('../withFormControl');
jest.mock('../withValidation');

describe('TextFieldControlled', () => {
    const getEvent = (value='mock value') => {
        return {
            target: {value},
        };
    };
    const getProps = () => {
        return {
            className: 'mock-class',
            label: 'mock-label',
            name: 'mockName',
        };
    };

    it('should render with the correct props', () => {
        const wrapper = shallow(<TextFieldControlled {...getProps()} value="mock value" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.dive()).toMatchSnapshot();
        expect(wrapper.props().onChange(getEvent())).toBe(null);
        wrapper.setProps({validate: {mockValidate: jest.fn()}});
        expect(wrapper.dive()).toMatchSnapshot();
        expect(wrapper.dive().instance().state.value).toBe('mock value');
    });

    it('should set state, formState and run onChange prop when changed', () => {
        const mockOnChange = jest.fn();
        const mockEvent = getEvent();
        const wrapperInstance = shallow(
            <TextFieldControlled {...getProps()} onChange={mockOnChange} />
        ).dive().instance();
        const {formState, name} = wrapperInstance.props;

        wrapperInstance.handleChange(mockEvent);
        expect(wrapperInstance.state.value).toBe('mock value');
        expect(formState.setFieldValueDebounced).toBeCalledWith(name, mockEvent.target.value);
        expect(mockOnChange).toBeCalledWith(mockEvent);
    });

    it('should set form state value if a value prop is set', () => {
        const wrapperInstance = shallow(
            <TextFieldControlled {...getProps()} value="mock value" />
        ).dive().instance();
        const {formState, name, value} = wrapperInstance.props;

        expect(formState.setFieldValue).toBeCalledWith(name, value);
    });
});