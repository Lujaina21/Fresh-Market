import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// fontawesome
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
//Slick Slider React
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//flowbite
import "flowbite-react";
import "./index.css";
import App from "./App.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <Provider store={store}>
      <CartContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartContextProvider>
    </Provider>
  </TokenContextProvider>
);
