import React, { useState, useRef, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const context = useContext(NoteContext);
  const { getLoginJson } = context;
  const checkRef = useRef(null);
  const passRef = useRef(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // handling show password
  const handleClickShowPassword = () => {
    if (checkRef.current.checked) {
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
    }
  };

  // Handling Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Api calls
    const json = await getLoginJson(credentials.email, credentials.password); // Getting json
    if (json.success) {
      // redirect to notes
      navigate("/home");
      toast.success(`😄 Welcome ${json.username}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      !json.userExists
        ? toast.warn(`😯 User Note Found`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        : toast.warn(`😯 Invalid Password`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    }
  };

  // Handling on change
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="container text-light"
      onSubmit={handleSubmit}
      id="login-form"
    >
      <strong className="heading-form">Login</strong>
      <div className="mb-3 ">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={credentials.email}
          onChange={handleOnChange}
        />
        <div id="emailHelp" className="form-text text-light">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleOnChange}
          ref={passRef}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          ref={checkRef}
          onClick={handleClickShowPassword}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Show Password
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <div className="my-4 fs-6">
        <Link className="text-light" to="/register">
          Don't have an account?
        </Link>
      </div>
    </form>
  );
}
