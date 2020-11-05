import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = ({ text = '' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px'
    }}
  >
    <FontAwesomeIcon icon={faCircleNotch} spin />
    <span className="ml-2">{text}</span>
  </div>
);

export default LoadingSpinner;
