import FormFieldHelperText from '../FormFieldHelperText';

describe('FormFieldHelperText', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FormFieldHelperText helperText="mock help" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with an error set', () => {
        const wrapper = shallow(<FormFieldHelperText error="mock error" />);

        expect(wrapper).toMatchSnapshot();
    });
});
