import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Main from "./Components/Main";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import UserInfo from './Components/UserInfo';
import Register from "./Components/Register";
import NoteState from "./context/notes/NoteState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div id="body-inner">
      <Router>
        <NoteState>
          <div id="navbar">
            <Navbar />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              limit={1}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {/* Same as */}
            <ToastContainer />
          </div>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route exact path="/Contact" element={<Contact />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/userinfo" element={<UserInfo/>}></Route>
          </Routes>
        </NoteState>
      </Router>
    </div>
  );
}
