import ProductRow from './ProductRow';

const ProductTable = ({ products, onDelete, onUpdateStock }) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="5">Không có dữ liệu</td>
          </tr>
        ) : products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={onDelete}
            onUpdateStock={onUpdateStock}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
