import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, removeFavorite, fetchFavorites } from '../actions';
import { FetchContext } from '../context/FetchContext';

import './RecipeDetail.css';

const renderIngredients = (ingredients) => {
  return ingredients.map((ing, ind) => (
    <div key={ind} className="recipe-info__ingredient">
      {ing.text}
    </div>
  ));
};

const renderDigest = (digest) => {
  return digest.map((item, ind) => (
    <div key={ind}>
      {item.label}: {parseInt(item.total)} {item.unit}
    </div>
  ));
};

const RecipeDetail = ({ recipe }) => {
  const favorites = useSelector((state) => state.favorites.list);
  console.log('FAV', favorites);
  const isFavorite = favorites.findIndex((fav) => fav.uri === recipe.uri) > -1;
  const [saving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const fetchContext = useContext(FetchContext);
  console.log(recipe);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      console.log('GOING');
      dispatch(fetchFavorites(fetchContext));
    }
  }, []);

  const toggleFavorite = async () => {
    setIsSaving(true);
    if (!isFavorite) {
      await dispatch(setFavorite(recipe, fetchContext));
      setIsSaving(false);
    } else {
      const favToDelete = favorites.find((fav) => fav.uri === recipe.uri);
      try {
        await dispatch(removeFavorite(favToDelete.uri, fetchContext));
      } catch (err) {
        console.log('Error deleting favorite', err.message);
      } finally {
        setIsSaving(false);
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="recipe-detail">
          <div className="recipe-detail__image">
            <img src={recipe.image} alt={recipe.label} />
          </div>
          <div className="recipe-detail__title">
            <h3>{recipe.label}</h3>
            <div className="recipe-detail__title_detail">
              <div className="recipe-detail__title_item">
                {parseInt(recipe.calories)} calories
              </div>
              <div className="recipe-detail__title_item">
                Preparation Time: {recipe.totalTime} Min.
              </div>
              <div className="recipe-detail__title_item">
                See the full recipe at{' '}
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  {recipe.source}
                </a>
              </div>
            </div>
            <div>
              <button className="btn-fav" onClick={toggleFavorite}>
                {saving
                  ? '...Saving'
                  : isFavorite
                  ? 'Remove From Favorites'
                  : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
        <div className="recipe-info">
          <div className="recipe-info__ingredients">
            <h3>{recipe.ingredients.length} ingredients</h3>
            {renderIngredients(recipe.ingredients)}
          </div>
          <div className="recipe-info__nutrition">
            <h3>Nutrition</h3>
            {renderDigest(recipe.digest)}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
