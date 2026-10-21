import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filters">
    <label htmlFor="product-search">
      Tìm kiếm
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={onQueryChange}
        placeholder="Tìm kiếm theo tên sản phẩm"
      />
    </label>
    <label htmlFor="product-category-filter">
      Danh mục
      <select id="product-category-filter" value={category} onChange={onCategoryChange}>
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((categoryName) => (
          <option key={categoryName} value={categoryName}>{categoryName}</option>
        ))}
      </select>
    </label>
  </div>
);

export default FilterBar;
