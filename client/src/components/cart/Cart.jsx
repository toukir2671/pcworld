import { MdDeleteOutline } from "react-icons/md";
import { GiEmptyHourglass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  resetCart,
  selectCartProducts,
} from "../../redux/slice/cartSlice";
import {
  selectIsLoggedIn,
  selectUserId,
  selectUserName,
} from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";

const Cart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUserId = useSelector(selectUserId);
  const CurrentUserName = useSelector(selectUserName);

  const dispatch = useDispatch();

  const cartProductsForCurrentUser = cartProducts.filter(
    (products) => products.userId === currentUserId
  );

  const totalPrice = cartProductsForCurrentUser.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <>
      {isLoggedIn ? (
        <div className="cart-container animate__animated animate__headShake animate__faster">
          <h4>{CurrentUserName}'s cart</h4>

          {cartProductsForCurrentUser &&
          cartProductsForCurrentUser.length > 0 ? (
            cartProductsForCurrentUser.map((product, index) => (
              <div className="contentAndDeleteBtn" key={index}>
                <div className="cartContent">
                  <div className="image">
                    <img src={product.img} alt={product.title} />
                  </div>

                  <div className="details">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="brand">{product.brand}</p>
                    <p className="quantityPrice">
                      {product.quantity} x{" "}
                      {product.price
                        .toString()
                        .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                      ৳ = {product.quantity * product.price}৳
                    </p>
                  </div>
                </div>

                <div className="deleteBtn">
                  <button onClick={() => dispatch(removeFromCart(product.id))}>
                    <MdDeleteOutline
                      style={{ color: "#fa6969", fontSize: "25px" }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h6 className="ifNoProduct">
              <GiEmptyHourglass style={{ fontSize: "45px" }} />
              Products you add to your cart will be listed here!
            </h6>
          )}
          <div className="orderAndResetBtn">
            {cartProductsForCurrentUser.length > 0 && (
              <div className="totalPrice">
                <p>Total:</p>
                <span>
                  {totalPrice.toString().replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                  ৳
                </span>
              </div>
            )}

            <div className="order">
              <button>Order Now</button>
            </div>
            <div className="resetCart">
              <button
                className="reset"
                onClick={() => dispatch(resetCart(currentUserId))}
              >
                Reset Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="notLoggedInCart animate__animated animate__shakeX animate__faster">
          <span className="notLogged">You are not logged in!</span>
          <i>
            <BiLogInCircle />
          </i>
          <div className="loginPls">
            Please
            <Link to="/login" className="loginForCart">
              login
            </Link>
            to access your cart items.
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
