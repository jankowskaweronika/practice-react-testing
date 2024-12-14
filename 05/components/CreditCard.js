import { useState } from 'react';
import styled from 'styled-components';
const CardContainer = styled.div`
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 20px;
	max-width: 400px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	background-color: ${(props) => {
    switch (props.cardType) {
      case 'visa':
        return 'yellow';
      case 'mastercard':
        return 'red';
      case 'amex':
        return 'blue';
      default:
        return 'lightblue';
    }
  }};
	margin: 20px;
`;

const CardInput = styled.input`
	width: 80%;
	padding: 10px;
	margin: 10px 0;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

const CardInfo = styled.p`
	margin: 5px 0;
	font-weight: bold;
`;

const getCardType = (number) => {
  const regexPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
  };

  for (let card in regexPatterns) {
    if (regexPatterns[card].test(number)) {
      return card;
    }
  }

  return 'unknown';
};

const isValidCardNumber = (number) => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardNumber(number);
    setCardType(getCardType(number));
    setIsValid(isValidCardNumber(number));
  };

  return (
    <CardContainer cardType={cardType}>
      <CardInput
        type="text"
        value={cardNumber}
        onChange={handleCardNumberChange}
        placeholder="Enter card number"
      />
      {cardNumber && <CardInfo>{cardType.toUpperCase()}</CardInfo>}
      {cardNumber && (
        <CardInfo>
          {isValidCardNumber(cardNumber) ? 'Valid' : 'Invalid'}
        </CardInfo>
      )}
    </CardContainer>
  );
};

export default CreditCard;