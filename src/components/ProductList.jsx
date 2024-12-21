import React from "react";
import ProductCard from "./ProductCard";

import "./styles/ProductList.css";

const ProductList = ({ products, filterSettings, filterFunctions }) => {
  const sortedProducts = handleSort(products, filterSettings, filterFunctions);

  return (
    <>
      {sortedProducts.length ? (
        <ul className="products__list">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>По вашему запросу ничего не найдено</p>
      )}
    </>
  );
};

const handleSort = (products, filterSettings, filterFunctions) => {
  let sortedProducts = [...products];
  filterFunctions.forEach((func) => {
    sortedProducts = func(filterSettings, sortedProducts);
  });
  return sortedProducts;
};

export default ProductList;
