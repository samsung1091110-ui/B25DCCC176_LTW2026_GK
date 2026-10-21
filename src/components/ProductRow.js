import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onDelete, onUpdateStock }) => {
  const { id, name, category, price, stock } = product;

  return (
    <tr>
      <td><Link className="product-name" to={`/products/${id}`}>{name}</Link></td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td className={stock < 5 ? 'low-stock' : ''}>{stock}</td>
      <td>
        <div className="stock-actions">
          <button type="button" onClick={() => onUpdateStock(id, 1)} aria-label={`Nhập thêm ${name}`}>
            +
          </button>
          <button
            type="button"
            onClick={() => onUpdateStock(id, -1)}
            disabled={stock === 0}
            aria-label={`Bán ${name}`}
          >
            -
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => onDelete(id)}
            aria-label={`Xóa ${name}`}
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
