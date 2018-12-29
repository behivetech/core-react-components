import CheckboxControlled from '../CheckboxControlled';

jest.mock('../withFormControl');
jest.mock('../withSwitchControl');

describe('CheckboxControlled', () => {
    it('should render with the correct props', () => {
        const wrapper = shallow(<CheckboxControlled name="mockName" className="mock-class" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.dive()).toMatchSnapshot();
        expect(wrapper.dive().dive()).toMatchSnapshot();
    });
});