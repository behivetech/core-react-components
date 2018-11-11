import TextField from "../TextField";

describe('TextField', () => {
    const event = {
        stopPropagation: jest.fn(),
        target: {
            value: 'mock event value',
        },
    };

    it('should render with the correct props', () => {
        const wrapper = shallow(<TextField name="mockName" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<TextField name="mockName" disabled />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render as full width', () => {
        const wrapper = shallow(<TextField name="mockName" fullWidth />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should handle a keydown event', () => {
        const mockProps = {
            name: 'mockName',
            onKeyDown: jest.fn(),
        }
        const mockEvent = {
            stopPropagation: jest.fn(),
            target: {},
        }
        const wrapper = shallow(
            <TextField {...mockProps} />
        );
        const wrapperInstance = wrapper.instance();

        wrapperInstance.handleKeyDown(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockProps.onKeyDown).toHaveBeenCalledWith(mockEvent);
        jest.clearAllMocks();
        wrapper.setProps({onKeyDown: undefined});
        wrapperInstance.handleKeyDown(mockEvent);
        expect(mockProps.onKeyDown).not.toHaveBeenCalled();
    })
});

