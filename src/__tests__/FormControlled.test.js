import FormControlled from '../FormControlled';

describe('FormControlled', () => {
    const getProps = (updateProps) => {
        return {
            className: 'mock-class',
            name: 'mockForm',
            ...updateProps,
        };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct state and props', () => {
        const mockProps = {fieldValues: {mockField: 'mock value'}};
        const wrapper = mount(<FormControlled {...getProps(mockProps)} />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state()).toMatchSnapshot();
    });

    it('should set and unset a field error', () => {
        const wrapper = shallow(<FormControlled {...getProps()} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.setFieldError('mockField1');
        expect(wrapperInstance.state.fieldErrors[0]).toBe('mockField1');
        wrapperInstance.unsetFieldError('mockField1');
        expect(wrapperInstance.state.fieldErrors.length).toBe(0);
    });

    it('should show if there are errors or not', () => {
        const wrapper = shallow(<FormControlled {...getProps()} />);
        const wrapperInstance = wrapper.instance();

        expect(wrapperInstance.hasErrors()).toBe(false);
        wrapperInstance.setFieldError('mockField1');
        expect(wrapperInstance.hasErrors()).toBe(true);
        wrapperInstance.setFieldError('mockField2');
        expect(wrapperInstance.hasErrors()).toBe(true);
        wrapperInstance.unsetFieldError('mockField1');
        expect(wrapperInstance.hasErrors()).toBe(true);
        wrapperInstance.unsetFieldError('mockField2');
        expect(wrapperInstance.hasErrors()).toBe(false);
        wrapper.setProps({formError: 'mock error'});
        expect(wrapperInstance.hasErrors()).toBe(true);
    });

    it('should or should not set a field value when conditions are met', () => {
        const mockProps = getProps({fieldValues: {mockField: 'mock value'}});
        const wrapper = shallow(<FormControlled {...mockProps} />);
        const wrapperInstance = wrapper.instance();
        const mockSetState = jest.fn();

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldValue('mockField', 'mock value');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperInstance.setFieldValue('mockField', 'mock value 1');
        expect(mockSetState).toHaveBeenCalledWith(
            {fieldValues: {mockField: 'mock value 1'}}
        );
    });

    it('should handle a submit correctly', () => {
        const mockEvent = {preventDefault: jest.fn()};
        const mockProps = getProps({onSubmit: jest.fn()});
        const wrapper = shallow(<FormControlled {...mockProps} />);
        const wrapperInstance = wrapper.instance();
        const initialState = wrapperInstance.state;

        wrapperInstance.handleSubmit(mockEvent);
        expect(wrapperInstance.state.formDisabled).toBe(true);
        expect(wrapperInstance.state.initialSubmit).toBe(true);
        expect(wrapperInstance.state.submitting).toBe(true);
        expect(mockProps.onSubmit).toBeCalled();

        wrapper.setState(initialState);
        jest.clearAllMocks();
        wrapperInstance.setFieldError('mockField');
        wrapperInstance.handleSubmit(mockEvent);
        expect(wrapperInstance.state.formDisabled).toBe(false);
        expect(wrapperInstance.state.initialSubmit).toBe(true);
        expect(wrapperInstance.state.submitting).toBe(false);
        expect(mockProps.onSubmit).not.toHaveBeenCalled();

        wrapper.setState(initialState);
        jest.clearAllMocks();
        wrapper.setProps({formError: 'mock form error'});
        wrapperInstance.handleSubmit(mockEvent);
        expect(wrapperInstance.state.formDisabled).toBe(false);
        expect(wrapperInstance.state.initialSubmit).toBe(true);
        expect(wrapperInstance.state.submitting).toBe(false);
        expect(mockProps.onSubmit).not.toHaveBeenCalled();
    });

    it('should return the right values from the context state', () => {
        const mockStateValues = {
            fieldValues: {mockField: 'mock value'},
        };
        const wrapper = shallow(<FormControlled {...getProps()} />);
        const wrapperInstance = wrapper.instance();

        wrapper.setState(mockStateValues);
        expect(wrapperInstance.getFieldValue('mockField')).toBe('mock value');
        expect(wrapperInstance.getFieldValues()).toBe(mockStateValues.fieldValues);
        expect(wrapperInstance.state.initialSubmit).toBe(false);
    });
});
