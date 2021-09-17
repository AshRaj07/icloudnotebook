import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = ({showAlert}) => {
  const { addNote } = useContext(noteContext);
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (event) => {
      event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote( {title: "", description: "", tag: ""})
    showAlert("Notes added successfully","success");
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add Note</h1>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="note-title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="note-title"
              placeholder="title"
              name="title"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="col-md-auto">
            <label htmlFor="note-title" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="note-tag"
              placeholder="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="note-text-area" className="form-label">
            Note Textarea
          </label>
          <textarea
            name="description"
            className="form-control"
            id="note-text-area"
            rows="8"
            onChange={onChange}
            value={note.description}
          ></textarea>
        </div>
        <button disabled={note.title<3 && note.description<8} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
