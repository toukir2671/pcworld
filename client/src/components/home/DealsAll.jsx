import "./dealsDetails.scss";
import { Link } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Loader from "../loader/Loader";

const DealsAll = () => {
  const dealsData = useFirestoreCollection("dailyDeals");

  return (
    <>
      {dealsData.isLoading && <Loader />}
      <div className="deals-list">
        <h1 className="headTag">All available deals</h1>
        {dealsData.data.map((deal) => {
          return (
            <Link to={`${deal.id}`} key={deal.id} className="dealsContainer">
              <div className="image">
                <img src={deal.imgUrls[0]} alt={deal.title} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DealsAll;
