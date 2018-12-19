import withFormControl from '../withFormControl';
jest.mock('../Form');

describe('withFormControl', () => {
    const MockComponentWrapped = (props) => <div />;
    const MockComponentControlled = withFormControl(MockComponentWrapped);
    // eslint-disable-next-line
    const MockComponent = (props) => <MockComponentControlled {...props} />;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass fromState to the warapped component', () => {
        const wrapper = mount(<MockComponent name="mockName" className="mock-class" />);

        expect(wrapper).toMatchSnapshot();
    });
});