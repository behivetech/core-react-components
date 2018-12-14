import FormField from "../FormField";

describe('FormField', () => {
    const getEvent = (target = {}) => {
        return {
            stopPropagation: jest.fn(),
            target: {
                checked: target.checked,
                value: target.value || 'mock event value',
            },
        };
    };
    const mockSetFieldValue = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = mount(<FormField name="mockName" componentName="TextField" />);

        expect(wrapper.debug()).toMatchSnapshot();
        expect(wrapper.state().componentName).toBe(undefined);
    });


    it('should render a child', async () => {
        const mockSetState = jest.fn();
        const wrapperProps = {
            name: 'mockName',
            componentName: 'TextField',
            validate: [() => null]
        };
        const wrapper = await mount(<FormField {...wrapperProps} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.setState = mockSetState;
        await wrapperInstance.componentWillMount();
        expect(mockSetState).toHaveBeenCalledWith({componentImport: expect.any(Function)});
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should set the right value when componentName is Checkbox', () => {
         const wrapperProps = {
            name: 'mockName',
            componentName: 'Checkbox',
            defaultValue: 'mock default value',
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();
        const mockEvent = getEvent({checked: true});

        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetFieldValue).toBeCalledWith('mockName', wrapperProps.defaultValue);
    });

    it('should unset the right values when componentName is Checkbox', () => {
        const wrapperProps = {
            name: 'mockName',
            componentName: 'Checkbox',
            defaultValue: 'mock default value',
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();
        const mockEvent = getEvent({checked: false});

        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetFieldValue).toBeCalledWith('mockName', "");
    });

    it('should set the right values when componentName is Checkbox and value is array', () => {
        const wrapperProps = {
            name: 'mockName[]',
            componentName: 'Checkbox',
            defaultValue: 'mock default value',
            value: ['mock value 1'],
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();
        const mockEvent = getEvent({checked: true});

        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.getFieldValue = () => wrapperProps.value;
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetFieldValue).toBeCalledWith(
            'mockName',
            [...wrapperProps.value, ...[wrapperProps.defaultValue]]
        );
    });

    it('should unset the right values when componentName is Checkbox and value is array', () => {
        const wrapperProps = {
            name: 'mockName[]',
            componentName: 'Checkbox',
            defaultValue: 'mock default value',
            value: ['mock value 1'],
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();
        const mockEvent = getEvent({checked: false});

        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.getFieldValue = () => [...wrapperProps.value, ...[wrapperProps.defaultValue]];
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetFieldValue).toBeCalledWith('mockName', wrapperProps.value);
    });

    it('should set the value to false when componentName is Checkbox and defaultValue is true', () => {
        const wrapperProps = {
            name: 'mockName',
            componentName: 'Checkbox',
            defaultValue: true,
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();
        const mockEvent = getEvent({checked: false});

        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.formStateValue = true;
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetFieldValue).toBeCalledWith('mockName', false);
    });

    it('should not run onClick functions if the component is not a Checkbox or Switch', () => {
        const mockSetState = jest.fn();
        const mockSetFieldValue = jest.fn();
        const mockEvent = getEvent({value: 'mock value'});
        const wrapperProps = {
            name: 'mockName',
            componentName: 'TextField',
            onClick: jest.fn(),
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldValue = mockSetFieldValue;
        wrapperInstance.handleClick(mockEvent);
        expect(mockSetState).not.toHaveBeenCalled();
        expect(mockSetFieldValue).not.toHaveBeenCalled();
        expect(wrapperProps.onClick).toHaveBeenCalledWith(mockEvent);
    });

    it('should not run onChange functions if the componnent is a Checkbox or Switch', () => {
        const mockSetState = jest.fn();
        const mockSetFieldValueDebounced = jest.fn();
        const mockEvent = getEvent();
        const wrapperProps = {
            name: 'mockName',
            componentName: 'Checkbox',
            defaultValue: true,
            onChange: jest.fn(),
        };
        const wrapper = mount(<FormField {...wrapperProps} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldValueDebounced = mockSetFieldValueDebounced;
        wrapperInstance.handleChange(mockEvent);
        expect(mockSetState).not.toHaveBeenCalled();
        expect(mockSetFieldValueDebounced).not.toHaveBeenCalled();
        expect(wrapperProps.onChange).toHaveBeenCalledWith(mockEvent);

        wrapper.setProps({componentName: 'Switch'});
        wrapperInstance.handleChange(mockEvent);
        expect(mockSetState).not.toHaveBeenCalled();
        expect(mockSetFieldValueDebounced).not.toHaveBeenCalled();
        expect(wrapperProps.onChange).toHaveBeenCalledWith(mockEvent);
    });

    it('should run onChange functions if the componnent is not a Checkbox or Switch', () => {
        const mockSetState = jest.fn();
        const mockSetFieldValueDebounced = jest.fn();
        const mockEvent = getEvent({value: 'mock value'});
        const wrapperProps = {
            name: 'mockName',
            componentName: 'TextField',
            onChange: jest.fn(),
        };
        const wrapperInstance = mount(<FormField {...wrapperProps} />).instance();

        wrapperInstance.setState = mockSetState;
        wrapperInstance.setFieldValueDebounced = mockSetFieldValueDebounced;
        wrapperInstance.handleChange(mockEvent);
        expect(mockSetState).toHaveBeenCalledWith({value: 'mock value'});
        expect(mockSetFieldValueDebounced).toHaveBeenCalledWith(wrapperInstance.stateName, 'mock value');
        expect(wrapperProps.onChange).toHaveBeenCalledWith(mockEvent);
    });

    it('should run the validate functions when props are set', async () => {
        const mockSetFieldValidators = jest.fn();
        const wrapperProps = {
            name: 'mockName',
            componentName: 'TextField',
            validate: [() => null],
        };
        const wrapper = mount(<FormField {...wrapperProps} />);
        const wrapperInstance = wrapper.instance();

        wrapperInstance.setFieldValidators = mockSetFieldValidators;
        wrapperInstance.componentDidMount();
        expect(mockSetFieldValidators).toHaveBeenCalledWith(wrapperInstance.stateName, wrapperProps.validate);
        wrapper.setProps({validate: undefined});
        expect(mockSetFieldValidators).toHaveBeenCalledWith(wrapperInstance.stateName, undefined);
    });
});

