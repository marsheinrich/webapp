const moment = jest.fn(() => ({
    format: jest.fn(() => 'mockedTimestamp'),
}));

export default moment;