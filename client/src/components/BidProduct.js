import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../context/socketContext';

const BidProduct = () => {
  const socket = useContext(SocketContext)
  const {name, price} = useParams()

  const [userInput, setUserInput] = useState(price);
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userInput > Number(price)){
      socket.emit('bidProduct', {
        amount: userInput,
        last_bidder: localStorage.getItem('username'),
        name
      })
      navigate('/products');
    }else{
      setError(true)
    }
  };

  return (
    <div>
      <div className="bidproduct__container">
        <h2>Place a Bid</h2>
        <form className="bidProduct__form" onSubmit={handleSubmit}>
          <h3 className="bidProduct__name">Product Name</h3>

          <label htmlFor="amount">Bidding Amount</label>
          
          {error && (
            <p style={{color:'red'}}>The bidding amout must be greather than ${price}</p>
          )}
          <input
            type="number"
            name="amount"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />

          <button className="bidProduct__cta">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default BidProduct;