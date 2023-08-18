import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoteState(props) {
  const host = "https://ink-map-backend-nsehzfqac-sskkpoonia-gmailcom.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [userDate, setUserDate] = useState('')

  // gets all Note
  const getAllNotes = async () => {
    // api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    // api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();
    setNotes(notes.concat(json));
    toast.success(`😄${title} Added!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // delete Note
  const deleteNote = async (id, title) => {
    // api calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // eslint-disable-next-line
    const json = response.json();

    // Logic
    const checkVal = window.confirm("Do you want to delete this Note?");
    if (checkVal) {
      toast.error(`😔 ${title} Deleted!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    }
  };

  // edit Note
  const editNote = async (id, title, description, tag) => {
    // api calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    toast.success(`👍${title} Updated!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Getting username
  const getLoginJson = async (email, password) => {
    // Api calls
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("email", json.email);
      localStorage.setItem("username", json.username);
      localStorage.setItem("token", json.authtoken);
    }
    return json;
  };
  // show description
  const showDes = (showDesc, SetShowDesc, caretRef) => {
    caretRef.current.style.transition = "all .4s";
    caretRef.current.classList.toggle("fa-rotate-180");
    showDesc ? SetShowDesc(false) : SetShowDesc(true);
  };

  // Getting user data
  const getUserData = async () => {
    // Api calls
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const user = await response.json();
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.name);
    setUserDate(user.date);
    return user;
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        getLoginJson,
        showDes,
        getUserData,
        userDate,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
