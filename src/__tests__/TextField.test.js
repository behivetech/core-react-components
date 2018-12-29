import TextField from '../TextField';

describe('TextField', () => {
    it('should render with the correct props', () => {
        const wrapper = shallow(<TextField className="mock-class" name="mockName" label="mock label" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().props.onChange()).toBe(null);
        expect(wrapper.instance().state.value).toBe('');
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<TextField name="mockName" disabled label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render as full width', () => {
        const wrapper = shallow(<TextField name="mockName" fullWidth label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should handle a change event', () => {
        const mockEvent = {
            stopPropagation: jest.fn(),
            target: {
                value: 'mock event value',
            },
        };
        const wrapperInstance = shallow(
            <TextField name="mockName" fullWidth label="mock label" onChange={jest.fn()} />
        ).instance();

        wrapperInstance.handleOnChange(mockEvent);
        expect(mockEvent.stopPropagation).toBeCalled();
        expect(wrapperInstance.state.value).toBe(mockEvent.target.value);
        expect(wrapperInstance.props.onChange).toBeCalledWith(mockEvent);
    });
});

