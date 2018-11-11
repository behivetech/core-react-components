import Switch from "../Switch";
// import {MDCSwitch} from '@material/switch';
// import {MDCFormField} from '@material/form-field';

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
        const wrapper = shallow(<Switch name="mockName" className="mock-class" defaultValue="mock value" />);

        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should render as checked', () => {
        const wrapper = shallow(<Switch name="mockName" checked defaultValue="mock value" />)
            .instance().renderComponent(() => null, {});

        expect(wrapper).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        const wrapper = shallow(<Switch name="mockName" checked defaultValue="mock value" />)
            .instance().renderComponent(() => null, {});

        expect(wrapper).toMatchSnapshot();
    });

    it('should set refs for the component', () => {
        const wrapper = mount(<Switch name="mockName" defaultValue="mock value" />);
        const wrapperInstance = wrapper.instance();

        expect(wrapperInstance.switchRef).toMatchSnapshot();
        expect(wrapperInstance.formFieldRef).toMatchSnapshot();
    });
});