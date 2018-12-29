import Form from '../Form';

describe('Form', () => {
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
        const wrapper = mount(<Form {...getProps(mockProps)} />);
        const {context, fieldValues} = wrapper.state();

        expect(wrapper).toMatchSnapshot();
        expect(fieldValues).toEqual(mockProps.fieldValues);
        expect(context).toMatchSnapshot();
    });

    it('should set and unset a field error', () => {
        const wrapper = shallow(<Form {...getProps()} />);
        const wrapperStateContext = wrapper.state().context;

        wrapperStateContext.setFieldError('mockField1');
        expect(wrapper.state().fieldErrors[0]).toBe('mockField1');
        wrapperStateContext.unsetFieldError('mockField1');
        expect(wrapper.state().fieldErrors.length).toBe(0);
    });

    it('should show if there are errors or not', () => {
        const wrapper = shallow(<Form {...getProps()} />);
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
        const wrapper = shallow(<Form {...mockProps} />);
        const wrapperStateContext = wrapper.state().context;
        const mockSetState = jest.fn();

        wrapper.instance().setState = mockSetState;
        wrapperStateContext.setFieldValue('mockField', 'mock value');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperStateContext.setFieldValue('mockField', 'mock value 1');
        expect(mockSetState).toHaveBeenCalledWith(
            {fieldValues: {mockField: 'mock value 1'}}
        );
    });

    it('should handle a submit correctly', () => {
        const mockEvent = {preventDefault: jest.fn()};
        const props = getProps({onSubmit: jest.fn()});
        const wrapper = shallow(<Form {...props} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(wrapper.state().initialSubmit).toBe(true);
        expect(props.onSubmit).toHaveBeenCalled();
        wrapperInstance.forceUpdate();
        expect(wrapper.state().initialSubmit).toBe(false);
        
        jest.clearAllMocks();
        wrapperInstance.setFieldError('mockField');
        wrapperInstance.handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(wrapper.state().initialSubmit).toBe(true);
        expect(props.onSubmit).not.toHaveBeenCalled();
        wrapperInstance.forceUpdate();
        expect(wrapper.state().initialSubmit).toBe(true);

        jest.clearAllMocks();
        wrapperInstance.setFieldError('mockField');
        wrapper.setProps({formError: 'mock form error'});
        wrapperInstance.handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(wrapper.state().initialSubmit).toBe(true);
        expect(props.onSubmit).not.toHaveBeenCalled();
        wrapperInstance.forceUpdate();
        expect(wrapper.state().initialSubmit).toBe(true);
    });

    it('should return disable when submitting', () => {
        const wrapper = shallow(<Form {...getProps()} />);

        expect(wrapper.instance().shouldDisable()).toBe(false);
        wrapper.setState({submitting: true});
        expect(wrapper.instance().shouldDisable()).toBe(true);
    });

    it('should set submitting to false if submitted is true', () => {
        const mockSetState = jest.fn();
        const wrapper = shallow(<Form {...getProps()} />);

        wrapper.instance().setState = mockSetState;
        wrapper.setProps({submitted: true});
        expect(mockSetState).toHaveBeenCalledWith({submitting: false});
        wrapper.setProps({submitted: true});
        expect(mockSetState.mock.calls.length).toBe(1);
    });

    it('should return the right values from the context state', () => {
        const mockStateValues = {
            fieldValues: {mockField: 'mock value'},
        };
        const wrapper = shallow(<Form {...getProps()} />);
        const wrapperInstance = wrapper.instance();

        wrapper.setState(mockStateValues);
        expect(wrapperInstance.getFieldValue('mockField')).toBe('mock value');
        expect(wrapperInstance.getFieldValues()).toBe(mockStateValues.fieldValues);
        expect(wrapperInstance.getInitialSubmit()).toBe(false);
    });
});
