import { GrUserAdmin } from "react-icons/gr";
import "./admin.scss";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/slice/authSlice";

const WelcomeAdmin = () => {
  const admin = useSelector(selectUserName);

  return (
    <div className="admin-greeting">
      <div className="icon">
        <GrUserAdmin style={{ fontSize: "calc(3rem + 3vmin)" }} />
      </div>

      <div className="content">
        <h1>Hi, {admin}</h1>
        <p>Welcome to admin panel</p>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
