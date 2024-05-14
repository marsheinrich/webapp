import { EzFloat } from '../../../ezlibrary/helpers/EzFloat.js';

describe('EzFloat', () => {
    test('should convert valid string to float', () => {
        expect(EzFloat.toFloat('3.14')).toBe(3.14);
    });

    test('should return 0.00 for empty string', () => {
        expect(EzFloat.toFloat('')).toBe(0.0);
    });

    test('should return 0.00 for undefined', () => {
        expect(EzFloat.toFloat(undefined)).toBe(0.0);
    });


    test('should return 0.00 for null', () => {
        expect(EzFloat.toFloat(null)).toBe(0.0);
    });


    test('should return 0.00 for invalid string', () => {
        expect(EzFloat.toFloat('abc')).toBe(0.0);
    });

    test('should convert valid string with radix to float', () => {
        expect(EzFloat.toFloat('10', 16)).toBe(10); 
    });

    test('should convert valid string with negative number to float', () => {
        expect(EzFloat.toFloat('-5')).toBe(-5);
    });

    test('should convert valid string with exponential notation to float', () => {
        expect(EzFloat.toFloat('3.5e2')).toBe(350);
    });

    test('should convert valid string with exponential notation and positive sign to float', () => {
        expect(EzFloat.toFloat('+3.5e2')).toBe(350);
    });
});
