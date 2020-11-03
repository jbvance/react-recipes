  
import { combineReducers } from 'redux';
import favorites from './favorites';
import recipes from './recipes';

export default combineReducers({
   favorites,
   recipes
});