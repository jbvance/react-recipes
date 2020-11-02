export default (state = [], action) => {
  console.log('ACTION', action.type);
  switch (action.type) {
    case 'add_favorite': {
      return [...state, action.payload];
    }
    case 'remove_favorite':
      return state.filter(fav => fav.uri !== action.payload);
    default:
      return state;
  }
};
