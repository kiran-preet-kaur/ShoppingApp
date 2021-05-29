
import { Redirect } from 'react-router';
import axios from 'axios';
import AddressForm from './addressForm';
import Addresses from './addresses';

import React, { Component } from 'react';

class shipping extends Component {
  constructor(...args) {
    super(...args);
    this.state = { screen: "default", addressObject: '' }
  }
  componentDidMount() {
    this.props.getAddress();
  }

  handleDefault = () => {
    this.setState({ screen: "default" });
  }

  handleChange = () => {
    this.setState({ screen: "Change" });
  }

  handleAdd = (addressObject) => {
    this.setState({ screen: "Add", addressObject: addressObject })
  }
  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  showRazorPay = async () => {
    const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await axios({
      method: 'POST',
      url: '/api/orders',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      data: {
        totalPrice: this.props.totalPrice, status: 0, address: this.props.selectedAddress._id
      }
    })

    console.log(data)

    const options = {
      key: 'rzp_test_gDfZhUosqReZUz',
      currency: data.data.currency,
      amount: (data.data.totalPrice * 100).toString(),
      order_id: data.data.razorpayOrderID,
      name: 'Donation',
      description: 'Thank you for nothing. Please give us some money',
      image: '/logo192.png',
      handler: function (response) {
        this.props.emptyCart();
      },
      prefill: {
        name: this.props.user.name,
        email: this.props.user.email,
        phone_number: this.props.user.phone
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  render() {
    const { addresses, selectedAddress, addAddress, deleteAddress, updateAddress, changeSelectedAddress } = this.props;
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />
    }
    if (this.state.screen == "Change") {
      return <Addresses addresses={addresses} handleDefault={this.handleDefault} handleAdd={this.handleAdd} deleteAddress={deleteAddress} handleChange={this.state.handleChange} changeSelectedAddress={changeSelectedAddress} />
    } else if (this.state.screen == "Add") {
      return <AddressForm handleDefault={this.handleDefault} addressObject={this.state.addressObject} addAddress={addAddress} updateAddress={updateAddress} />
    }
    return (
      <>
        {addresses.length > 0 ?
          <>
            <h5>Shipping Address</h5>
            <div className="row">
              <div className="col s12" style={{ fontWeight: "bold" }}>{selectedAddress.name}</div>
              <div className="col s12">{selectedAddress.address}</div>
              <div className="col s12">{selectedAddress.city}, {selectedAddress.state}</div>
              <div className="col s12" style={{ marginTop: "2px", marginBottom: "2px" }}>Mobile: {selectedAddress.phone}</div>
              <button className="btn-small white black-text text-darken-2" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={this.handleChange}>CHANGE OR ADD ADDRESS</button>
            </div>
            <div className="center">
              <button className="btn black" style={{ marginTop: "20px" }} onClick={this.showRazorPay}>CONTINUE TO PAYMENT</button>
            </div>
          </>


          : <AddressForm handleDefault={this.handleDefault} addAddress={addAddress} />}

      </>
    );
  }
}

export default shipping;