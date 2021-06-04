import React, { Component } from 'react';
import AddressStrip from './addressStrip';

class Addresses extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedAddress: {}
    }
  }

  handleSelection = (addressObject) => {
    this.setState({
      selectedAddress: addressObject
    })
  }

  changeAddress = () => {
    this.props.changeSelectedAddress(this.state.selectedAddress);
    this.props.handleDefault();
  }

  render() {
    const { addresses, handleDefault, handleAdd, deleteAddress, handleChange } = this.props;
    return (
      <>
        <div className="center"><button className="btn grey darken-4" onClick={() => handleAdd()}>ADD NEW ADDRESS</button></div>
        <form>
          <h4>Saved addresses</h4>
          {addresses.map((address) => <AddressStrip key={address._id} address={address} handleDefault={handleDefault} handleAdd={handleAdd} deleteAddress={deleteAddress} handleChange={handleChange} selectedAddress={this.state.selectedAddress} handleSelection={this.handleSelection} />)}
        </form>
        <button onClick={this.changeAddress} className="btn grey darken-4" style={{ marginTop: '20px' }}>CONFIRM</button>
      </>
    );
  }
}

export default Addresses