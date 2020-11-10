export const setFavorite = (recipe, fetchContext) => async (dispatch) => {
  dispatch({ type: 'set_favorite_error', payload: null });
  try {
    await fetchContext.authAxios.post('/favorites', {
      recipeData: recipe,
    });
    dispatch({ type: 'add_favorite', payload: recipe });
  } catch (err) {
    dispatch({ type: 'set_favorite_error', payload: 'Unable to add favorite' });
    console.error(err);
  }
};

export const fetchFavorites = (fetchContext) => async (dispatch) => {
  try {
    dispatch({ type: 'set_favorite_error', payload: null });
    dispatch({ type: 'set_favorites_loading', payload: true});
    const response = await fetchContext.authAxios.get('/favorites');
    dispatch({ type: 'fetch_favorites', payload: response.data });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'set_favorite_error',
      payload: 'Unable to fetch favorites',
    });
  } finally {
    dispatch({ type: 'set_favorites_loading', payload: false});
  }
};

export const removeFavorite = (uri, fetchContext) => async (dispatch) => {
  try {
    dispatch({ type: 'set_favorite_error', payload: null });
    await fetchContext.authAxios.delete(`/favorites`, {
      data: { uri },
    });
    dispatch({ type: 'remove_favorite', payload: uri });
  } catch (err) {
    dispatch({
      type: 'set_favorite_error',
      payload: 'Unable to remove favorite',
    });
    console.error(err);
  }
};
