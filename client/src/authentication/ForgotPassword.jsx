import { MdArrowBackIos } from "react-icons/md";
import "./authentication.scss";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your given email for reset link.");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(
          `Something went wrong-${error.message}. Error code: ${error.code}`
        );
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className="forgotPassword" onSubmit={resetPassword}>
        <h2>Reset Password</h2>

        <div className="content">
          <Link to={-1} className="backBtn">
            <MdArrowBackIos style={{ color: "#ffffff" }} />
            Go back
          </Link>

          <div className="inputField">
            <input
              type="text"
              placeholder="email to get reset link"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Reset Password</button>
            <p>
              <span>*</span>
              an email will be sent to your email address using which you've
              registered.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
