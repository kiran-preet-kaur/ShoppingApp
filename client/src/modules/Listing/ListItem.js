import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ product }) => {
  const { _id, name, price, image } = product;
  return (
    <Link to={`/product/${_id}`}>
      <div className="col l3 s6 center black-text" style={{ padding: '10px' }}>
        <img src={image} alt={name} height="150px" width="150px" />
        <div>{name}</div>
        <div>₹ {price}</div>
      </div>
    </Link>
  );
};

export default ListItem;