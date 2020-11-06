import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GradientBar from '../components/common/GradientBar';
import { publicFetch } from '../util/fetch';
import FormError from '../components/common/FormError';
import FormSuccess from '../components/FormSuccess';
import logo from './../images/logo.png';
import GradientButton from '../components/common/GradientButton';
import Label from '../components/common/Label';
import Recipe from '../components/Recipe';
import { AuthContext } from './../context/AuthContext';
import { fetchFavorites } from '../actions';
import { FetchContext } from '../context/FetchContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RecipeSearch = (props) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState();
  const [searchError, setSearchError] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const auth = useContext(AuthContext);
  const isAuth = auth.isAuthenticated();
  const dispatch = useDispatch();
  const fetchContext = useContext(FetchContext);
  const recipes = useSelector((state) => state.recipes);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const term = query.get('term');
  console.log(term);

  useEffect(() => {
    dispatch(fetchFavorites(fetchContext));
  }, [dispatch, fetchContext]);

  const getSearchResults = async (searchTerm) => {
    try {
      console.log('GOT HERE');
      setSearchError(null);
      setSearchLoading(true);
      if (!searchTerm) {
        setSearchError('Please enter a search term.');
      }
      const params = { q: searchTerm };
      const { data } = await publicFetch.get(`recipes/search`, {
        params,
      });
      setSearchSuccess(data.message);
      setSearchLoading(false);
      setSearchError(null);
      if (data.hits.length > 0) {
        dispatch({ type: 'set_recipes', payload: data.hits });
      }
    } catch (error) {
      console.error(error);
      const { data } = error.response;
      setSearchError(data.message);
      setSearchSuccess(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const renderRecipes = () => {
    return recipes.map((hit) => {
      const uri = encodeURIComponent(hit.recipe.uri);
      return <Recipe key={uri} recipe={hit.recipe} showFavorite={isAuth} />;
    });
  };

  if (!term) {
    return null;
  }

  return (
    <>
      <section className="container">
        <GradientBar />
        <div>
          <div>
            <div>
              {/* <div className="w-32 m-auto mb-6">
                <img src={logo} alt="Logo" />
              </div>
              <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Search For a recipe
              </h2> */}
            </div>

            <div className="container">
              <div className="recipe-search-container">
                {searchLoading && <LoadingSpinner text="Searching..." />}
                {!searchLoading && recipes.length > 0 && renderRecipes()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeSearch;
