import React, { useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './../context/AuthContext';

export const NavBar = () => {
  const auth = useContext(AuthContext);  
  const loggedIn = auth.isAuthenticated();  

  const renderNavLinks = (props) => {
    return (
      <div className="main-nav">
        <div className="main-nav__link">{loggedIn && <AvatarDropdown />}</div>
        <div className="main-nav__link">
          {' '}
          {
            <Link to="/">
              <span>
                <i className="fas fa-file-signature app-icon"></i>
              </span>
              EstateDox
            </Link>
          }
        </div>
        {!loggedIn && <Link to="/signup">Signup</Link>}
        {!loggedIn && <Link to="/signin">Sign In</Link>}
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
      {renderNavLinks()}
    </header>
  );
};

export default NavBar;
