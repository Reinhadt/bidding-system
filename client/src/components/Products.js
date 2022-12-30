import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const Products = () => {
  const socket = useContext(SocketContext)
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBidBtn = ({ name, price }) =>
    navigate(`/products/bid/${name}/${price}`);

  const fetchProducts = () => {
    fetch("http://localhost:4000/api")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("bidProductResponse", (data) => {
      fetchProducts();
    });
    socket.on("addProductResponse", (data) => {
      fetchProducts();
    });

    return () => {
      socket.off('bidProductResponse')
      socket.off('addProductResponse')
    }

  },[socket])

  return (
    <div>
      <div className="table__container">
        <Link to="/products/add" className="products__cta">
          Add Products
        </Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={`${product.name}${product.price}`}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.owner}</td>
                  <td>
                    <button onClick={() => handleBidBtn(product)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
