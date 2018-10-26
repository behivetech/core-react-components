import Form from "../Form";

describe('Form', () => {
    const getProps = (updateProps) => {
        return {
            className: 'mock-class',
            name: 'mockForm',
            ...updateProps,
        };
    };

    it('should render with the correct state and props', () => {
        const mockProps = {fieldValues: {mockField: 'mock value'}};
        const wrapper = mount(<Form {...getProps(mockProps)} />);
        const {context, fieldValues} = wrapper.state();

        expect(wrapper.debug()).toMatchSnapshot();
        expect(fieldValues).toEqual(mockProps.fieldValues);
        expect(context).toMatchSnapshot();
    });

    it('should set a field error', () => {
        const wrapper = mount(<Form {...getProps()} />);

        wrapper.state().context.setFieldValidators('mockField', ['required']);
        expect(wrapper.state().fieldErrors.mockField).toMatchSnapshot();
    });

    it('should call a validator function and set the first true error', () => {
        const wrapper = mount(<Form {...getProps()} />);
        const mockValidator = (error) => () => error;

        wrapper.state().context.setFieldValidators(
            'mockField',
            [mockValidator(), mockValidator('error 1'), mockValidator('error 2')]
        );

        expect(wrapper.state().fieldErrors.mockField).toEqual('error 1');
    });
});
