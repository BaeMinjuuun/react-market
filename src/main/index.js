import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";
import { formatNumber } from "../util/FormatNumber";
import { Carousel } from "antd";
dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        const products = result.data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
        console.log("banners", banners);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headLine">판매되는 상품들</h1>
      <div id="product-list">
        {products.map((products, index) => {
          return (
            <div className="product-card">
              {products.soldout === 1 && <div className="product-blur" />}
              <Link className="product-link" to={`/products/${products.id}`}>
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${products.imageUrl}`}
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{products.name}</span>
                  <span className="product-price">
                    {formatNumber(products.price)}원
                  </span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{products.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(products.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
