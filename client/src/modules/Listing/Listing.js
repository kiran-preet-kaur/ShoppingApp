import React, { Component } from 'react';
import Loader from '../../layouts/Loader';
import ListItem from './ListItem';

class Listing extends Component {
    constructor() {
        super();
        this.state = { loader: true }
    }

    componentDidMount() {
        const category = this.props.match.params.category || '';

        this.props.getProducts(category);
    }

    componentDidUpdate(prevProps, prevState) {
        let category = this.props.match.params.category || '';
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.props.getProducts(category);
        }
    }

    render() {
        const { products } = this.props;
        if (products) {
            return <div className="row"><h2 className="col s12 white text-black center" style={{ marginTop: 0, textTransform: 'uppercase' }}>{this.props.match.params.category || 'ALL'}</h2>
                {products.map((product) => <ListItem product={product} />)}
            </div>
        }
        return (
            this.state.loader ? <Loader /> :
                <div>{products}</div>
        );
    }
}


export default Listing