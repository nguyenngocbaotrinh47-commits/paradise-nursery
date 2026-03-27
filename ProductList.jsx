import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsData = [
  { category: 'Air Purifying', name: 'Snake Plant', price: 15, image: 'snake-plant.jpg' },
  { category: 'Air Purifying', name: 'Spider Plant', price: 12, image: 'spider-plant.jpg' },
  { category: 'Succulents', name: 'Aloe Vera', price: 10, image: 'aloe-vera.jpg' },
  { category: 'Succulents', name: 'Echeveria', price: 8, image: 'echeveria.jpg' },
  { category: 'Indoor Trees', name: 'Fiddle Leaf Fig', price: 25, image: 'fiddle-leaf.jpg' },
  { category: 'Indoor Trees', name: 'Rubber Plant', price: 20, image: 'rubber-plant.jpg' }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#e0e0e0' }}>
        <div>
          <a href="/" style={{ marginRight: '15px' }}>Home</a>
          <a href="#" onClick={() => setShowCart(false)}>Plants</a>
        </div>
        <div onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
          Cart ({totalItems})
        </div>
      </nav>

      <h2>Our Plants</h2>
      <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {plantsData.map((plant, index) => (
          <div key={index} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', width: '200px' }}>
            <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{plant.name}</h3>
            <p>Category: {plant.category}</p>
            <p>${plant.price}</p>
            <button 
              onClick={() => handleAddToCart(plant)} 
              disabled={isAddedToCart(plant.name)}
            >
              {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
