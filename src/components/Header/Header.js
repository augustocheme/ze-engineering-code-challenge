import React from 'react';
import { dispatchCustomEvent } from '../../helpers/customEvent';

import './Header.scss';

const Header = () => {
  const handleCartClick = () => {
    dispatchCustomEvent('open-cart-menu');
  };

  return (
    <div className="header">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      <p className="open-carrinho-button" onClick={() => handleCartClick()}>
        Ver carrinho
      </p>
    </div>
  );
};

export default Header;
