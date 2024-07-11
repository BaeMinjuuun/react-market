import MainPage from "./main";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductPage from "./product";
import UploadPage from "./upload";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function App() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/upload");
  };

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" />
          </Link>
          <Button
            size="small"
            onClick={() => {
              onClick();
            }}
            icon={<UploadOutlined />}
          >
            상품 업로드
          </Button>
        </div>
      </div>
      <div id="body">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
