import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AddToCart from '../Cart/addToCartContainer';

const Product = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('/api/products/' + id);
            setProduct(res.data);
        }
        fetchData();
        // eslint-disable-next-line
    }, [])
    return (
        product && <div className="row">
            <div className="col s12 l5"><img src={product.image} width="300px" height="300px" /></div>
            <div className="col s12 l7">
                <h1 style={{ fontSize: '35px' }}>{product.name}</h1>
                <div style={{ fontSize: '20px' }}>₹ {product.price}</div>
                <AddToCart productID={product._id} />
                <h5>Description</h5>
                <div style={{ whiteSpace: "pre-line", marginTop: "5px" }}>{product.description}</div>
            </div>
        </div>
    );
}


export default Product;