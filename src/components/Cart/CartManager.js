import React from 'react';
import CartContext from '../../context/CartContext';

class CartManager extends React.Component {
  state = {
    items: [],
    total: 0
  };

  add = item => {
    console.log('Current cart:');
    console.log(this.state);
    console.log(`Adding ${item.id} to cart`);
    this.setState(
      {
        items: [...this.state.items, item],
        total: Math.round((this.state.total + item.price) * 100) / 100
      },
      () => {
        setTimeout(() => {
          console.log('Updated cart:');
          console.log(this.state);
        }, 300);
      }
    );
  };

  remove = item => {
    console.log('Current cart:');
    console.log(this.state);
    const index = this.isOnCart(item);
    if (index > -1) {
      const removed = this.state.items.splice(index, 1);
      console.log(`Removing ${item.id} from cart`);
      this.setState(
        {
          items: [...this.state.items],
          total: Math.round((this.state.total - item.price) * 100) / 100
        },
        () => {
          setTimeout(() => {
            console.log('Updated cart:');
            console.log(this.state);
          }, 300);
        }
      );
    } else {
      console.log('Item not on cart!');
    }
  };

  isOnCart = item => {
    return this.state.items.findIndex(element => element.id === item.id);
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          add: this.add,
          remove: this.remove,
          isOnCart: this.isOnCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartManager;
