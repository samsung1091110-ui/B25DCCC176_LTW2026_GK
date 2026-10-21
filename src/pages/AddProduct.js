import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Văn phòng phẩm');
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value === '' ? null : Number(value));
  };
  const handleStockChange = (event) => {
    const value = event.target.value;
    setStock(value === '' ? null : Number(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !category || price === null || stock === null) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
      setErrorMessage('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const productName = name.trim();
    onAdd({ name: productName, category, price, stock });
    navigate('/products', {
      replace: true,
      state: { message: `Đã thêm sản phẩm ${productName}` }
    });
  };

  return (
    <section>
      <h1>Thêm sản phẩm</h1>
      <form className="form-product" onSubmit={handleSubmit}>
        <label className="form-field" htmlFor="product-name">
          Tên sản phẩm
          <input id="product-name" type="text" value={name} onChange={handleNameChange} />
        </label>
        <label className="form-field" htmlFor="product-category">
          Danh mục
          <select id="product-category" value={category} onChange={handleCategoryChange}>
            {CATEGORIES.map((categoryName) => (
              <option key={categoryName} value={categoryName}>{categoryName}</option>
            ))}
          </select>
        </label>
        <label className="form-field" htmlFor="product-price">
          Giá
          <input
            id="product-price"
            type="number"
            step="any"
            value={price ?? ''}
            onChange={handlePriceChange}
          />
        </label>
        <label className="form-field" htmlFor="product-stock">
          Số lượng tồn
          <input
            id="product-stock"
            type="number"
            step="any"
            value={stock ?? ''}
            onChange={handleStockChange}
          />
        </label>
        <button type="submit">Thêm</button>
        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default AddProduct;
