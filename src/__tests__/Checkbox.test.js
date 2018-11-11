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
        }
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = shallow(<Checkbox name="mockName" className="mock-class" defaultValue="mock value" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render correctly with the prop checked', () => {
        const wrapper = shallow(<Checkbox name="mockName" checked defaultValue="mock value" />);

        expect(wrapper.debug()).toMatchSnapshot();
        expect(wrapper.state().checked).toBe(true);
        wrapper.setProps({checked: false});
        expect(wrapper.state().checked).toBe(false);
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<Checkbox name="mockName" checked defaultValue="mock value" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should handle clicks correctly', () => {
        const wrapper = shallow(
            <Checkbox name="mockName" checked defaultValue="mock value" onClick={undefined} />
        );
        const wrapperInstance = wrapper.instance();
        const mockEvent = getEvent(true);
        const mockOnClick = jest.fn();

        expect(wrapperInstance.state.checked).toBe(true);
        wrapperInstance.handleClick(getEvent());
        expect(wrapper.state().checked).toBe(false);
        wrapper.setProps({onClick: mockOnClick})
        wrapperInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockOnClick).toHaveBeenCalledWith(mockEvent);
        expect(wrapperInstance.state.checked).toBe(true);
    });

    it('should handle changes correctly', () => {
        const mockOnChange = jest.fn();
        const mockEvent = getEvent();
        const wrapperInstance = shallow(
            <Checkbox name="mockName" checked defaultValue="mock value" onChange={mockOnChange} />
        ).instance();

        wrapperInstance.handleChange(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    });

    it('should not set refs for the component', () => {
        const wrapper = mount(
            <Checkbox name="mockName" defaultValue="mock value" renderComponent={() => null} />
        );
        const wrapperInstance = wrapper.instance();

        expect(wrapperInstance.checkboxRef).toBe(undefined)
        expect(wrapperInstance.formFieldRef).toBe(undefined)
    });

    it('should set refs for the component', () => {
        const wrapper = mount(<Checkbox name="mockName" defaultValue="mock value" />);
        const wrapperInstance = wrapper.instance();

        expect(wrapperInstance.checkboxRef).toMatchSnapshot();
        expect(wrapperInstance.formFieldRef).toMatchSnapshot();
    });
});