export default (WrappedComponent) => function FormFieldControlled(props) { 
    const formState = {
        formDisabled: false,
        initialSubmit: false,
        getFieldError: jest.fn(),
        getFieldValue: jest.fn(),
        setFieldValidators: jest.fn(),
        setFieldValue: jest.fn(),
        setFieldValueDebounced: jest.fn(),
        shouldDisable: jest.fn(),
    };

    return <WrappedComponent {...props} formState={formState} />; 
};
