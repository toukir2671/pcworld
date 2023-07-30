import { useState } from "react";
import "./authentication.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("Logged in successfully!");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(
          `Something went wrong - ${error.message}. Error code: ${error.code}`
        );
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className="login" onSubmit={handleLogin}>
        <h2>Account Login</h2>

        <div className="content">
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <div className="forgotPass">
              <label htmlFor="password">Password</label>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
            <input
              required
              type="password"
              name="Password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>

          <span>Don't have an account?</span>

          <Link to="/register" className="toRegister">
            Create an account
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
