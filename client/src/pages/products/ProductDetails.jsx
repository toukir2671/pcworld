import "./products.scss";
import { Link, useParams } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Loader from "../../components/loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Thumbs,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { selectIsLoggedIn, selectUserId } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const detailParams = useParams();
  const productCollection = useFirestoreCollection("products");

  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const filteredProduct = productCollection.data?.filter(
    (product) => product.id === detailParams.id
  );

  return (
    <>
      {productCollection.isLoading && <Loader />}

      {filteredProduct.map((product) => (
        <div className="details-container" key={product.id}>
          <div className="main-details">
            <Swiper
              slidesPerView={1}
              navigation
              pagination={{ type: "bullets" }}
              effect="fade"
              modules={[EffectFade, Thumbs]}
              autoplay={{ delay: 3000 }}
            >
              {product.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="image-swiper">
                    <img
                      src={product.imgUrls[index]}
                      alt={product.productName}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="key-details">
              <h3 className="heading">Key Descriptions</h3>

              <ul className="details-list">
                <h4 className="name">
                  {product.productName} {product.productModel}
                </h4>
                <li>
                  <h5>Product Price</h5>
                  <span>
                    {product.productPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ৳
                  </span>
                </li>
                <li>
                  <h5>Special Price</h5>
                  <span>
                    {product.specialPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ৳
                  </span>
                </li>
                <li>
                  <h5>Product ID</h5>
                  <span>{product.productId}</span>
                </li>
                <li>
                  <h5>Brand</h5>
                  <span>{product.brand}</span>
                </li>
                <li>
                  <h5>Product Model</h5>
                  <span>{product.productModel}</span>
                </li>
                <li>
                  <h5>Warranty</h5>
                  <span>{product.warranty}</span>
                </li>
              </ul>

              <div className="quantity">
                <button
                  onClick={(e) =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={(e) =>
                    setQuantity((prev) => (prev === 5 ? 5 : prev + 1))
                  }
                >
                  +
                </button>
              </div>
              <div className="orderOrCart">
                {isLoggedIn ? (
                  <>
                    <button
                      className="addToCart"
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: product.id,
                            userId: userId,
                            title: product.productName,
                            price: product.specialPrice
                              ? product.specialPrice
                              : product.productPrice,
                            img: product.imgUrls[0],
                            brand: product.brand,
                            quantity: quantity,
                          })
                        );
                        toast.success(
                          `'${quantity}' ${product.productName} ${
                            quantity > 1 ? "are" : "is"
                          } added to your cart!`
                        );
                      }}
                    >
                      <BiCartAdd style={{ color: "white" }} />
                      Add to cart
                    </button>
                    <button className="buyNow">
                      <BiCartAdd />
                      Buy now
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="loginToAddToCart">
                      Login to add to cart / Buy
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="specifications">
            <h6>Specifications</h6>
            <ul className="specifications-list">
              {product.detailsInputFields.map((details, index) => (
                <li key={index}>
                  <span>{details.nameOfTheDetail}</span>
                  <span>{details.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
