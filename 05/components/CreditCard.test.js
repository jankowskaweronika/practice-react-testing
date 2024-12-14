import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreditCard from './CreditCard';

describe('CreditCard Component', () => {
  it('renders the input field', () => {
    render(<CreditCard />);
    expect(
      screen.getByPlaceholderText(/enter card number/i)
    ).toBeInTheDocument();
  });

  it('identifies American Express correctly', () => {
    render(<CreditCard />);
    userEvent.type(
      screen.getByPlaceholderText(/enter card number/i),
      '370707524318583'
    );
    expect(screen.getByText('AMEX')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  it('identifies Visa correctly', () => {
    render(<CreditCard />);
    userEvent.type(
      screen.getByPlaceholderText(/enter card number/i),
      '4111111111111111'
    );
    expect(screen.getByText('VISA')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  it('identifies MasterCard correctly', () => {
    render(<CreditCard />);
    userEvent.type(
      screen.getByPlaceholderText(/enter card number/i),
      '5111111111111118'
    );
    expect(screen.getByText('MASTERCARD')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  it('shows invalid for incorrect card number', () => {
    render(<CreditCard />);
    userEvent.type(
      screen.getByPlaceholderText(/enter card number/i),
      '1234567890123456'
    );
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });
});