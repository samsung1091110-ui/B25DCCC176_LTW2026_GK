const BUILD_TAG = "kt-6641";

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const errorRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      const savedProducts = window.localStorage.getItem('gk_products');

      if (savedProducts !== null) {
        try {
          const parsedProducts = JSON.parse(savedProducts);

          if (!Array.isArray(parsedProducts)) {
            throw new Error('Invalid products');
          }

          setProducts(parsedProducts);
        } catch {
          errorRef.current = true;
          setError(true);
        }

        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/data/products.json', {
          signal: controller.signal
        });
        setProducts(response.data);
      } catch (loadError) {
        if (!axios.isCancel(loadError)) {
          errorRef.current = true;
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !errorRef.current) {
      window.localStorage.setItem('gk_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (newProduct) => {
    const newId = products.reduce((largestId, { id }) => Math.max(largestId, id), 0) + 1;
    setProducts((currentProducts) => [...currentProducts, { ...newProduct, id: newId }]);
  };

  const deleteProduct = (productId) => {
    setProducts((currentProducts) => currentProducts.filter(({ id }) => id !== productId));
  };

  const updateProductStock = (productId, amount) => {
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === productId
        ? { ...product, stock: product.stock + amount }
        : product
    )));
  };

  const showPage = (page) => {
    if (error) {
      return <p>Không tải được dữ liệu</p>;
    }

    if (loading) {
      return <p>Đang tải...</p>;
    }

    return page;
  };

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={showPage(<Home products={products} />)} />
          <Route
            path="products"
            element={showPage(
              <ProductList
                products={products}
                onDelete={deleteProduct}
                onUpdateStock={updateProductStock}
              />
            )}
          />
          <Route path="products/new" element={showPage(<AddProduct onAdd={addProduct} />)} />
          <Route path="products/:id" element={showPage(<ProductDetail products={products} />)} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
