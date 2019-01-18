import TextFieldValidated from '../TextFieldValidated';

jest.mock('../withValidation');

describe('TextFieldValidated', () => {
    const mockComponent = (props) => <div />;
    const getProps = () => {
        return {
            className: 'mock-class',
            label: 'mock-label',
            name: 'mockName',
            validate: [jest.fn()],
            component: mockComponent,
        };
    };
    
    it('should render with the correct props', () => {
        const wrapper = shallow(<TextFieldValidated {...getProps()} />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.dive()).toMatchSnapshot();
    });
});