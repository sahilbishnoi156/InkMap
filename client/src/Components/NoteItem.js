import React, { useContext, useState, useRef, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const [showDesc, SetShowDesc] = useState(true);
  const caretRef = useRef(null);
  const { note, updateNote, id } = props;
  const context = useContext(NoteContext);
  const { deleteNote, showDes } = context; // destructuring
  const [noteDate, setNoteDate] = useState('')
  const [noteTime, setNoteTime] = useState('')

  useEffect(() => {
      const jsonDate = new Date(parseFloat(note.date)); //converting to date
      setNoteDate(jsonDate.getMonth() +
      1 +
      "-" +
      jsonDate.getDate() +
      "-" +
      jsonDate.getFullYear())
      setNoteTime(jsonDate.getHours() +
      "-" +
      jsonDate.getMinutes() +
      "-" +
      jsonDate.getSeconds())
      //eslint-disable-next-line
  }, [])
  
  
  return (
    <div className="col-md-6 my-4 position-relative" id={id}>
      <div className="card">
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
          {note.tag}
        </span>
        <div className="card-body">
          <h5 className="card-title fs-4">{note.title}</h5>

          <div>
            <div className="mb-3 d-flex justify-content-between align-items-start flex-row"
              onClick={() => showDes(showDesc, SetShowDesc, caretRef)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              
              <span style={{width:"90%"}}>{showDesc ? note.description.slice(0,30)+"...." :note.description} </span>
              <i
                className="fa-solid fa-caret-up fa-rotate-180 position-sticky"
                ref={caretRef}
              ></i>
            </div>
          </div>

          <div className="d-flex gap-4 fs-4 align-items-center justify-content-between">
            <div className="d-flex gap-4 fs-4">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteNote(note._id, note.title)}
              ></i>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => updateNote(note)}
              ></i>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <p className="card-text fs-6" style={{ margin: 0 }}>
                {noteDate}
              </p>
              <p className="card-text fs-6">{noteTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
