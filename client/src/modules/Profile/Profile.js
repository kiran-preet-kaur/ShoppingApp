import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Profile = props => {
  const { user } = props;
  if (!user) {
    return <Redirect to='/login' />
  }
  return (
    <>
      Hello, {user.name}
      <ul className="collection">
        <li className="collection-item"><Link to="/orders"> Orders</Link></li>
        <li className="collection-item">Contact Us</li>
        <li className="collection-item">NewsLetter</li>
        <li className="collection-item">Help</li>
      </ul>
    </>
  );
};

export default Profile
