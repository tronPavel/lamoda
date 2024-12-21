import React from "react";
import "./styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <article className="product">
      <picture className="product__img">
        <img src={product.imageUrl} alt={product.name} />
      </picture>
      <div className="product__info">
        <h3>{product.name}</h3>
        <div className="product__description">
          <p>{product.description}</p>
        </div>
        <dl className="description__list">
          <dt>Цвет</dt> <dd>{product.color}</dd>
          <dt>Цeна</dt> <dd>{product.price}</dd>
          <dt>Рейтинг</dt> <dd>{product.rating}</dd>
        </dl>
      </div>
    </article>
  );
};
export default React.memo(ProductCard);
