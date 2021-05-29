import React, { Component } from 'react';

class AddressStrip extends Component {
  constructor(...args) {
    super(...args);
  }

  handleRemove = () => {
    this.props.deleteAddress(this.props.address._id);
    this.props.handleChange();
  }

  handleEdit = () => {
    this.props.handleAdd(this.props.address);
  }

  render() {
    const { address, selectedAddress, handleSelection } = this.props;
    return (
      <label>
        <input name="address" type="radio" value={address} checked={selectedAddress === address}
          onChange={() => handleSelection(address)} />
        <div className="row">
          <div className="col s12">{address.name}</div>
          <div className="col s12">{address.address}</div>
          <div className="col s12">{address.city}, {address.state}</div>
          <div className="col s12">Mobile: {address.phone}</div>
        </div>
        <button onClick={this.handleRemove}>REMOVE</button>
        <button onClick={this.handleEdit}>EDIT</button>
      </label>
    );
  }
}


export default AddressStrip