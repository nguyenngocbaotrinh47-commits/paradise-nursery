import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <div>
          <a href="/" style={{ marginRight: '15px' }}>Home</a>
          <a href="#" onClick={onContinueShopping}>Plants</a>
        </div>
        <div>
          Cart ({totalItems})
        </div>
      </nav>

      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${totalAmount}</h3>

      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.price}</p>
              <p>Total for item: ${item.price * item.quantity}</p>
            </div>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.name)}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping} style={{ marginRight: '10px' }}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
