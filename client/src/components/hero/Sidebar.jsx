import { FaIdeal } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = ({
  isLoggedIn,
  userEmail,
  userName,
  adminEmail,
  isMenuOpen,
  setIsMenuOpen,
  logoutUser,
}) => {
  return (
    <>
      <ul className="sideNav-user">
        <li>
          {isLoggedIn ? (
            <>
              <div className="account-icon">
                <img src="https://i.ibb.co/z4nRg2C/user.png" alt="user-icon" />

                <span>
                  Hi, {userName.length > 20 ? userName.slice(0, 20) : userName}
                </span>
              </div>
            </>
          ) : (
            <div className="account-icon">
              <img
                src="https://i.ibb.co/pdqZyw8/no-user.png"
                alt="no-user-icon"
              />

              <div className="authentications">
                <div className="register">
                  <p>New here?</p>{" "}
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    Register
                  </Link>
                </div>

                <div className="login">
                  <p>Or</p>
                  <Link to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </li>

        <li>
          <Link to="/resell" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <GiTakeMyMoney />
            <span>ReSells</span>
          </Link>
        </li>

        <li>
          <Link to="/deals" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaIdeal />
            <span>Today's Deals</span>
          </Link>
        </li>

        {isLoggedIn && userEmail === adminEmail && (
          <li className="admin-sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Link to="/admin">
              <GrUserAdmin />
              <span>Admin</span>
            </Link>
          </li>
        )}

        {isLoggedIn ? (
          <li className="logout" onClick={logoutUser}>
            <IoMdLogOut />
            Logout
          </li>
        ) : null}
      </ul>
    </>
  );
};

export default Sidebar;
