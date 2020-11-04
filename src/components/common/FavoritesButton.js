import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FavoritesButton.css';

const FavoritesButton = ({ icon, text, onToggleFavorite }) => {
  return (
    <button className="btn-fav" onClick={onToggleFavorite}>
  
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </span>
    </button>
  );
};

export default FavoritesButton;
