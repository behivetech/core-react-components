import Form from "../Form";

describe('Form', () => {
    const getProps = (updateProps) => {
        return {
            className: 'mock-class',
            name: 'mockForm',
            ...updateProps,
        };
    };

    it('should render with the correct state and props', () => {
        const mockProps = {fieldValues: {mockField: 'mock value'}};
        const wrapper = mount(<Form {...getProps(mockProps)} />);
        const {context, fieldValues} = wrapper.state();

        expect(wrapper.debug()).toMatchSnapshot();
        expect(fieldValues).toEqual(mockProps.fieldValues);
        expect(context).toMatchSnapshot();
    });

    it('should set and unset a field error', () => {
        const wrapper = shallow(<Form {...getProps()} />);
        const wrapperStateContext = wrapper.state().context;

        wrapperStateContext.setFieldValidators('mockField1', ['required']);
        expect(wrapper.state().fieldErrors.mockField1).toBe('This field cannot be empty');
        wrapperStateContext.setFieldValue('mockField1', 'mock value');
        expect(wrapper.state().fieldErrors.mockField1).toBe(undefined);
    });

    it('should call a validator function and set the first true error', () => {
        const wrapper = shallow(<Form {...getProps()} />);
        const mockValidator = (error) => () => error;

        wrapper.state().context.setFieldValidators(
            'mockField',
            [mockValidator(), mockValidator('error 1'), mockValidator('error 2')]
        );

        expect(wrapper.state().fieldErrors.mockField).toEqual('error 1');
    });

    it('should set an error message when the type of validator does not match', () => {
        const wrapper = shallow(<Form {...getProps()} />);

        wrapper.state().context.setFieldValidators(
            'mockField',
            ['badMockValidator']
        );
        expect(wrapper.state().fieldErrors.mockField).toEqual('badMockValidator is not a valid validator.');
    });

    it('should not set a field validator unless all arguments are correct', () => {
        const mockSetState = jest.fn();
        const wrapper = shallow(<Form {...getProps()} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldValidators(null, 'mockValidator');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperInstance.setFieldValidators('mockField');
        expect(mockSetState).not.toHaveBeenCalled();

    });

    it('should set a field error only when arguments pass conditions', () => {
        const mockSetState = jest.fn();
        const wrapper = shallow(<Form {...getProps()} />);
        const wrapperInstance = wrapper.instance();
        const wrapperSetState = wrapperInstance.setState;

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldError(null, 'mock error');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperInstance.setFieldError('mockField');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperInstance.setState = wrapperSetState;
        wrapper.setState({fieldErrors: {mockField: 'mock error'}});
        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldError('mockField', 'mock error');
        expect(mockSetState).not.toHaveBeenCalled();
        wrapperInstance.setFieldError('mockField', 'mock error 1');
        expect(wrapperInstance.setState).toHaveBeenCalledWith({
            fieldErrors: {
                mockField: 'mock error 1',
            }},
        );
    });

    it('should only get a field error if the form has been initially submitted', () => {
        const wrapper = shallow(<Form {...getProps()} />);
        const mockValidator = (error) => () => error;
        const wrapperState = wrapper.state();

        wrapperState.context.setFieldValidators(
            'mockField',
            [mockValidator('error 1')]
        );
        expect(wrapperState.context.getFieldError('mockField')).toBe(undefined);
        wrapper.setState({initialSubmit: true});
        expect(wrapperState.context.getFieldError('mockField')).toBe('error 1');
    });

    it('should show if there are errors or not', () => {
        const wrapper = shallow(<Form {...getProps()} />);

        expect(wrapper.instance().hasErrors()).toBe(false);
        wrapper.setState({fieldErrors: {mockField: 'mock error'}});
        expect(wrapper.instance().hasErrors()).toBe(true);
        wrapper.setState({fieldErrors: {}});
        expect(wrapper.instance().hasErrors()).toBe(false);
        wrapper.setProps({formError: 'mock error'});
        expect(wrapper.instance().hasErrors()).toBe(true);
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
            {fieldValues: {mockField: 'mock value 1'}},
            expect.any(Function)
        );
    });

    it('should handle a submit correctly', () => {
        const mockEvent = {preventDefault: jest.fn()};
        const props = getProps({onSubmit: jest.fn()})
        const wrapper = shallow(<Form {...props} />);

        wrapper.instance().handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(wrapper.state().initialSubmit).toBe(true);
        expect(props.onSubmit).toHaveBeenCalled();
        wrapper.instance().forceUpdate()
        expect(wrapper.state().initialSubmit).toBe(false);
    });

    it('should return disable when submitting', () => {
        const wrapper = shallow(<Form {...getProps()} />);

        expect(wrapper.instance().shouldDisable()).toBe(false);
        wrapper.setState({submitting: true})
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
});