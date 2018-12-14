import {
    decimal,
    email,
    positiveNumber,
    price,
    numeric,
    required,
    url,
} from "../validators";

describe('validators', () => {
    it('should validate it is required', () => {
        const error = 'This field cannot be empty';

        expect(required('a')).toBe(undefined);
        expect(required('-a')).toBe(undefined);
        expect(required(-1.111)).toBe(undefined);
        expect(required(1234)).toBe(undefined);
        expect(required(0)).toBe(undefined);
        expect(required([0])).toBe(undefined);
        expect(required([])).toBe(error);
        expect(required()).toBe(error);
        expect(required(undefined)).toBe(error);
    });

    it('should validate it is numeric', () => {
        const error = 'This is not a valid number';

        expect(numeric('a')).toBe(error);
        expect(numeric('-a')).toBe(error);
        expect(numeric(-1.111)).toBe(undefined);
        expect(numeric(1234)).toBe(undefined);
        expect(numeric(0)).toBe(undefined);
    });

    it('should validate it is a properly formed decimal', () => {
        const error = 'This is not a valid decimal number';

        expect(decimal('a')).toBe(error);
        expect(decimal(0)).toBe(undefined);
        expect(decimal(0.1)).toBe(undefined);
        expect(decimal(.1)).toBe(undefined);
    });

    it('should validate it is a positiveNumber', () => {
        const error = 'Positive number required';

        expect(positiveNumber('a')).toBe(error);
        expect(positiveNumber('-a')).toBe(error);
        expect(positiveNumber(-1)).toBe(error);
        expect(positiveNumber(1234)).toBe(undefined);
        expect(positiveNumber(0)).toBe(undefined);
    });

    it('should validate it is a properly formed email', () => {
        const error = 'This email address is invalid';

        expect(email('abc.com')).toBe(error);
        expect(email('abc@com')).toBe(error);
        expect(email(1234)).toBe(error);
        expect(email('a@abc.com')).toBe(undefined);
    });
});