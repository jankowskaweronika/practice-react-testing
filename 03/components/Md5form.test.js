import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';

function mockFetch() {
  jest.spyOn(window, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ Digest: '202cb962ac59075b964b07152d234b70' }),
  });
}

function typeTextAndClickButton(inputText) {
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  userEvent.type(input, inputText);
  userEvent.click(button);
}

describe('<Md5Form></Md5Form>', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should display inserted text to input with class .data-text', async () => {
    mockFetch();
    render(<Md5Form getMd5={getMd5} />);

    typeTextAndClickButton('12345');
    expect(await screen.findByText(/12345/i)).toBeInTheDocument();
  });

  test('should load data to data-md5', async () => {
    mockFetch();
    render(<Md5Form getMd5={getMd5} />);

    typeTextAndClickButton('123');
    await waitFor(() => {
      expect(
        screen.getByText(/202cb962ac59075b964b07152d234b70/i)
      ).toBeInTheDocument();
    });
  });

  test('should clear md5', async () => {
    mockFetch();
    render(<Md5Form getMd5={getMd5} />);

    typeTextAndClickButton('123');
    await waitFor(() => {
      expect(
        screen.getByText(/202cb962ac59075b964b07152d234b70/i)
      ).toBeInTheDocument();
    });

    userEvent.type(screen.getByRole('textbox'), 'a');
    await waitFor(() => {
      expect(
        screen.queryByText(/202cb962ac59075b964b07152d234b70/i)
      ).not.toBeInTheDocument();
    });
  });
});