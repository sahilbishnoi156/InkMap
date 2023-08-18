import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Notes() {
  const context = useContext(NoteContext);
  const [formInput, setFormInput] = useState("");
  const closeRef = useRef();
  const navigate = useNavigate();
  const { notes, getAllNotes, editNote } = context; // destructuring
  const myModal = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "general",
  });

  const handleEditClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    let found = false;
    notes.forEach((note) => {
      if (formInput.length >= 2) {
        if (
          note.title.includes(
            formInput.charAt(0).toUpperCase() + formInput.slice(1)
          ) ||
          note.title.includes(formInput)
          ||
          note.title.includes(formInput.toUpperCase())
          ||
          note.title.includes(formInput.toLowerCase())
          
        ) {
          document.getElementById(note._id).scrollIntoView();
          const div = document.getElementById(note._id);
          div.style.transition = ".4s";
          setTimeout(() => {
            div.style.transform = "scale(1.08)";
          },200);
          setTimeout(() => {
            div.style.transform = "scale(1)";
          }, 700);
          setFormInput("");
          found = true;
        }
      }
    });
    if (!found && formInput !== "") {
      setFormInput("");
      toast.warn(`😔Note Not Found !`, {
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
    // ;((note)=>{return note.title !== formInput})
    // setFormInput(notes.title)
  };

  const handleFormChange = (e) => {
    setFormInput(e.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    myModal.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  return (
    <div className="mb-5" id="notes-div">
      <AddNote />
      {/* Button */}  
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={myModal}
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleOnChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    Please write a brief description
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleOnChange}
                    value={note.edescription}
                    minLength={10}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditClick}
                disabled={
                  note.etitle.length < 4 || note.edescription.length < 11
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between text-light">
        <h2>Your Notes - {notes.length}</h2>
        <nav className="navbar ">
          <div className="container-fluid">
          {formInput.length < 2 && formInput.length !== 0 ? <div id="emailHelp" className="form-text text-light mx-2">
                    (Must contain 2 characters)
                  </div> : ''}
            <form
              className="d-flex"
              role="search"
              onSubmit={handleOnFormSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Your Note"
                aria-label="Search"
                value={formInput}
                onChange={handleFormChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div className="row my-2">
        <h4 className="text-light">
          {notes.length < 1 && "Create Your First Note To Save Your Events"}
        </h4>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              id={note._id}
              note={note}
              date={note.date}
              updateNote={updateNote}
              myModal={myModal}
            />
          );
        })}
      </div>
    </div>
  );
}
