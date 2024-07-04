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
