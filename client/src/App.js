import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import BidProduct from "./components/BidProduct";
import Products from "./components/Products";
import Nav from "./components/Nav";
import { SocketProvider } from "./providers/SocketProvider";
// import socketIO from "socket.io-client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <Router>
      <div>
        <SocketProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/add"
              element={<AddProduct />}
            />
            <Route
              path="/products/bid/:name/:price"
              element={<BidProduct />}
            />
          </Routes>
        </SocketProvider>
      </div>
    </Router>
  );
}

export default App;
