import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import "./index.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        `https://c0dde415-9a89-4b01-bb79-328eb85aca7d.mock.pstmn.io/products/${id}`
      )
      .then((result) => {
        setProduct(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 로딩중...</h1>;
  }

  return (
    <div>
      <div id="image-box">
        <img src={"/" + product.imageUrl} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="createdAt">2024년 7월 11일</div>
        <div id="description">{product.description}</div>
      </div>
    </div>
  );
};

export default ProductPage;
