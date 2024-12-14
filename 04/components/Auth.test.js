import { render, screen, waitFor } from '@testing-library/react';
import Auth from './Auth';
import userEvent from '@testing-library/user-event';

const setup = () => {
  render(<Auth />);

  const loginEl = screen.getByLabelText(/login/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const buttonEl = screen.getByRole('button');

  return {
    loginEl,
    passwordEl,
    buttonEl,
  };
};

describe('Auth', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have login and password fields', () => {
    const { loginEl, passwordEl } = setup();

    expect(loginEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
  });

  it('should log in with correct credentials', async () => {
    const { loginEl, passwordEl, buttonEl } = setup();

    const login = 'jan@domena.pl';
    const password = 'janeczek';
    const md5 = '8ae75b43f70f20ba564200ef4ab63a33';

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: md5 }),
    });

    userEvent.type(loginEl, login);
    userEvent.type(passwordEl, password);
    userEvent.click(buttonEl);

    await waitFor(() => {
      expect(
        screen.getByText(`Jesteś zalogowany jako: ${login}`)
      ).toBeInTheDocument();
    });

    expect(window.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        body: password,
      })
    );
  });

  it('should not log in with incorrect credentials', async () => {
    const { loginEl, passwordEl, buttonEl } = setup();

    const login = 'jan@domena.pl';
    const password = 'wrongpassword';
    const md5 = 'incorrectmd5hash';

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: md5 }),
    });

    userEvent.type(loginEl, login);
    userEvent.type(passwordEl, password);
    userEvent.click(buttonEl);

    await waitFor(() => {
      expect(
        screen.queryByText(`Jesteś zalogowany jako: ${login}`)
      ).not.toBeInTheDocument();
    });
  });
});