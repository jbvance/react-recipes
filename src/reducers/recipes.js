export default (state = [], action) => {  
  switch (action.type) {              
    case 'set_recipes':
      return action.payload
    default:
      return state;
  }
};
