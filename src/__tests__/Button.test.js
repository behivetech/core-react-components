import Button from '../Button';

describe('Button', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = shallow(<Button />);
        const wrapperInstance = wrapper.instance();

        expect(wrapper).toMatchSnapshot();
        expect(wrapperInstance.props.onClick()).toBe(null);
        wrapper.setProps({className: 'mockClass', children: 'mock child'});
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({type: 'submit', children: undefined});
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle clicks correctly', () => {
        const mockEvent = {
            preventDefault: jest.fn(),
        };
        const mockOnClick = jest.fn();
        const wrapperInstance = shallow(<Button onClick={mockOnClick} />).instance();

        wrapperInstance.handleClick(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockOnClick).toHaveBeenCalledWith(mockEvent);
    });
});