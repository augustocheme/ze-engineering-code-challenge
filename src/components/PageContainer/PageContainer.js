import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './PageContainer.scss';
import CartManager from '../Cart/CartManager';
import CartMenu from '../Cart/CartMenu/CartMenu';

const PageContainer = ({ children }) => {
  return (
    <CartManager>
      <CartMenu />
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </CartManager>
  );
};

export default PageContainer;
