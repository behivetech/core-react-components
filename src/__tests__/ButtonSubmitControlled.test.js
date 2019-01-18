import ButtonSubmitControlled from '../ButtonSubmitControlled';

jest.mock('../withFormControl');

describe('ButtonSubmitControlled', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with the correct props', () => {
        const wrapper = shallow(<ButtonSubmitControlled className="mock-class" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.dive()).toMatchSnapshot();
        wrapper.setProps({type: 'submit', children: undefined});
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('should disable properly', () => {
        const wrapper = shallow(<ButtonSubmitControlled className="mock-class" />).dive();

        wrapper.setProps({diabled: true});
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({diabled: false, formstate: {formDisabled: true}});
        expect(wrapper).toMatchSnapshot();
    });
});