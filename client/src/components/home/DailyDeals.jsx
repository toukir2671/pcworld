import Slider from "react-slick";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../loader/Loader";
import { useRef, useState } from "react";
import CountdownTimer from "./CountDownTImer";
import { Link } from "react-router-dom";

const DailyDeals = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipeToSlide: false,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };

  const dealsDataCollection = useFirestoreCollection("dailyDeals");
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {dealsDataCollection.isLoading && <Loader />}
      {dealsDataCollection.data.length > 0 ? (
        <Slider {...settings}>
          {dealsDataCollection.data.map((deal) => {
            const endDate = new Date(deal.endingDate.seconds * 1000);

            return (
              <Link
                to={`deals/${deal.id}`}
                key={deal.id}
                className="deals-container"
              >
                <div className="image">
                  {imageLoaded ? (
                    <img
                      src={deal.imgUrls[0]}
                      alt={deal.title}
                      onLoad={handleImageLoad}
                      ref={imageRef}
                    />
                  ) : (
                    <>
                      <img
                        src="https://i.ibb.co/SN94Lhd/loading-deals.png"
                        alt={deal.title}
                      />
                    </>
                  )}
                  <img
                    src={deal.imgUrls[0]}
                    alt={deal.title}
                    onLoad={handleImageLoad}
                    ref={imageRef}
                    style={{ display: "none" }}
                  />
                </div>

                <CountdownTimer endDate={endDate} />
              </Link>
            );
          })}
        </Slider>
      ) : null}
    </>
  );
};

export default DailyDeals;
