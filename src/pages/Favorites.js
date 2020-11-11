import React, { useEffect, useContext, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, setFavorite } from '../actions';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from './../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Recipe from '../components/Recipe';
import Searchbar from '../components/Searchbar';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const [favsToShow, setFavsToShow] = useState([]);
  const error = favorites.error;
  const loading = favorites.loading;
  const dispatch = useDispatch();
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const isAuth = auth.isAuthenticated();

  const getFavs = () => {
    if (!favorites.list || favorites.list.length === 0) {
      dispatch(fetchFavorites(fetchContext));
      console.log(favorites);
    }
  };

  useEffect(() => {
    getFavs();
  }, []);

  useEffect(() => {  
    if (favorites && favorites.list) {
      setFavsToShow(favorites.list);
    }
  }, [favorites]);

  const renderFavorites = (favs) => {
    if (!favs || favs.length === 0) {
      return <div>No favorites found.</div>;
    } else {
      return favs.map((fav) => {
        const uri = encodeURIComponent(fav.uri);
        return <Recipe key={uri} recipe={fav} showFavorite={isAuth} />;
      });
    }
  };

  const filterFavorites = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setFavsToShow(favorites.list);
    }
    const filtered = favorites.list.filter((fav) =>
      fav.label.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setFavsToShow(filtered);
  };

  return (
    <div className="container">
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
      <div style={{ marginBottom: '20px' }}>
        <Searchbar
          onSubmitSearch={(e) => console.log(e)}
          onChangeText={filterFavorites}
          placeholder="Search Favorites"
        />
      </div>
      {error && <div>{error}</div>}
      {loading && <LoadingSpinner text="Loading..." />}
      {!loading && renderFavorites(favsToShow)}
    </div>
  );
};

export default Favorites;
