export default (state = [], action) => {  
  switch (action.type) {
    case 'add_favorite': {
      return [...state, action.payload];
    }
    case 'remove_favorite':
      console.log('URI TO DELETE', action.payload)
      return state.filter(fav => fav.uri !== action.payload);
    case 'fetch_favorites':
      return action.payload
    default:
      return state;
  }
};
