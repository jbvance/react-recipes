import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GradientBar from '../components/common/GradientBar';
import { publicFetch } from '../util/fetch';
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

  useEffect(() => {
    setSearchTerm(term);
    dispatch(fetchFavorites(fetchContext));
  }, [dispatch, fetchContext, term]);

  useEffect(() => {
    if (term !== searchTerm) {    
      setSearchTerm(term);
    }
  }, [term, searchTerm]);

  useEffect(() => {
    // If the search term hasn't changed, do nothing
    if (!searchTerm) return;

    const getSearchResults = async (searchTerm) => {
      try {      
        setSearchError(null);
        setSearchLoading(true);
        if (!searchTerm) {
          setSearchError('Please enter a search term.');
          console.log('exiting')
          return;
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

    getSearchResults(searchTerm);
  }, [searchTerm, dispatch]);

  const renderRecipes = () => {
    return recipes.map((hit) => {
      const uri = encodeURIComponent(hit.recipe.uri);
      return <Recipe key={uri} recipe={hit.recipe} showFavorite={isAuth} />;
    });   
  };

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
                {searchError && <div>{searchError}</div>}
                {searchLoading && <LoadingSpinner text="Searching..." />} 
                {searchTerm && !searchLoading &&  (
                  <h2 style={{fontSize: 32, fontWeight: 800, marginBottom: '15px'}}>Results for "{searchTerm}"</h2>
                )}               
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
