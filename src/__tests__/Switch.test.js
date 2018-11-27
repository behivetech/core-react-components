import Switch from "../Switch";

describe('Switch', () => {
    const event = {
        stopPropagation: jest.fn(),
        target: {
            value: 'mock event value',
        },
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = shallow(<Switch name="mockName" className="mock-class" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render as checked', () => {
        const wrapper = shallow(<Switch name="mockName" checked />)

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<Switch disabled name="mockName" checked />)

        expect(wrapper.debug()).toMatchSnapshot();
    });
});