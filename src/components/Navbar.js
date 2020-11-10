import React, { useContext } from 'react';
import './NavBar.css';
import { Link, withRouter } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './../context/AuthContext';
import Searchbar from './Searchbar';

export const NavBar = (props) => {
  const auth = useContext(AuthContext);  
  const loggedIn = auth.isAuthenticated(); 
  
  const onSearch = (term) => {
    props.history.push(`/recipes/?term=${encodeURIComponent(term)}`)
  }
  
  const renderNavLinks = () => {
    return (
      <div className="main-nav">
        <div className="main-nav__link">{loggedIn && <AvatarDropdown />}</div>
        <div className="main-nav__link">
          {loggedIn && 
          
            <Link to="/favorites">
              <span>
                <i className="fas fa-file-signature app-icon"></i>
              </span>
              Favorites
            </Link>
          }
        </div>
        {!loggedIn && <Link to="/signup">Signup</Link>}
        {!loggedIn && <Link to="/login">Sign In</Link>}
      </div>
    );
  };

  return (
    <header className="header">    
      <h2 className="logo">
        {
          <Link to="/">
            <span>
            <FontAwesomeIcon style={{marginRight: '20px'}} icon={faUtensils} />
            </span>
            What's Cookin'?
          </Link>
        }
      </h2>
      <Searchbar onSubmitSearch={onSearch} placeholder="Search Recipes" />
      {renderNavLinks()}
    </header>
  );
};

export default withRouter(NavBar);
