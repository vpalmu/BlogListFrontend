import { useState } from 'react';

const Togglable = ({ toggleOnButtonLabel, toggleOffButtonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleOff = { display: visible ? 'none' : '' };
  const toggleOn = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={toggleOff}>
        <button onClick={toggleVisibility}>{toggleOnButtonLabel}</button>
      </div>
      <div style={toggleOn}>
        {children}
        <button onClick={toggleVisibility}>{toggleOffButtonLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;