export const nameValidation = { required: true, maxLength: 30 };

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
};

export const passwordValidation = {
  required: 'Password is required',
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    message: 'Invalid password. Please ensure it meets all the requirements.',
  },
};

export const phoneValidation = {
  required: 'Password is required',
  pattern: {
    value: /^(\+?|0)[\d\-\+\s]{9,15}$/,
    message: 'Invalid Phone number. Please add a valid one.',
  },
};
