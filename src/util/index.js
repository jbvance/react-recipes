export const formatCurrency = (num) => {
  return `$${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Take a uri for a recipe and create a sting id that can be passed via a parameter
// (ex) https://www.edamam.com/ontologies/edamam.owl#recipe_86267794882cd24a3e7c2e6bb6bbaf95
export const getIdFromUri = uri => uri.split('#recipe_')[1];
