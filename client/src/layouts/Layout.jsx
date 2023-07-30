import "./layout.scss";
import { Outlet } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Hero />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
