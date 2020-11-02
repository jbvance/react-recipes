import { useContext } from 'react';

export const setFavorite = (recipe, fetchContext) => async (dispatch) => {
  try {   
    await fetchContext.authAxios.post('/favorites', {
      recipeData: recipe,
    });    
    dispatch({ type: 'add_favorite', payload: recipe });
  } catch (err) {
    console.error(err);
  }
};

export const fetchFavorites = (fetchContext) => async (dispatch) => {
  try {   
    const response = await fetchContext.authAxios.get('/favorites');    
    dispatch({ type: 'fetch_favorites', payload: response.data });
  } catch (err) {
    console.error(err);
    dispatch ({ type: 'fetch_error', paylaod: 'Unable to fetch favorites'})
  }
}

export const removeFavorite = (uri, fetchContext) => async (dispatch) => {
  try {   
    await fetchContext.authAxios.delete(`/favorites`, {
      data: { uri }
    });    
    dispatch({ type: 'remove_favorite', payload: uri });
  } catch (err) {
    console.error(err);
  }
};
