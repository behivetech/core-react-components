import TextField from "../TextField";

describe('TextField', () => {
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
        const wrapper = shallow(<TextField name="mockName" componentName="TextField" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });
});

