import { formatMoney } from '../data';

const Home = ({ products }) => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter(({ stock }) => stock < 5).length;
  const inventoryValue = products.reduce((total, { price, stock }) => total + price * stock, 0);

  return (
    <section>
      <h1>Kho hàng</h1>
      <div className="statistics">
        <p>Tổng số sản phẩm: {totalProducts}</p>
        <p>Số sản phẩm sắp hết hàng: {lowStockProducts}</p>
        <p>Tổng giá trị kho: {formatMoney(inventoryValue)}</p>
      </div>
    </section>
  );
};

export default Home;
