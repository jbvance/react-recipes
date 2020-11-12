import React from 'react';
import { Link } from 'react-router-dom';

const Hyperlink = ({ text, to }) => (
  <Link
    to={to}
    className="font-medium focus:outline-none focus:underline transition ease-in-out duration-150"
  >
    {text}
  </Link>
);

export default Hyperlink;
