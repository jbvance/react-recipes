import React from 'react';
import { numberWithCommas } from '../util';
import './Recipe.css';

// Get labels from recipes for things such as 'sugar concious', 'peanut-free', etc.
function getHealthLabels(recipe) {
  if (!recipe.healthLabels) return '';
  return recipe.healthLabels.map(item => <div key={item}>{item}</div>)
}

const Recipe = ({ recipe }) => {
  return (
    <div className="col-4">
      <div className="recipe-box">
        <img
          className="card__picture"
          src={recipe.image}
          alt={recipe.label}
        />
        <div className="recipe-text">
          <a href={recipe.url} target="_blank">
            <span className="recipe-text__name">{recipe.label}</span>
          </a>
          <span className="recipe-text__time">
            {' '}
            {recipe.totalTime} minutes
          </span>
        </div>
        <div className="recipe-box__details js-recipe-details">
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
