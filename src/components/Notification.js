import React from 'react';

const Notification = ({ message, isErrorMessage }) => {
  console.log('message', message);
  if (message === null) {
    return null;
  }

  return (
    <div className={ isErrorMessage ? 'error' : 'success' }>
      {message}
    </div>
  );
};

export default Notification;