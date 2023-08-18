import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNote() {
  const context = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "general" });
  const { addNote, notes } = context; // destructuring

  const handleAddClick = (e) => {
    e.preventDefault();
    let exist = false
    notes.forEach(item => {
      if (item.title === note.title) {
        toast.warn(` 😔 Note Already Exist!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        exist = true;
      }
    });
    if (!exist) {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
    }
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-2 text-light">
      <h2 className="text-light">Add Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title {note.title.length < 4 ? "(Must contain at least 4 characters)":""}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            maxLength={24}
            value={note.title}
          />
        </div>
        <div id="emailHelp" className="form-text text-light">
          Character Left : {24 - note.title.length}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description {note.description.length < 10 ? "(Must contain at least 10 characters)":""}
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleOnChange}
            value={note.description}
          />
        </div>
        <div id="emailHelp" className="form-text text-light">
          Please write a brief description
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label">
            Tag (optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleOnChange}
            value={note.tag}
          />
        </div>
        <button
          disabled={note.title.length < 4 || note.description.length < 10 || note.title.length > 24}
          type="submit"
          className=""
          onClick={handleAddClick}
          id = "add-note-btn"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
