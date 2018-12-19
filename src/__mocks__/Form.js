const context = {
    getFieldError: jest.fn(),
    getFieldValue: jest.fn(),
    setFieldValidators: jest.fn(),
    setFieldValue: jest.fn(),
    setFieldValueDebounced: jest.fn(),
    shouldDisable: jest.fn(),
};

export const FormContext = ({
    Consumer(props) {
        return props.children(context);
    },
});