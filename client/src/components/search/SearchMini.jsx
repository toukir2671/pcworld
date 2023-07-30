import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { useComponentHideAndShow } from "../../hooks/useComponentHideAndShow";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchMini = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const { ref } = useComponentHideAndShow(setSearchOpen);

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
    setSearchOpen(false);
  };

  return (
    <>
      <div ref={ref}>
        <div className="search-field-sm">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <IconContext.Provider
              value={{
                style: {
                  color: "#FDFDFD",
                  fontSize: "35px",
                },
              }}
            >
              <GoSearch className="search-icon" />
            </IconContext.Provider>
          </button>

          {searchOpen ? (
            <div className="searchBar-sm animate__animated animate__faster animate__flipInX">
              <input
                type="text"
                name="search"
                value={wordsEntered}
                onChange={handleSearch}
                placeholder="Search..."
                autoFocus
              />

              <IconContext.Provider
                value={{
                  style: {
                    color: "#FDFDFD",
                    fontSize: "25px",
                  },
                }}
              >
                {wordsEntered.length > 0 ? (
                  <IoMdClose onClick={clearInput} className="search-icon" />
                ) : (
                  <GoSearch className="search-icon" />
                )}
              </IconContext.Provider>
            </div>
          ) : null}
        </div>

        {wordsEntered.length > 0 && searchOpen ? (
          <div className="search-output-sm">
            {filteredSearchData.length > 0 ? (
              filteredSearchData.map((searchedProduct) => (
                <Link
                  to={`products/${searchedProduct.brand}/productDetails/${searchedProduct.id}`}
                  className="searchedProduct-sm"
                  onClick={clearInput}
                  key={searchedProduct.id}
                >
                  <div className="searchImage-sm">
                    <img
                      src={searchedProduct.imgUrls[0]}
                      alt={searchedProduct.productName}
                    />
                  </div>

                  <div className="searchContent-sm">
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
      </div>
    </>
  );
};

export default SearchMini;
