import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { title, description, tag } = props.note;
  const {updateNote,showAlert}=props;

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Tags : {tag}</h6>
          <p className="card-text">{description}</p>

          <div>
            <i
              className="fas fa-trash-alt mx-2 fa-lg"
              onClick={() => {
                deleteNote(props.note._id);
                showAlert("Note Deleted !","success")
              }}
            ></i>
            <i className="far fa-edit mx-2 fa-lg" onClick={()=>{updateNote(props.note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
