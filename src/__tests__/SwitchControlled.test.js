import SwitchControlled from '../SwitchControlled';

jest.mock('../withFormControl');
jest.mock('../withSwitchControl');

describe('SwitchControlled', () => {
    it('should render with the correct props', () => {
        const wrapper = shallow(<SwitchControlled name="mockName" className="mock-class" />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.dive()).toMatchSnapshot();
        expect(wrapper.dive().dive()).toMatchSnapshot();
    });
});