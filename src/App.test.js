/* eslint-disable testing-library/prefer-presence-queries */
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

const clickOnSubmitButton = async () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  await userEvent.click(submitBtnElement);
};

describe('App', () => {
  test('inputs should be initially empty', () => {
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
    const { emailInputElement } = typeIntoForm({
      email: 'selena@gmail.com',
    });
    expect(emailInputElement.value).toBe('selena@gmail.com');
  });

  test('should be able to type password', () => {
    const { passwordInputElement } = typeIntoForm({ password: 'password1' });
    expect(passwordInputElement.value).toBe('password1');
  });

  test('should be able to type confirm password', () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: 'secret123',
    });
    expect(confirmPasswordInputElement.value).toBe('secret123');
  });

  describe('Error Handling', () => {
    test('should show email error message on invalid email', async () => {
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();

      typeIntoForm({ email: 'selenagmail.com' });

      await clickOnSubmitButton();

      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test('should show password error if password is less than 5 characters', async () => {
      typeIntoForm({ email: 'selena@gmail.com' });
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();

      typeIntoForm({ passwordInputElement: '123' });

      await clickOnSubmitButton();

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).toBeInTheDocument();
    });

    test('should show confirm password error if passwords dont mach', async () => {
      expect(
        screen.queryByText(/the passwords don't match. Try again/i)
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'selena@gmail.com',
        password: '12345',
        confirmPassword: '123456',
      });

      await clickOnSubmitButton();

      expect(
        screen.queryByText(/the passwords don't match. Try again/i)
      ).toBeInTheDocument();
    });

    test('should show no error message if every input is valid', async () => {
      typeIntoForm({
        email: 'selena@gmail.com',
        password: '12345',
        confirmPassword: '12345',
      });

      await clickOnSubmitButton();

      expect(
        screen.queryByText(/The email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /The password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The passwords don't match. Try again/i)
      ).not.toBeInTheDocument();
    });
  });
});
