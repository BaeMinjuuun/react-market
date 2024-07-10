import "./index.css";
import axios from "axios";
import React from "react";

function MainPage() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://c0dde415-9a89-4b01-bb79-328eb85aca7d.mock.pstmn.io/products"
      )
      .then((result) => {
        const products = result.data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {products.map((products, index) => {
            return (
              <div className="product-card">
                <div>
                  <img className="product-img" src={products.imageUrl} />
                </div>
                <div className="product-contents">
                  <span className="product-name">{products.name}</span>
                  <span className="product-price">{products.price}원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/avatar.png"
                    />
                    <span>{products.seller}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPage;
