import "./dealsDetails.scss";
import { useParams } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Thumbs,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import CountdownTimer from "./CountDownTImer";
import Loader from "../loader/Loader";

const DailyDealsDetails = () => {
  const dealParam = useParams();

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const dealsDataCollection = useFirestoreCollection("dailyDeals");

  const filteredDeal = dealsDataCollection.data.filter(
    (data) => data.id === dealParam.id
  );

  return (
    <>
      {dealsDataCollection.isLoading && <Loader />}

      {filteredDeal.map((deal) => {
        const endDate = new Date(deal.endingDate.seconds * 1000);

        return (
          <div className="dealDetails" key={deal.id}>
            <Swiper
              slidesPerView={1}
              navigation
              pagination={{ type: "bullets" }}
              effect="fade"
              modules={[EffectFade, Thumbs]}
              autoplay={{ delay: 3000 }}
            >
              {deal.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="image-swiper">
                    <img src={deal.imgUrls[index]} alt={deal.title} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="content">
              <CountdownTimer endDate={endDate} />
              <h1>{deal.title}</h1>
              <p className="desc">{deal.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DailyDealsDetails;
