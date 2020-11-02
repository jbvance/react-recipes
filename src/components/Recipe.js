import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '../util';
import './Recipe.css';

// Get labels from recipes for things such as 'sugar concious', 'peanut-free', etc.
function getHealthLabels(recipe) {
  if (!recipe.healthLabels) return '';
  return recipe.healthLabels.map((item) => <div key={item}>{item}</div>);
}

const Recipe = ({ recipe, showFavorite = false }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    
    if (!isFavorite) {
      dispatch({ type: 'add_favorite', payload: recipe }); 
      setIsFavorite(true);       
    } else {
      dispatch({ type: 'remove_favorite', payload: recipe.uri });
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    setIsFavorite(favorites.findIndex((fav) => fav.uri === recipe.uri) > -1);
  }, []);

  return (
    <div className="col-4">
      <div className="recipe-box">
        <img className="card__picture" src={recipe.image} alt={recipe.label} />
        <div className="recipe-text">
          <div style={{ alignSelf: 'center', padding: ' 0 5 0 5' }}>
            <a href={recipe.url} target="_blank">
              <span className="recipe-text__name">{recipe.label}</span>
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
          >
            <div>{recipe.totalTime} minutes</div>
            <div>
              {showFavorite && (
                <FontAwesomeIcon
                  icon={faBookmark}
                  opacity={isFavorite ? '1' : '0.2'}
                  onClick={toggleFavorite}
                />
              )}
            </div>
          </div>
        </div>
        <div className="recipe-box__details">
          <div className="recipe-box__ingredients">
            {recipe.ingredients.length} ingredients &#124;
            {numberWithCommas(parseInt(recipe.calories))} calories
          </div>
          <div className="recipe-box__health-labels">
            {getHealthLabels(recipe)}
          </div>
          <div className="recipe-box__link">
            <a href={recipe.url} target="_blank" className="btn btn--green">
              View Recipe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
