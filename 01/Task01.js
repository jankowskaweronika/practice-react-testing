import React from 'react';
import LoginForm from './components/LoginForm';
import CatchError from './components/CatchError';
const Task01 = () => {
  function tryAuth(login, password) {
    return login.length + password.length > 6;
  }

  return (
    <section>
      <h1>Task01</h1>
      <CatchError>
        <LoginForm tryAuth={tryAuth} />
      </CatchError>
    </section>
  );
};

export default Task01;