import withValidation from '../withValidation';
// Needed for validateFieldDebounced
jest.useFakeTimers();

describe('withValidation', () => {
    const MockComponentWrapped = (props) => <div />;
    const MockComponentControlled = withValidation(MockComponentWrapped);
    // eslint-disable-next-line
    const MockComponent = (props) => <MockComponentControlled {...props} />;
    const getProps = (additionalProps = {}, initialSubmit = false) => {
        return {
            className: 'mock-class',
            formState: {
                getFieldValues: jest.fn(() => {
                    return {mockField: 'mock value'};
                }),
                getInitialSubmit: jest.fn(() => initialSubmit),
                setFieldError: jest.fn(),
                unsetFieldError: jest.fn(),
            },
            name: 'mockName',
            onChange: jest.fn(),
            validate: [jest.fn(() => 'mock error')],
            ...additionalProps,
        };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component and run validations on mount', () => {
        const mockProps = getProps();
        const wrapper = mount(<MockComponent {...mockProps} value="mock value" />);

        expect(wrapper).toMatchSnapshot();
        expect(mockProps.validate[0]).toBeCalledWith('mock value', {mockField: 'mock value'})
    });

    it('should validate with an imported validation function and error should be null', () => {
        const mockProps = getProps({validate: ['required']});
        const wrapper = shallow(<MockComponent {...mockProps} />).dive();

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state().fieldError).toBe('This field cannot be empty');
        expect(wrapper.props().error).toBe(null);
        expect(mockProps.formState.setFieldError).toBeCalledWith(mockProps.name);
    });

    it('should return an error if the imported validation function does not exist', () => {
        const mockProps = getProps({validate: ['mockValidation']});
        const wrapper = shallow(<MockComponent {...mockProps} />).dive();

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state().fieldError).toBe('mockValidation is not a valid validator.');
    });

    it('should pass an error prop to the component when initialSubmit is true', () => {
        const mockProps = getProps({}, true);
        const wrapper = shallow(<MockComponent {...mockProps} />).dive();

        expect(wrapper.props().error).toBe('mock error');
    });

    it('should handle a change correctly and unset a field error', () => {
        const mockProps = getProps({validate: ['required']});
        const mockEvent = {target: {value: 'mock value 2'}};
        const wrapper = shallow(<MockComponent {...mockProps} />).dive();
        const wrapperInstance = wrapper.instance();

        wrapperInstance.handleChange(mockEvent);
        // Waiting for validateFieldDebounced to run
        jest.runAllTimers();
        expect(wrapperInstance.props.onChange).toBeCalledWith(mockEvent);
        expect(wrapperInstance.props.formState.unsetFieldError).toBeCalledWith(mockProps.name);
    });
});