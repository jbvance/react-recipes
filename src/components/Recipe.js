import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '../util';
import { setFavorite, removeFavorite } from '../actions';
import { FetchContext } from '../context/FetchContext';
import './Recipe.css';

// Get labels from recipes for things such as 'sugar concious', 'peanut-free', etc.
function getHealthLabels(recipe) {
  if (!recipe.healthLabels) return '';
  return recipe.healthLabels.map((item) => <div key={item}>{item}</div>);
}

const Recipe = ({ recipe, showFavorite = false }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const fetchContext = useContext(FetchContext);

  const isFavorite = favorites.findIndex((fav) => fav.uri === recipe.uri) > -1;
  const uri = encodeURIComponent(recipe.uri);

  const toggleFavorite = async (e) => {   
    if (!isFavorite) {
      dispatch(setFavorite(recipe, fetchContext));
    } else {
      const favToDelete = favorites.find((fav) => fav.uri === recipe.uri);
      try {
        dispatch(removeFavorite(favToDelete.uri, fetchContext));
      } catch (err) {
        console.log('Error deleting favorite', err.message);
      }
    }
  };

  return (
    <div className="col-4">
      <div className="recipe-box">
        <img className="card__picture" src={recipe.image} alt={recipe.label} />
        <div className="recipe-text">
          <div style={{ alignSelf: 'center', padding: ' 0 5 0 5' }}>
            {/* <a href={recipe.url} target="_blank"> */}
            <span className="recipe-text__name">{recipe.label}</span>
            {/* </a> */}
          </div>
          <div className="recipe-detail__link">
            <Link key={uri} to={`/recipes/${uri}`}>
              View Details
            </Link>
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
            <div className="fav-toggle">
              {showFavorite && (
                <FontAwesomeIcon
                  icon={faHeart}
                  opacity={isFavorite ? '1' : '0.2'}
                  onClick={toggleFavorite}
                  size="2x"
                  title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
            {/* <a href={recipe.url} target="_blank" className="btn btn--green">
              View Recipe
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
