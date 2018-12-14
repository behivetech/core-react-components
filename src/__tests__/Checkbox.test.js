import Checkbox from "../Checkbox";

// TODO: need to figure out how to test MDCSwitch and MDCFormField
describe('Checkbox', () => {
    const getEvent = (checked = false) => { 
        return {
            stopPropagation: jest.fn(),
            target: {
                checked,
                value: 'mock event value',
            },
        };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = shallow(<Checkbox name="mockName" className="mock-class" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render correctly with the prop checked', () => {
        const wrapper = shallow(<Checkbox name="mockName" checked />);

        expect(wrapper.debug()).toMatchSnapshot();
        expect(wrapper.state().checked).toBe(true);
        wrapper.setProps({checked: false});
        expect(wrapper.state().checked).toBe(false);
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<Checkbox disabled name="mockName" checked />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should handle clicks correctly', () => {
        const wrapper = shallow(
            <Checkbox name="mockName" checked onChange={undefined} />
        );
        const wrapperInstance = wrapper.instance();
        const mockEvent = getEvent(true);
        const mockOnChange = jest.fn();

        expect(wrapperInstance.state.checked).toBe(true);
        wrapperInstance.handleChange(getEvent());
        expect(wrapper.state().checked).toBe(false);
        wrapper.setProps({onChange: mockOnChange});
        wrapperInstance.handleChange(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
        expect(wrapperInstance.state.checked).toBe(true);
    });

    it('should handle changes correctly', () => {
        const mockOnChange = jest.fn();
        const mockEvent = getEvent();
        const wrapperInstance = shallow(
            <Checkbox name="mockName" checked onChange={mockOnChange} />
        ).instance();

        wrapperInstance.handleChange(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    });
});