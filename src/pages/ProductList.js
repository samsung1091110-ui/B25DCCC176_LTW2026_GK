import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onDelete, onUpdateStock }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const location = useLocation();
  const routeMessage = location.state?.message || '';
  const [message, setMessage] = useState(routeMessage);

  useEffect(() => {
    setMessage(routeMessage);

    if (!routeMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setMessage(''), 3000);

    return () => window.clearTimeout(timeoutId);
  }, [routeMessage, location.key]);

  const handleQueryShift = (event) => setQuery(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleDismissMessage = () => setMessage('');

  const filteredProducts = products.filter(({ name, category: productCategory }) => {
    const matchesQuery = name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    const matchesCategory = category === 'Tất cả' || productCategory === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section>
      <h1>Danh sách sản phẩm</h1>
      {message && (
        <div className="notice" role="status" aria-live="polite">
          <p>{message}</p>
          <button type="button" onClick={handleDismissMessage} aria-label="Đóng thông báo">
            ×
          </button>
        </div>
      )}
      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />
      <p className="product-count">Tìm thấy {filteredProducts.length} sản phẩm</p>
      <ProductTable
        products={filteredProducts}
        onDelete={onDelete}
        onUpdateStock={onUpdateStock}
      />
    </section>
  );
};

export default ProductList;
