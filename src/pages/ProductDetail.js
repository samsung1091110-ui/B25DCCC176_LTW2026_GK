import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find(({ id: currentId }) => currentId === productId);
  const navigate = useNavigate();

  if (!product) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  const { name, category, price, stock } = product;

  return (
    <section>
      <h1>Chi tiết sản phẩm</h1>
      <div className="product-details">
        <p>Tên sản phẩm: {name}</p>
        <p>Danh mục: {category}</p>
        <p>Giá: {formatMoney(price)}</p>
        <p>Tồn kho: {stock}</p>
      </div>
      <button className="detail-back" type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  );
};

export default ProductDetail;
