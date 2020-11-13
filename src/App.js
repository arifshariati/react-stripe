import React, { useState, useEffect, Fragment } from "react";
import "./App.css";

//components
import { ProductCard, ProductTable, ProductAlert, Chips } from "./components";
//firebase
import db from "./firebase";

function App() {
  const [products, setProducts] = useState([
    {
      name: "Altra Superior 3.5 Trail Running Shoe",
      description:
        "The Brooks Ghost 12 is an excellent neutral running shoe, offering the foot more freedom to move compared to a stability style of shoe.",
      image: "/product1.png",
      price: 21,
    },
    {
      name: "Inov-8 Roadclaw 275 V2 Road Running Shoe",
      description:
        "The Brooks Ghost 12 has a 12mm heel to toe drop, making it a great choice for someone with a medium to higher arch.",
      image: "/product2.png",
      price: 49,
    },
    {
      name: "Hoka One One Clifton 6 Road Running Shoe",
      description:
        "Hoka One One is an excellent, newer brand creating shoes for all kinds of activities and fitness levels.",
      image: "/product3.png",
      price: 68,
    },
    {
      name: "Brooks Ghost 12 Road Running Shoe",
      description:
        "The Superior is another great, wide toe box shoe by Altra. The Superior is designed specifically for trail running.",
      image: "/product4.png",
      price: 109,
    },
  ]);
  const [productTable, setProductTable] = useState([]);

  useEffect(() => {
    db.collection("purchase").onSnapshot((snapshot) =>
      setProductTable(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <div className="appHeader__top">
          <img src="/stripe-logo.png" alt="Stripe Logo" />
          <h1>React Stripe Payment Demo</h1>
        </div>
        <div className="appHeader__bottom">
          <Chips />
        </div>
      </div>
      <div className="app__productCardList">
        {products.length === 0 ? (
          <ProductAlert
            msg="Your Cart is Empty! Please Add Products to Card"
            type="error"
          />
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>

      <div className="app__productTable">
        {productTable.length === 0 ? (
          <ProductAlert msg="No Product Payment Processed!" type="info" />
        ) : (
          <Fragment>
            <h1>Transaction Details</h1>
            <span>
              <small>
                a dashboard view of Firebase Realtime Database - Purchases
                Records
              </small>
            </span>
            <ProductTable tableData={productTable} />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
