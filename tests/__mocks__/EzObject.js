export const EzObject = {
    isValid: jest.fn((obj) => obj !== null && obj !== undefined),
    assignOrDefault: jest.fn((obj1, obj2) => obj1 || obj2)
};