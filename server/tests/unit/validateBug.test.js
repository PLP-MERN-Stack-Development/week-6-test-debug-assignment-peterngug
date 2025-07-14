const validateBug = require('../../src/utils/validateBug');

describe('validateBug', () => {
  test('should throw error for missing title', () => {
    expect(() => validateBug({ description: 'Test' }))
      .toThrow('Title and description are required');
  });

  test('should throw error for missing description', () => {
    expect(() => validateBug({ title: 'Test' }))
      .toThrow('Title and description are required');
  });

  test('should throw error for long title', () => {
    expect(() => validateBug({ 
      title: 'A'.repeat(101), 
      description: 'Test' 
    })).toThrow('Title must be less than 100 characters');
  });

  test('should return true for valid bug', () => {
    expect(validateBug({ title: 'Test', description: 'Test' }))
      .toBe(true);
  });
});