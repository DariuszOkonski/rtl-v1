import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm/i);

  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type password', () => {
  render(<App />);
  const passwordInputElement = screen.getByTestId('password');
  userEvent.type(passwordInputElement, 'password1');
  expect(passwordInputElement.value).toBe('password1');
});

test('should be able to type confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByTestId('confirm-password');
  userEvent.type(confirmPasswordInputElement, 'secret123');
  expect(confirmPasswordInputElement.value).toBe('secret123');
});

test('should show email error message on invalid email', () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElement).not.toBeInTheDocument();

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'selenagmail.com');

  const submitButton = screen.getByRole('button', { name: /submit/i });

  userEvent.click(submitButton);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).not.toBeInTheDocument();
});

test('should show password error if password is less than 5 characters', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, '123');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).not.toBeInTheDocument();
});

test('should show confirm password error if passwords dont mach', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. Try again/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '12345');
  userEvent.type(confirmPasswordInputElement, '123456');

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAfter = screen.queryByText(
    /the passwords don't match. Try again/i
  );

  expect(confirmPasswordErrorElementAfter).not.toBeInTheDocument();
});
