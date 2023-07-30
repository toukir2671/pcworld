import "./navbar.scss";
import { navLinks } from "../../assets/navLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* <div className="navbarContainer">
        {navLinks.map((mainLink, index) => (
          <div key={index} className="navbar">
            <Link
              to={
                !mainLink.subMenu
                  ? `products/${mainLink.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  : null
              }
            >
              {mainLink.name}
            </Link>

            <div className="navLinksContainer">
              {mainLink.subMenu && (
                <ul className="navLinks">
                  {mainLink.subLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={`products/${link.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div> */}

      <div className="navbarContainer">
        <div className="row">
          {navLinks.slice(0, 4).map((mainLink, index) => (
            <div key={index} className="navbar">
              <Link
                to={
                  !mainLink.subMenu
                    ? `products/${mainLink.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    : null
                }
              >
                {mainLink.subMenu ? (
                  <p
                  // onClick={() => setSubMenuOpen(!subMenuOpen)}
                  >{`${mainLink.name} >`}</p>
                ) : (
                  <p>{mainLink.name}</p>
                )}
              </Link>

              <div className="navLinksContainer">
                {mainLink.subMenu && (
                  <ul className="navLinks">
                    {mainLink.subLinks.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={`products/${link.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {navLinks.slice(4).map((mainLink, index) => (
            <div key={index} className="navbar">
              <Link
                to={
                  !mainLink.subMenu
                    ? `products/${mainLink.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    : null
                }
              >
                {mainLink.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
