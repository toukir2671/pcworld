import { Link } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../loader/Loader";

const CustomBuilds = ({ whichCustomBuild }) => {
  const productCollection = useFirestoreCollection("products");

  const filteredCustomBuilds = productCollection.data.filter(
    (products) =>
      products.whatProduct === "custom-build" &&
      products.brand.toLowerCase() == whichCustomBuild
  );

  let settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {productCollection.isLoading && <Loader />}

      <Slider {...settings}>
        {filteredCustomBuilds &&
          filteredCustomBuilds.map((product) => (
            <Link
              key={product.id}
              className="grid-div"
              to={`products/${whichCustomBuild}/productDetails/${product.id}`}
            >
              <div className="border">
                <div className="image">
                  <img src={product.imgUrls[0]} alt={product.productName} />
                </div>

                <div className="content">
                  <h2 className="productName">{product.productName}</h2>

                  <div className="price">
                    <p className="normalPrice">
                      {product.productPrice
                        .toString()
                        .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                      <span>৳</span>
                    </p>
                    <p className="specialPrice">
                      {product.specialPrice
                        .toString()
                        .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                      <span>৳</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </Slider>

      {productCollection.isLoading ? null : (
        <Link to={`products/custom-build`}>
          <button className="viewMore">View More</button>
        </Link>
      )}
    </>
  );
};

export default CustomBuilds;
