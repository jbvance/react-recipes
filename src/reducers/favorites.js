const initialState = { list: [], loading: false}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'add_favorite': {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case 'remove_favorite':
      return {
        ...state,
        list: state.list.filter((fav) => fav.uri !== action.payload),
      };
    case 'fetch_favorites':
      return { ...state, list: action.payload};
    default:
      return state;
  }
};
