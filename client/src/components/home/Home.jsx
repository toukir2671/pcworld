import CustomBuilds from "./CustomBuilds";
import DailyDeals from "./DailyDeals";
import ShopByCategory from "./ShopByCategory";
import "./home.scss";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-container">
          <div className="dailyDeals">
            <DailyDeals />
          </div>

          <div>
            <h1 className="heading-1">Peripherals for your setup</h1>
            <div>
              <ShopByCategory />
            </div>
          </div>

          <div className="custom-build">
            <h1 className="heading-2">Intel Custom Build</h1>
            <CustomBuilds whichCustomBuild="intel" />
          </div>

          <div className="custom-build">
            <h1 className="heading-3">Ryzen Custom Build</h1>
            <div>
              <CustomBuilds whichCustomBuild="ryzen" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
