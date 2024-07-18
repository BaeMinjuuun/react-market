import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import "./index.css";
import { API_URL } from "../config/constants";
import { format } from "date-fns";
import { formatNumber } from "../util/FormatNumber";
import { Button, message } from "antd";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  if (product === null) {
    return <h1>상품 로딩중...</h1>;
  }

  const formatDate = format(product.createdAt, "yyyy년 MM월 dd일");

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{formatNumber(product.price)}원</div>
        <div id="createdAt">{formatDate}</div>
        <Button
          id="purchase-button"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
};

export default ProductPage;
