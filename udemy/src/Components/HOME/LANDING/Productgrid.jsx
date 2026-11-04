import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useCart } from "react-use-cart";
import { showLoginRequired, showSuccess } from "../../../utils/alerts";
import "./productgrid.css";

const Productgrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isloggedin") === "true";

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=12")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      showLoginRequired(navigate);
      return;
    }

    addItem(product);
    showSuccess(`${product.title} added to cart`);
  };

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-eyebrow">Trending now</span>
            <h2>Featured products</h2>
            <p>Hand-picked tech that our customers keep coming back for.</p>
          </div>
          <NavLink to="/shop" className="view-all-link">
            View all products <ArrowForwardIcon fontSize="small" />
          </NavLink>
        </div>

        {loading && (
          <div className="product-skeletons">
            {[1, 2, 3, 4].map((item) => (
              <div className="product-skeleton" key={item} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="products-error">
            <h3>We couldn&apos;t load the featured products</h3>
            <p>Check your connection, or browse the full collection instead.</p>
            <Button variant="contained" onClick={() => navigate("/shop")}>
              Go to shop
            </Button>
          </div>
        )}
{!loading && !error && (
  <Swiper
    slidesPerView={4}
    spaceBetween={24}
    loop={products.length > 4}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    navigation={true}
    modules={[Autoplay, Navigation]}
    breakpoints={{
      0: {
        slidesPerView: 1.15,
        spaceBetween: 16,
      },
      550: {
        slidesPerView: 2.1,
        spaceBetween: 16,
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1150: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    }}
    className="featured-swiper"
  >
    {products.map((product) => (
      <SwiperSlide key={product.id}>
        <article className="product-card">

          <div className="product-media">
            <img
              src={product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="product-body">
            <span className="product-category">
              {product.category}
            </span>

            <h3 className="product-title">
              {product.title}
            </h3>

            <div className="product-rating">
              <StarIcon />
              <span className="rating-value">
                {product.rating}
              </span>
              <span>
                ({product.stock} in stock)
              </span>
            </div>

            <div className="product-footer">
              <span className="product-price">
                ${product.price}
              </span>

              <Button
                size="small"
                variant="contained"
                className="product-add"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </div>

        </article>
      </SwiperSlide>
    ))}
  </Swiper>
)}
      </div>
    </section>
  );
};

export default Productgrid;
