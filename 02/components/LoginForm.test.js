import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import CatchError from './CatchError';

const mockTryAuth = jest.fn();

describe('<LoginForm>', () => {
  test('renders login form with empty fields', () => {
    render(<LoginForm tryAuth={mockTryAuth} />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(loginInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('allows entering login and password', async () => {
    render(<LoginForm tryAuth={mockTryAuth} />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(loginInput, 'testUser');
    await userEvent.type(passwordInput, 'password123');

    expect(loginInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('password123');
  });

  test('displays error message when login is too short', async () => {
    render(<LoginForm tryAuth={mockTryAuth} />);
    await userEvent.type(screen.getByLabelText(/login/i), 'te');
    await userEvent.tab();

    expect(screen.getByText(/The field is too short!/i)).toBeInTheDocument();
  });

  test('displays error message when password is too short', async () => {
    render(<LoginForm tryAuth={mockTryAuth} />);
    await userEvent.type(screen.getByLabelText(/password/i), 'pw');
    await userEvent.tab();

    expect(screen.getByText(/The field is too short!/i)).toBeInTheDocument();
  });
});

describe('<LoginForm> with <CatchError>', () => {
  test('shows error boundary message when submit with invalid auth', async () => {
    mockTryAuth.mockReturnValue(false);
    render(
      <CatchError>
        <LoginForm tryAuth={mockTryAuth} />
      </CatchError>
    );

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /send/i });

    await userEvent.type(loginInput, 'testUser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
  });
});