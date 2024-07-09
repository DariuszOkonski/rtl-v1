/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }

  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

test('inputs should be initially empty', () => {
  // const emailInputElement = screen.getByRole('textbox');
  // const passwordInputElement = screen.getByLabelText('Password');
  // const confirmPasswordInputElement =
  //   screen.getByLabelText(/confirm password/i);

  const {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  } = typeIntoForm({});

  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  // render(<App />);
  // const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  // userEvent.type(emailInputElement, 'selena@gmail.com');
  const { emailInputElement } = typeIntoForm({
    email: 'selena@gmail.com',
  });
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type password', () => {
  // render(<App />);
  // const passwordInputElement = screen.getByTestId('password');
  // userEvent.type(passwordInputElement, 'password1');

  const { passwordInputElement } = typeIntoForm({ password: 'password1' });
  expect(passwordInputElement.value).toBe('password1');
});

test('should be able to type confirm password', () => {
  // render(<App />);
  // const confirmPasswordInputElement = screen.getByTestId('confirm-password');
  // userEvent.type(confirmPasswordInputElement, 'secret123');

  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: 'secret123',
  });
  expect(confirmPasswordInputElement.value).toBe('secret123');
});

test('should show email error message on invalid email', async () => {
  // render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElement).not.toBeInTheDocument();

  // const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  // userEvent.type(emailInputElement, 'selenagmail.com');
  typeIntoForm({ email: 'selenagmail.com' });

  const submitButton = screen.getByRole('button', { name: /submit/i });

  await userEvent.click(submitButton);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test('should show password error if password is less than 5 characters', async () => {
  // render(<App />);

  // const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  // const passwordInputElement = screen.getByLabelText('Password');
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  // userEvent.type(emailInputElement, 'selena@gmail.com');
  typeIntoForm({ email: 'selena@gmail.com' });
  expect(passwordErrorElement).not.toBeInTheDocument();

  // userEvent.type(passwordInputElement, '123');
  typeIntoForm({ passwordInputElement: '123' });
  await userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test('should show confirm password error if passwords dont mach', async () => {
  // render(<App />);

  // const emailInputElement = screen.getByRole('textbox', {
  //   name: /email/i,
  // });
  // const passwordInputElement = screen.getByLabelText('Password');
  // const confirmPasswordInputElement =
  //   screen.getByLabelText(/confirm password/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. Try again/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  typeIntoForm({
    email: 'selena@gmail.com',
    password: '12345',
    confirmPassword: '123456',
  });

  // userEvent.type(emailInputElement, 'selena@gmail.com');
  // userEvent.type(passwordInputElement, '12345');
  // userEvent.type(confirmPasswordInputElement, '123456');

  await userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAfter = screen.queryByText(
    /the passwords don't match. Try again/i
  );

  expect(confirmPasswordErrorElementAfter).toBeInTheDocument();
});

test('should show no error message if every input is valid', async () => {
  // render(<App />);

  // const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  // const passwordInputElement = screen.getByLabelText('Password');
  // const confirmPasswordInputElement =
  //   screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  typeIntoForm({
    email: 'selena@gmail.com',
    password: '12345',
    confirmPassword: '12345',
  });

  // userEvent.type(emailInputElement, 'selena@gmail.com');
  // userEvent.type(passwordInputElement, '12345');
  // userEvent.type(confirmPasswordInputElement, '12345');

  await userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(
    /The email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /The passwords don't match. Try again/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
