import React from 'react';

import './ProductCard.scss';
import CartContext from '../../context/CartContext';
import { renderPrice } from '../../helpers/renderPrice';

const ProductCard = ({ product }) => {
  const cartContext = React.useContext(CartContext);

  const item = {
    id: product.id,
    name: product.title,
    image: product.images[0].url,
    price: product.productVariants[0].price
  };

  return (
    <div className="product-card" key={item.id}>
      <p className="product-name">{item.name}</p>
      <div
        className="product-image"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="price-container">
        <p>Preço: </p>
        <p>{renderPrice(item.price, 'R$')}</p>
      </div>
      <div className="button-container">
        <button
          className="add-to-cart-button"
          onClick={() => cartContext.add(item)}
          disabled={cartContext.isOnCart(item) > -1}
        >
          Adicionar
        </button>
        {cartContext.isOnCart(item) > -1 && (
          <button
            className="remove-from-cart-button"
            onClick={() => cartContext.remove(item)}
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
