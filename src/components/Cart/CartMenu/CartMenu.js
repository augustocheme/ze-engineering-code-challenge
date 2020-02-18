import React from 'react';

import './CartMenu.scss';

import {
  listenCustomEvent,
  unlistenCustomEvent
} from '../../../helpers/customEvent';
import CartContext from '../../../context/CartContext';
import { renderPrice } from '../../../helpers/renderPrice';

const CartMenu = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleIsVisible = React.useCallback(function toggleIsVisible() {
    setIsVisible(prevIsVisible => !prevIsVisible);
  }, []);

  React.useEffect(() => {
    listenCustomEvent('open-cart-menu', toggleIsVisible);

    return () => {
      unlistenCustomEvent('open-cart-menu', toggleIsVisible);
    };
  }, []);

  const cartContext = React.useContext(CartContext);

  return (
    <>
      <div className={'overlay' + (isVisible ? ' is-visible' : '')} />
      <div className={'cart-menu' + (isVisible ? ' is-visible' : '')}>
        <div className="cart-header">
          <p className="cart-title">Meu Carrinho</p>
          <p className="close-cart-button" onClick={() => toggleIsVisible()}>
            Fechar Carrinho
          </p>
        </div>
        <div className="cart-content">
          {cartContext.items.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <div className="cart-item-image-container">
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className="cart-item-image"
                  />
                </div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">
                  Valor: {renderPrice(item.price, 'R$')}
                </p>
                <img
                  className="cart-item-remove"
                  src="https://storage.googleapis.com/optimus-static-dev/BY_CART/icon-trash.png"
                  onClick={() => cartContext.remove(item)}
                />
              </div>
            );
          })}
        </div>
        <div className="cart-footer">
          <p>Total: </p>
          <p>{renderPrice(cartContext.total, 'R$')}</p>
        </div>
      </div>
    </>
  );
};

export default CartMenu;
