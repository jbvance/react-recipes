import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicFetch } from '../util/fetch';
import RecipeDetail from '../components/RecipeDetail';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const recipes = useSelector((state) => state.recipes);
  //console.log(recipe);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true)
      if (recipes.length > 0) {
        const result = recipes.find(
          (hit) => hit.recipe.uri === decodeURIComponent(id)
        );
        if (result) {
          setRecipe(result.recipe);
        }
        setLoading(false);
      } else {
        const params = { r: id };
        try {
          const { data } = await publicFetch.get(`recipes/search`, {
            params,
          });
          //console.log(data);
          if (data && data.length > 0) {
            setRecipe(data[0]);
          }
        } catch (err){
          console.error(err);
        } finally {
          setLoading(false);
        }    
      }
    };

    getRecipe();
  }, [id, recipes]);


  if (loading) return <div>...Loading</div>
  return (
    <RecipeDetail recipe={recipe} />
    );
};

export default Recipe;
