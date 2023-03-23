import { useState } from 'react';

const Togglable = ({ toggleOnButtonLabel, toggleOffButtonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{toggleOnButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{toggleOffButtonLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;