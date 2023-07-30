import "./products.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useFirestoreCollection, {
  handleDelete,
} from "../../hooks/useFirestoreCollection";
import { brands } from "../../assets/brands";
import Loader from "../../components/loader/Loader";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectEmail, selectIsLoggedIn } from "../../redux/slice/authSlice";

const Products = () => {
  let params = useParams();

  const [searchParams] = useSearchParams();

  const brandFilter = searchParams.get("brand");

  const productCollection = useFirestoreCollection("products");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const email = useSelector(selectEmail);

  const adminEmail = import.meta.env.VITE_APP_ADMINEMAIL;

  //filtering only those brands that match with the current product brands which we are getting through useParams()
  const filteredBrands = brands.filter((brand) => {
    return (
      brand.brandsFor.replace(/\s+/g, "-").toLowerCase() === params.whatProduct
    );
  });

  const filteredProducts = productCollection.data?.filter(
    (data) => data.whatProduct === params.whatProduct
  );

  //here we are filtering products based on the brand that has been chosen by the user in the product page.
  let productsFilteredByBrand = brandFilter
    ? filteredProducts?.filter(
        (product) =>
          product.brand.replace(/\s+/g, "-").toLowerCase() === brandFilter
      )
    : filteredProducts;

  return (
    <>
      {productCollection.isLoading && <Loader />}

      <div className="products">
        <div className="products-container">
          <h2 className="heading">{params.whatProduct.replace(/-/g, " ")}</h2>

          <p>Filter by brands</p>
          {filteredBrands.map((brands, index) => (
            <div key={index} className="brands">
              {brands.brands.map((brand, i) => (
                <Link
                  to={`?brand=${brand.name.replace(/\s+/g, "-").toLowerCase()}`}
                  key={i}
                  className={`brandsToFilter ${
                    brandFilter ===
                    brand.name.replace(/\s+/g, "-").toLowerCase()
                      ? "selectedBrand"
                      : ""
                  }`}
                >
                  {brand.name}
                </Link>
              ))}
              {brandFilter ? (
                <Link to="." className="clearBtn">
                  Clear Filter
                </Link>
              ) : null}
            </div>
          ))}

          <div className="products-list">
            {productsFilteredByBrand?.map((product) => (
              <div className="product" key={product.id}>
                <Link to={`productDetails/${product.id}`}>
                  <div className="image">
                    <img src={product.imgUrls?.[0]} alt={product.productName} />
                  </div>

                  <div className="content">
                    <h3 className="productName">{product.productName}</h3>
                    <div className="price">
                      <span className="productPrice">
                        {product.productPrice
                          .toString()
                          .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                        ৳
                      </span>

                      <span className="specialPrice">
                        {product.specialPrice
                          ?.toString()
                          .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                        ৳
                      </span>
                    </div>

                    <span className="brandName">{product.brand}</span>
                  </div>
                </Link>
                {isLoggedIn && email === adminEmail && (
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(product.id)}
                  >
                    <RiDeleteBinLine />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
