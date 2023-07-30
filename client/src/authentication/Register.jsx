import { Link, useNavigate } from "react-router-dom";
import "./authentication.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { auth, db } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

const firstLastName = {
  firstName: "",
  lastName: "",
};

const Register = () => {
  const [fullName, setFullName] = useState(firstLastName);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { firstName, lastName } = fullName;

  const navigate = useNavigate();

  const handleOnChange = async (e) => {
    setFullName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length >= 6 && password === cPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(false);
          navigate("/");
          refreshPage();
        })
        .catch((error) => {
          toast.error(
            `something went wrong ${error.message}, error code: ${error.code}`
          );
          setIsLoading(false);
        });

      try {
        await setDoc(doc(db, "users-name", uuid()), {
          ...fullName,
          email: email,
          contactNo: contactNo,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        toast.error(
          `something went wrong, ${error.message}. Error code: ${error.code}`
        );
        setIsLoading(false);
      }
    } else {
      toast.error(
        "password must at least 6 characters long and it should match with confirm password"
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="register">
        <h2>Register Account</h2>
        <form className="content" onSubmit={registerUser}>
          <div className="formForName">
            <div className="firstName">
              <label htmlFor="firstName">
                First Name <sup>*</sup>
              </label>
              <input
                required
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={handleOnChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">
                Last Name <sup>*</sup>
              </label>
              <input
                required
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="formEmail">
            <label htmlFor="email">
              Email <sup>*</sup>
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              id="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formContact">
            <label htmlFor="contact">
              Contact No <sup>*</sup>
            </label>
            <input
              required
              type="number"
              name="contactNo"
              value={contactNo}
              id="contact"
              className="no-spin"
              placeholder="Contact Number"
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="formPassword">
            <label htmlFor="password">
              Password <sup>*</sup>
            </label>
            <input
              required
              type="password"
              name="password"
              value={password}
              id="password"
              placeholder="Enter a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formCPassword">
            <label htmlFor="Cpassword">
              Confirm Password <sup>*</sup>
            </label>
            <input
              required
              type="password"
              name="password"
              value={cPassword}
              id="Cpassword"
              placeholder="Confirm Password"
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <h4>
          Already a user?
          <Link to="/login">Login</Link>
        </h4>
      </div>
    </>
  );
};

export default Register;
