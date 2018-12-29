import Checkbox from '../Checkbox';

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
        const wrapperInstance = wrapper.instance();

        expect(wrapper).toMatchSnapshot();
        expect(wrapperInstance.props.onChange()).toBe(null);
    });

    it('should set the name and id props correctly', () => {
        const wrapper = shallow(<Checkbox name="mockName" id="mockId" />);
        const wrapperInstance = wrapper.instance();

        expect(wrapper).toMatchSnapshot()
        wrapper.setProps({name: undefined});
        expect(wrapper).toMatchSnapshot();
    });

    it('should render as checked', () => {
        const wrapper = shallow(<Checkbox name="mockName" checked />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<Checkbox disabled name="mockName" checked />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with a label', () => {
        const wrapper = shallow(<Checkbox disabled name="mockName" label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should set state and call the onChange prop', () => {
        const mockProps = {
            name: 'mockName',
            onChange: jest.fn(),
        };
        const mockEvent = getEvent();
        const wrapperInstance = shallow(<Checkbox {...mockProps} />).instance();

        wrapperInstance.handleChange(mockEvent);
        expect(wrapperInstance.state.checked).toBe(false);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockProps.onChange).toHaveBeenCalledWith(mockEvent);
    });

    it('should update state when props change', () => {
        const wrapper = shallow(<Checkbox name="mockName" checked />);
        const wrapperInstance = wrapper.instance();
        const mockSetState = jest.fn();

        expect(wrapperInstance.state.checked).toBe(true);
        wrapper.setProps({checked: false});
        expect(wrapperInstance.state.checked).toBe(false);
        wrapperInstance.setState = mockSetState;
        wrapper.setProps({checked: false});
        expect(mockSetState).not.toHaveBeenCalled();
    });
});