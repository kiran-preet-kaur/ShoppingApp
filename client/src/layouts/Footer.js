import React from 'react';

const Footer = props => {
  //const { } = props;
  return (
    <>
      <footer className="page-footer grey darken-4">
        <div className="container">
          <div >
            <div className="col l6 s12">
              <h5 className="white-text">ArtsyStore</h5>
            </div>
            <div className="col l4 offset-l2 s12">
              <a href="https://instagram.com" className="container grey-text text-lighten-3"><i className="fab fa-instagram" style={{ margin: '20px' }}></i></a>
              <a href="https://facebook.com" className="container grey-text text-lighten-3"><i className="fab fa-facebook-square" style={{ margin: '20px' }}></i></a>
              <a href="https://twitter.com" className="container grey-text text-lighten-3"><i className="fab fa-twitter" style={{ margin: '20px' }}></i></a>
              <a href="https://youtube.com" className="container grey-text text-lighten-3"><i className="fab fa-youtube" style={{ margin: '20px' }}></i></a>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Footer;