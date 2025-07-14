const validateBug = (bug) => {
  if (!bug.title || !bug.description) {
    throw new Error('Title and description are required');
  }
  if (bug.title.length > 100) {
    throw new Error('Title must be less than 100 characters');
  }
  return true;
};

module.exports = validateBug;