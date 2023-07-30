import "./resell.scss";
import { Link, useSearchParams } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Loader from "../../components/loader/Loader";
import { options } from "../../components/admin/productOptions";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Resell = () => {
  const [searchParams] = useSearchParams();
  const resellDataCollection = useFirestoreCollection("resells");

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const categoryFilter = searchParams.get("category");

  let itemsFilteredByCategory = categoryFilter
    ? resellDataCollection.data?.filter(
        (items) =>
          items.whatProduct.replace(/\s+/g, "-").toLowerCase() ===
          categoryFilter
      )
    : resellDataCollection.data;

  return (
    <>
      {resellDataCollection.isLoading ? (
        <Loader />
      ) : (
        <div className="resell">
          <div className="titleAndSellBtn">
            <h1>Resells</h1>
            <span>used items being sold by our customers</span>
            {isLoggedIn ? (
              <Link to="sellProductUpload">
                <button className="resellBtn">Sell an item</button>
              </Link>
            ) : (
              <Link>
                <button className="resellBtn notLoggedIn">Login to sell</button>
              </Link>
            )}
          </div>

          <div className="filterResellItems">
            {options.map((option, index) => (
              <Link
                key={index}
                to={`?category=${option.label
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`categoryFilter ${
                  categoryFilter ===
                  option.label.replace(/\s+/g, "-").toLowerCase()
                    ? "selectedCategory"
                    : ""
                }`}
              >
                <p>{option.label}</p>
              </Link>
            ))}
            {categoryFilter ? (
              <Link to="." className="clearBtn">
                Clear Filter
              </Link>
            ) : null}
          </div>

          <div className="resell-container">
            {itemsFilteredByCategory.map((data) => (
              <Link key={data.id} to={`resellItemDetail/${data.id}`}>
                <div className="image">
                  <img src={data.imgUrls[0]} alt={data.itemName} />
                </div>

                <div className="content">
                  <div className="itemTitle">
                    <h4>{data.whatProduct.replace(/-/g, " ")}</h4>
                    <p>{data.itemName}</p>
                  </div>

                  <div className="warranty">
                    <h4>Warranty Left</h4>
                    <div>
                      {data.warrantyLeft === "lifetime" ? (
                        <p>Lifetime</p>
                      ) : (
                        <p>
                          {data.warrantyLeft} year
                          {data.warrantyLeft > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="price">
                    <h4>Price</h4>
                    <p>
                      {data.price
                        .toString()
                        .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Resell;
