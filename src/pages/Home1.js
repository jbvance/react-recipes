import React from 'react';
import Searchbar from '../components/Searchbar';

const Home = () => {
  return (
    <div style={styles.main}>
     <div style={styles.content}>
       <h2 style={styles.header}>Search for a Recipe!</h2>
      <div style={styles.search}>
      <Searchbar />
      </div>
     </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: 50
  },
  main: {
    display: 'flex', 
    height: '80vh',  
    minHeight: '300px',
    border: '1px solid red',
    flex: 1,      
  },
  content: {
    display: 'flex',
    flex: 1,
    border: '1px solid blue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    border: '1px solid yellow',
    width: '80%',
  
  }
}


export default Home;