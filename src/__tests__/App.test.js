import App from "../App";

// TODO: need to figure out how to test MDCSwitch and MDCFormField
describe('App', () => {
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
        const wrapper = shallow(<App name="mockName" className="mock-class" defaultValue="mock value" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });
});