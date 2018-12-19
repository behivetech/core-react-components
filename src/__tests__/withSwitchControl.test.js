import withSwitchControl from '../withSwitchControl';
jest.mock('../withFormControl');

describe('withSwitchControl', () => {
    const MockComponentWrapped = (props) => <div />;
    const MockComponentControlled = withSwitchControl(MockComponentWrapped);
    // eslint-disable-next-line
    const MockComponent = (props) => <MockComponentControlled {...props} />;
    const getEvent = (checked = false) => {
        return {
            target: {checked},
        };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a component and correct props are set', () => {
        const wrapper = mount(<MockComponent name="mockName" className="mock-class" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('MockComponentWrapped').props().checked).toBe(false);
        expect(wrapper.find('MockComponentWrapped').props().value).toBe(true);
    });

    it('should set a value if checked is true', () => {
        const wrapperInstance = shallow(
            <MockComponent name="mockName" className="mock-class" checked />
        ).dive().dive().instance();

        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', true);
    });

    it('should set states when checkbox is checked and onChange prop is called', () => {
        const mockOnChange = jest.fn();
        const mockEvent = getEvent(true);
        const wrapperInstance = shallow(
            <MockComponent name="mockName" className="mock-class" checked onChange={mockOnChange} />
        ).dive().dive().instance();

        wrapperInstance.handleChange(mockEvent);
        expect(wrapperInstance.state.checked).toBe(true);
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', true);
        expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    });

    it('should set states when checkbox is not checked checked', () => {
        const wrapperInstance = shallow(
            <MockComponent name="mockName" className="mock-class" checked />
        ).dive().dive().instance();

        wrapperInstance.handleChange(getEvent());
        expect(wrapperInstance.state.checked).toBe(false);
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', false);
    });

    it('should set states for arrays', () => {
        const wrapperInstance = shallow(
            <MockComponent name="mockName[]" className="mock-class" checked value="mock value" />
        ).dive().dive().instance();

        wrapperInstance.props.formState.getFieldValue.mockReturnValue(undefined);
        wrapperInstance.handleChange(getEvent(true));
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', ['mock value']);
        wrapperInstance.props.formState.getFieldValue.mockReturnValue(['mock1 value']);
        wrapperInstance.handleChange(getEvent(true));
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', ['mock1 value',  'mock value']);
    });

    it('should unset states for arrays', () => {
        const wrapperInstance = shallow(
            <MockComponent name="mockName[]" className="mock-class" checked value="mock value" />
        ).dive().dive().instance();

        wrapperInstance.props.formState.getFieldValue.mockReturnValue(['mock value']);
        wrapperInstance.handleChange(getEvent(false));
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', []);
        wrapperInstance.props.formState.getFieldValue.mockReturnValue(['mock1 value', 'mock value']);
        wrapperInstance.handleChange(getEvent(false));
        expect(wrapperInstance.props.formState.setFieldValue).toHaveBeenCalledWith('mockName', ['mock1 value']);
    });
});