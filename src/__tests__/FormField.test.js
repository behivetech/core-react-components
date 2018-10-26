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
});

