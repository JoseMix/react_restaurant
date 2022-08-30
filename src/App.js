import Header from "./components/Layout/Header.jsx";
import { useState } from "react";
import Meals from "./components/Meals/Meals.jsx";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider.jsx";
function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };
  return (
    <CartProvider>
      {cartIsShow && <Cart OnCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
