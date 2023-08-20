import React,{useState, useRef} from "react";   
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const host = process.env.HOST || `http://localhost:5000`;
    const navigate = useNavigate();
    const checkRef = useRef(null);
    const passRef = useRef(null);
    const [passwordChecker, setPasswordChecker] = useState("");
    const [credentials, setCredentials] = useState({email:"", password:'', username:''})

    // handling show password
    const handleClickShowPassword = () => {
        if (checkRef.current.checked){
            passRef.current.type = ("text")
        }
        else{
            passRef.current.type = ("password")
        }
    };


    // Handling Submit Button
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        // Api calls
        const response = await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({name:credentials.username ,email: credentials.email, password: credentials.password})
          });
          const json =  await response.json();
          if (json.success && json.authtoken){
            // redirect to notes
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('username', json.name)
            localStorage.setItem('email', json.email)
            navigate('/home')
            toast.success(`😄 Successfully Registered`, {
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
          else{
            toast.error(`😯User Already exists`, {
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
    }

    // Handling on change
    const handleOnChange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    const handleOnChangePassword = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
        let pass = e.target.value;
        if (/[A-Z]/.test(pass) === false) {
            setPasswordChecker("Your password must contain at least one uppercase letter.")
        }
        else if (/[a-z]/.test(pass) === false) {
            setPasswordChecker("Your password must contain at least one lowercase letter.")
        }
        else if (/[!@#$%^&*]/.test(pass) === false) {
            setPasswordChecker("Your password must contain at least one special letter.")
        }
        else if (/[0-9]/.test(pass) === false) {
            setPasswordChecker("Your password must contain at least one digit letter.")
        }
        else{
            setPasswordChecker("");
        }
    }
    const handleOnChangeEmail = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <form  className="container my-5 text-light" onSubmit={handleSubmit} id="register-form">
        <strong className="heading-form">Register</strong>
      <div className="mb-3 ">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          aria-describedby="emailHelp"
          value={credentials.username}
          onChange={handleOnChange}
          autoComplete="username"
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
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
          onChange={handleOnChangeEmail}
          required
        />
        <div id="emailHelp" className="form-text">
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
          onChange={handleOnChangePassword}
          ref={passRef}
          minLength={8}
          required
          autoComplete="current-password"
        />
      </div>
      <div id="emailHelp" className="form-text">
          {passwordChecker}
        </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" ref={checkRef} onClick={handleClickShowPassword} />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Show Password
        </label>
      </div>
      <button type="submit" className="btn btn-primary" >
        Register
      </button>
      <div className="my-4 fs-6">
      <Link className="text-light text-decoration-none fs-4" to="/login">Already have an account?</Link>
      </div>
    </form>
  );
}
