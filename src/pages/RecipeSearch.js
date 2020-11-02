import React, { useState } from 'react';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import GradientBar from '../components/common/GradientBar';
import { publicFetch } from '../util/fetch';
import FormError from '../components/common/FormError';
import FormInput from '../components/FormInput';
import FormSuccess from '../components/FormSuccess';
import logo from './../images/logo.png';
import GradientButton from '../components/common/GradientButton';
import Label from '../components/common/Label';
import Recipe from '../components/Recipe';

const RecipeSearch = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState();
  const [searchError, setSearchError] = useState();
  const [hits, setHits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('yes');

  const SearchSchema = Yup.object().shape({
    searchTerm: Yup.string().required('Please enter a search term'),
  });

  const submitSearch = async (e) => {
    try {
      e.preventDefault();
      setSearchLoading(true);
      const params = { q: searchTerm };
      const { data } = await publicFetch.get(`recipes/search`, {
        params,
      });

      //authContext.setAuthState(data);
      console.log('DATA', data);
      setSearchSuccess(data.message);
      setSearchLoading(false);
      setSearchError(null);
      if (data.hits.length > 0) {
        setHits(data.hits);
      }
    } catch (error) {
      console.error(error);
      setSearchLoading(false);
      const { data } = error.response;
      setSearchError(data.message);
      setSearchSuccess(null);
    }
  };

  const renderRecipes = () => {
    return hits.map((hit) => (
      <Recipe key={hit.recipe.uri} recipe={hit.recipe} />
    ));
  };

  return (
    <>
      <section className="container">
        <GradientBar />
        <div>
          <div>
            <div>
              <div className="w-32 m-auto mb-6">
                <img src={logo} alt="Logo" />
              </div>
              <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Search For a recipe
              </h2>
            </div>

            <div>
              <form>
                {searchSuccess && <FormSuccess text={searchSuccess} />}
                {searchError && <FormError text={searchError} />}
                <div>                  
                    <div>
                      <Label text="Search" />
                    </div>
                    <input
                      aria-label="Email"
                      name="searchTerm"
                      type="text"
                      placeholder="Enter a search term"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />                  
                </div>

                <div className="mt-6">
                  <GradientButton
                    type="submit"
                    text="Search"
                    loading={searchLoading}
                    onClick={submitSearch}
                  />
                </div>
                <div>
                  {hits.length > 0 ? renderRecipes() : <div>No results</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeSearch;
