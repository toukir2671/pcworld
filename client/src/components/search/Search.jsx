import { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { GrClose, GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const Search = () => {
  const [wordsEntered, setWordsEntered] = useState("");
  const [filteredSearchData, setFilteredSearchData] = useState([]);

  const productCollection = useFirestoreCollection("products");

  const handleSearch = (e) => {
    const searchWord = e.target.value;

    setWordsEntered(searchWord);

    const FilterSearch = productCollection.data.filter(
      (data) =>
        data.productName.toLowerCase().includes(searchWord.toLowerCase()) ||
        data.whatProduct.toLowerCase().includes(searchWord.toLowerCase()) ||
        data.brand.toLowerCase().includes(searchWord.toLowerCase())
    );

    if (searchWord === "") {
      setFilteredSearchData([]);
    } else {
      setFilteredSearchData(FilterSearch);
    }
  };

  const clearInput = () => {
    setFilteredSearchData([]);
    setWordsEntered("");
  };

  return (
    <>
      <div className="search-field-lg">
        <input
          type="text"
          name="search"
          placeholder="search products"
          onChange={handleSearch}
          value={wordsEntered}
        />

        {wordsEntered.length > 0 ? (
          <GrClose onClick={clearInput} className="search-icon" />
        ) : (
          <GoSearch className="search-icon" />
        )}
      </div>

      {wordsEntered.length > 0 ? (
        <div className="search-output">
          {filteredSearchData.length > 0 ? (
            filteredSearchData.map((searchedProduct) => (
              <Link
                to={`products/${searchedProduct.brand}/productDetails/${searchedProduct.id}`}
                className="searchedProduct"
                onClick={clearInput}
                key={searchedProduct.id}
              >
                <div className="searchImage">
                  <img
                    src={searchedProduct.imgUrls[0]}
                    alt={searchedProduct.productName}
                  />
                </div>

                <div className="searchContent">
                  <h4>{searchedProduct.productName}</h4>
                  <span className="brand">{searchedProduct.brand}</span>
                  <div className="prices">
                    <p>
                      {searchedProduct.productPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p>
                      {searchedProduct.specialPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="searchedProduct">no products found</div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Search;
