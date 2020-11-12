import React from 'react';
import { withRouter } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import splash from '../images/splash.jpg';

const Home = ({ history }) => {
  const onSearch = (term) => {
    history.push(`/recipes/?term=${encodeURIComponent(term)}`);
  };

  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <h2 style={styles.header}>Search for a Recipe!</h2>
        <div style={styles.search}>
          <Searchbar onSubmitSearch={onSearch} placeholder="Search Recipes" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: 50,
    backgroundColor: 'green',
    color: '#fff',
    marginBottom: '20px',
    padding: '5px 70px'
  },
  main: {
    display: 'flex',
    height: '100vh',
    minHeight: '300px',
    flex: 1,
    backgroundImage: `url(${splash})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {    
    width: '80%',
  },
};

export default withRouter(Home);
