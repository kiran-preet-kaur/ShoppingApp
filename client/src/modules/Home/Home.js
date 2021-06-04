import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
    //const { } = props;
    return (
        <>
            <div className="carousel carousel-slider center" style={{ minHeight: '80vh' }}>
                <Link to="/listing/Rings" className="carousel-item white-text" style={{ backgroundImage: `url(/images/pink-butterfly-ring.jpg)` }}>
                    <p className="white-text">Explore</p>
                    <h2>Rings</h2>
                </Link>
                <Link to="/listing/Decor" className="carousel-item white-text" style={{ backgroundImage: `url(/images/mini-canvas-painting.jpg)` }}>
                    <p className="white-text">Explore</p>
                    <h2>Decor</h2>

                </Link>
            </div>
        </>
    );
};



export default Home;