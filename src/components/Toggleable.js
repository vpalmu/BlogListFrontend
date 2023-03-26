import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleOff = { display: visible ? 'none' : '' };
  const toggleOn = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  Togglable.propTypes = {
    toggleOnButtonLabel: PropTypes.string.isRequired,
    toggleOffButtonLabel: PropTypes.string.isRequired
  };

  return (
    <div>
      <div style={toggleOff}>
        <button onClick={toggleVisibility}>{props.toggleOnButtonLabel}</button>
      </div>
      <div style={toggleOn}>
        {props.children}
        <button onClick={toggleVisibility}>{props.toggleOffButtonLabel}</button>
      </div>
    </div>
  );
});


export default Togglable;