import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from '../MainPage';
import CartPage from '../CartPage';
import './app.css';
import Product from "../Product";
import CartContext from '../../contexts/cartContext';
import { useState } from "react";

const App = () => {

  const defaultCartState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
  const [cartItems, setCartItems] = useState(defaultCartState);

  return <Router>
    <Routes>
      <Route
        path="/"
        exact
        element={
          <CartContext.Provider value={{ cartItems, setCartItems }}>
            <MainPage />
          </CartContext.Provider>
        }
      />
      <Route
        path="/cart"
        exact
        element={
          <CartContext.Provider value={{ cartItems, setCartItems }}>
            <CartPage />
          </CartContext.Provider>
        }
      />
      <Route
        path="/products/:id"
        exact
        element={<Product />}
      />
    </Routes>
  </Router>
}

export default App;