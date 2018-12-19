import TextField from '../TextField';

describe('TextField', () => {
    const event = {
        stopPropagation: jest.fn(),
        target: {
            value: 'mock event value',
        },
    };

    it('should render with the correct props', () => {
        const wrapper = shallow(<TextField name="mockName" label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<TextField name="mockName" disabled label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render as full width', () => {
        const wrapper = shallow(<TextField name="mockName" fullWidth label="mock label" />);

        expect(wrapper).toMatchSnapshot();
    });
});

