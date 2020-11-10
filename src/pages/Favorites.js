import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../actions';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from './../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Recipe from '../components/Recipe';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const error = favorites.error;
  const favList = favorites.list;
  const loading = favorites.loading;
  const dispatch = useDispatch();
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const isAuth = auth.isAuthenticated();

  useEffect(() => {
    if (!favList || favList.length === 0) {
      dispatch(fetchFavorites(fetchContext));
    }
  }, []);

  const renderFavorites = (favs) => {
    if (!favs || favs.length === 0) {
      return <div>You haven't saved any favorites yet!</div>;
    } else {
      return favs.map((fav) => {
        const uri = encodeURIComponent(fav.uri);
        return <Recipe key={uri} recipe={fav} showFavorite={isAuth} />;
      });
    }
  };

  return (
    <>
      <h2
        style={{
          fontSize: 42,
          textAlign: 'center',
          marginBottom: '30px',
          backgroundColor: '#fff',
        }}
      >
        Favorites
      </h2>
      {error && <div>{error}</div>}
      {loading && <LoadingSpinner text="Loading..." />}
      {!loading && renderFavorites(favList)}
    </>
  );
};

export default Favorites;
