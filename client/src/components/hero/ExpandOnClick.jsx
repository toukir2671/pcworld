import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { RiProfileLine, RiUserFill } from "react-icons/ri";

const ExpandOnClick = ({ logoutUser, userName }) => {
  return (
    <div className="userIconDiv">
      <Link>
        <RiUserFill />
        <span>{userName.length > 20 ? userName.slice(0, 20) : userName}</span>
      </Link>
      <Link>
        <RiProfileLine />
        Profile
      </Link>
      <a onClick={logoutUser}>
        <IoMdLogOut />
        Logout
      </a>
    </div>
  );
};

export default ExpandOnClick;
