import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router";
import { useProducts } from "../../Context/ProductsContextProvider";
import useQuery from "../../Hooks/useQuery";
import styles from "./ProductScreen.Module.scss";

export const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { wishlist, toggleFavProduct, addToBasket } = useProducts();
  const { data, loading } = useQuery({
    url: `/api/products/product/${id}`,
    method: "GET",
  });

  useEffect(() => {
    if (loading === false) {
      setProduct(data[0]);
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      <div className={styles.imageswrapper}>
        {product?.images.map((image, index) => {
          return <img src={image} alt="" key={index} />;
        })}
      </div>
      <div className={styles.productinfo}>
        <div className={styles.productinfowrapper}>
          <div className={styles.top}>
            <div className={styles.nameicon}>
              <p className={styles.name}>{product?.name}</p>
              <i
                className={styles.iconwrapper}
                onClick={() => toggleFavProduct(product?.id)}
              >
                {wishlist.includes(id) ? (
                  <AiFillHeart style={{ color: "red" }} />
                ) : (
                  <AiOutlineHeart />
                )}
              </i>
            </div>
            <p className={styles.price}>{product?.price}€</p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.imagewrapper}>
              <img src={product?.images[0]} alt="" />
            </div>
            <div className={styles.description}>{product?.description}</div>
            <button className={styles.button} onClick={() => addToBasket(id)}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
