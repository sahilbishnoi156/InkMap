import React,{useContext, useEffect, useState} from 'react'
import NoteContext from "../context/notes/NoteContext";
import {Link, useNavigate} from 'react-router-dom';
import '../App.css';
import { toast } from "react-toastify";

export default function UserInfo() {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const {notes, getUserData, userDate} = context;
    const [userTillDate, setUserTillDate] = useState('')

    const handleLogOut = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/login");
        toast.success(`😔 Successfully Logged Out`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
    useEffect(() => {
      getUserData()
      const jsonDate = new Date(parseFloat(userDate));
      setUserTillDate(jsonDate.getMonth() +
      1 +
      "-" +
      jsonDate.getDate() +
      "-" +
      jsonDate.getFullYear())
      //eslint-disable-next-line
    }, [])
    
  return (
    <div style={{height:"92vh", }} className='d-flex align-items-center'>
    <div className="page-content page-container container " id="page-content" style={{height:"100%", width:"100%"}}>
  <div className="padding" style={{height:"100%", width:"100%"}}>
    <div className="row container d-flex justify-content-center" style={{height:"100%", width:"100%"}}>
      <div className="col-xl-6 col-md-2" style={{height:"100%", width:"100%"}}>
        <div className="card user-card-full m-0" style={{ width:"100%"}}>
          <div className="row m-l-0 m-r-0">
            <div className="col-sm-4 bg-c-lite-green user-profile" >
              <div className="card-block text-center text-white" >
                <div className="m-b-25">
                  <img
                    src="https://img.icons8.com/bubbles/300/000000/user.png"
                    className="img-radius"
                    alt="dfsdf"
                  />
                </div>
                <h6 className="f-w-600 fs-2">{localStorage.getItem('username')}</h6>
                <p>User</p>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-block">
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600 fs-4">
                  Information
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Email</p>
                    <h6 className="text-muted f-w-400">{localStorage.getItem('email')}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Phone</p>
                    <h6 className="text-muted f-w-400">Absent</h6>
                  </div>
                </div>
                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 fs-4">
                  Notes
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Total Notes</p>
                    <h6 className="text-muted f-w-400">{notes.length}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Notes Deleted</p>
                    <h6 className="text-muted f-w-400">Absent</h6>
                  </div>
                </div>
                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 fs-4">
                  About
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">User Till</p>
                    <h6 className="text-muted f-w-400">{userTillDate}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Description</p>
                    <h6 className="text-muted f-w-400">Absent</h6>
                  </div>
                </div>
                <div className="row d-flex align-items-center justify-content-center mt-3">
                  <div className="col-sm-6"><ul className="social-link list-unstyled " id='social-link-icons'>
                  <li>
                    <Link
                      to=""
                      title=""
                      data-original-title="facebook"
                      data-abc="true"
                    >
                      
                      <i className="fa-brands fa-instagram" ></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="twitter"
                      data-abc="true"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="instagram"
                      data-abc="true"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600"><button className="btn btn-dark"  onClick={handleLogOut}>
               Log out <i className="fa-solid fa-right-from-bracket"></i>
                </button></p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  )
}
