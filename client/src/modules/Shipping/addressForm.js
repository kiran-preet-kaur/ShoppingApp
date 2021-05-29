import React, { Component } from 'react';

class addressForm extends Component {
  constructor(...args) {
    super(...args);
    this.changeAddress = false
    if (this.props.addressObject && this.props.addressObject != "") {
      this.changeAddress = true;
    }
    this.state = {
      name: this.changeAddress ? this.props.addressObject.name : "",
      address: this.changeAddress ? this.props.addressObject.address : "",
      phone: this.changeAddress ? this.props.addressObject.phone : "",
      pinCode: this.changeAddress ? this.props.addressObject.pinCode : "",
      city: this.changeAddress ? this.props.addressObject.city : "",
      state: this.changeAddress ? this.props.addressObject.state : "",
      addressType: this.changeAddress ? this.props.addressObject.addressType : ""
    }
  }

  setName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  setPhone = (event) => {
    this.setState({
      phone: event.target.value
    })
  }

  setPin = (event) => {
    this.setState({
      pinCode: event.target.value
    })
  }

  setAddress = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  setCity = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  addState = (event) => {
    this.setState({
      state: event.target.value
    })
  }

  handleTypeChange = (event) => {
    this.setState({
      addressType: event.target.value
    })
  }

  handleAddressSubmit = () => {
    this.changeAddress ? this.props.updateAddress(this.props.addressObject._id, this.state.name, this.state.phone, this.state.pinCode, this.state.address, this.state.city, this.state.state, this.state.addressType) : this.props.addAddress(this.state.name, this.state.phone, this.state.pinCode, this.state.address, this.state.city, this.state.state, this.state.addressType);
    this.props.handleDefault();
  }

  render() {
    const { } = this.props;
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleAddressSubmit}>
          <div>Contact details</div>
          <div className="row">
            <div className="input-field col s12">
              <input id="name" type="text" value={this.state.name} className="validate" onChange={this.setName} />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="phone" type="number" value={this.state.phone} className="validate" onChange={this.setPhone} />
              <label htmlFor="phone">Phone Number</label>
            </div>
          </div>
          <div>Address</div>
          <div className="row">
            <div className="input-field col s12">
              <input id="pin" type="number" value={this.state.pinCode} className="validate" onChange={this.setPin} />
              <label htmlFor="pin">Pin Code</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="address" type="text" value={this.state.address} className="validate" onChange={this.setAddress} />
              <label htmlFor="address">Address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="city" type="text" value={this.state.city} className="validate" onChange={this.setCity} />
              <label htmlFor="city">City</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="state" type="text" value={this.state.state} className="validate" onChange={this.addState} />
              <label htmlFor="state">State</label>
            </div>
          </div>
          <div>Save address as</div>
          <div>
            <p>
              <label>
                <input name="addressType" type="radio" value="Home" className="with-gap" checked={this.state.addressType === "Home"}
                  onChange={this.handleTypeChange} />
                <span>Home</span>
              </label>
            </p>
            <p>
              <label>
                <input className="with-gap" name="addressType" value="Work" type="radio" checked={this.state.addressType === "Work"}
                  onChange={this.handleTypeChange} />
                <span>Work</span>
              </label>
            </p>
          </div>
          <button className="btn grey darken-4" type="submit"> Add address </button>
        </form>
      </div>
    );
  }
}


export default addressForm