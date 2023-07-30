import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="col">
          <div>
            <h4>Online Orders</h4>

            <div className="content">
              <span>01234567890</span>
              <span>01234567890</span>
            </div>
          </div>

          <div>
            <h4>Open-Close Schedule</h4>
            <div className="content">
              <span>We are open 10:00am - 8:00pm</span>
            </div>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="content">
              <a href="https://www.facebook.com/" target="_blank">
                <img
                  src="https://i.ibb.co/8K7Zmt2/facebook-1.png"
                  alt="facebook"
                />
              </a>

              <a href="https://www.youtube.com/?themeRefresh=1" target="_blank">
                <img src="https://i.ibb.co/HhTmkxY/youtube.png" alt="youtube" />
              </a>

              <a href="https://www.whatsapp.com/" target="_blank">
                <img
                  src="https://i.ibb.co/1LLtyK6/whatsapp-1.png"
                  alt="whatsapp"
                />
              </a>

              <a href="https://www.instagram.com/" target="_blank">
                <img
                  src="https://i.ibb.co/D54wdVQ/instagram.png"
                  alt="instagram"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div>
            <h4>Corporate Deals</h4>
            <div className="content">
              <span>01234567890</span>
              <span>01234567890</span>
            </div>
          </div>

          <div>
            <h4>Important Links</h4>
            <div className="content">
              <Link>About Us</Link>
              <Link>Warranty Terms</Link>
              <Link>Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h4>Payment Partners</h4>
            <div className="content">
              <img
                src="https://i.ibb.co/0Cs3srN/nagad-logo.png"
                alt="nagad logo"
              />
              <img
                src="https://i.ibb.co/Zmn7wC7/rocket-logo.png"
                alt="Dutch Bangla Bank logo"
              />
              <img
                src="https://i.ibb.co/b5p7Kv0/bkash-logo.png"
                alt="Bkash logo"
              />
            </div>
          </div>
        </div>

        <div className="col">
          <div>
            <h4>Service</h4>
            <div className="content">
              <span>01234567890</span>
              <span>01234567890</span>
            </div>
          </div>

          <div>
            <h4>Address</h4>
            <div className="content">
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          <div>
            <h4>Delivery Partners</h4>
            <div className="content">
              <img src="https://i.ibb.co/qNYL3wP/REDX.png" alt="REDx logo" />
              <img
                src="https://i.ibb.co/RjjrC9Z/The-Official-Pathao-Logo.png"
                alt="pathao logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
