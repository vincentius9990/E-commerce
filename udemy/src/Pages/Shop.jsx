import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import StaticPage from "../Components/Static/StaticPage";
import { showLoginRequired, showSuccess } from "../utils/alerts";

const products = [
  {
    id: "watch-ultra-2",
    title: "Apple Watch Ultra 2",
    category: "Smart Watch",
    price: 799,
    rating: 4.9,
    stock: 14,
    description:
      "Rugged titanium case, bright always-on display and precision GPS for the toughest adventures.",
    image: "/IMAGES/apple-watch-ultra-2-7.webp",
    thumbnail: "/IMAGES/apple-watch-ultra-2-7.webp",
    discountPercentage: 0,
  },
  {
    id: "watch-snapdragon",
    title: "Snapdragon Wear Pro",
    category: "Smart Watch",
    price: 499,
    rating: 4.7,
    stock: 21,
    description:
      "A dedicated wearable chip powers smooth apps, calls and health tracking all day long.",
    image: "/IMAGES/qualcomm-snapdragon-w5.webp",
    thumbnail: "/IMAGES/qualcomm-snapdragon-w5.webp",
    discountPercentage: 0,
  },
  {
    id: "watch-endurance",
    title: "Endurance GPS Watch",
    category: "Fitness",
    price: 349,
    rating: 4.6,
    stock: 32,
    description:
      "Multi-band GPS and up to 36 hours of battery life for long runs and weekends off-grid.",
    image: "/IMAGES/Smart-Watch-Battery-Saving-Tips-Gear.jpg",
    thumbnail: "/IMAGES/Smart-Watch-Battery-Saving-Tips-Gear.jpg",
    discountPercentage: 0,
  },
  {
    id: "watch-nova",
    title: "Nova Everyday Watch",
    category: "Smart Watch",
    price: 279,
    rating: 4.5,
    stock: 40,
    description:
      "A slim, lightweight watch with a crisp display and all the essentials for everyday wear.",
    image: "/IMAGES/discover.webp",
    thumbnail: "/IMAGES/discover.webp",
    discountPercentage: 0,
  },
  {
    id: "band-pulse",
    title: "Pulse Fitness Band",
    category: "Fitness",
    price: 129,
    rating: 4.4,
    stock: 58,
    description:
      "Track heart rate, sleep and 100+ workouts with a comfortable band that lasts a week.",
    image: "/IMAGES/batterylife.jpg",
    thumbnail: "/IMAGES/batterylife.jpg",
    discountPercentage: 0,
  },
  {
    id: "strap-titanium",
    title: "Titanium Sport Strap",
    category: "Accessories",
    price: 59,
    rating: 4.8,
    stock: 76,
    description:
      "Aerospace-grade titanium links with a secure clasp — built to outlast every workout.",
    image: "/IMAGES/buildquality.jpg",
    thumbnail: "/IMAGES/buildquality.jpg",
    discountPercentage: 0,
  },
];

const Shop = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isloggedin") === "true";

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      showLoginRequired(navigate);
      return;
    }

    addItem(product);
    showSuccess(`${product.title} added to cart`);
  };

  return (
    <StaticPage
      eyebrow="Shop Now"
      title="The future of tech is here"
      subtitle="Explore our hand-picked collection of smart watches, fitness bands, and accessories built for everyday life."
      icon={<StorefrontIcon />}
    >
      <div className="shop-toolbar">
        <h2>Featured products</h2>
        <div className="shop-chip-row">
          <span className="shop-chip">Smart Watches</span>
          <span className="shop-chip">Fitness</span>
          <span className="shop-chip">Accessories</span>
        </div>
      </div>

      <div className="shop-grid">
        {products.map((product) => (
          <article className="shop-card" key={product.id}>
            <div className="shop-card-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="shop-card-body">
              <span className="shop-category">{product.category}</span>
              <h3>{product.title}</h3>
              <div className="shop-rating">
                <StarIcon />
                <span>{product.rating}</span>
                <span className="shop-stock">({product.stock} in stock)</span>
              </div>
              <p className="shop-description">{product.description}</p>
              <div className="shop-card-footer">
                <span className="shop-price">${product.price}</span>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </StaticPage>
  );
};

export default Shop;
