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

    it('should render correctly with default props', () => {
        const wrapper = mount(<Form {...getProps()} />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().props.onSubmit()).toBe(null);
    });

    it('should handle a submit', () => {
        const mockOnSubmit = jest.fn();
        const mockEvent = {preventDefault: jest.fn()};
        const wrapperInstance = mount(<Form {...getProps()} onSubmit={mockOnSubmit} />).instance();

        wrapperInstance.handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toBeCalled();
        expect(mockOnSubmit).toBeCalledWith(mockEvent);
    });

});
