import React, { useContext,useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { useHistory } from "react-router";


const Note = ({showAlert}) => {
  // eslint-disable-next-line
  const { notes, setnotes,getNotes } = useContext(noteContext);
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history.push("/login");
    }
    
    // eslint-disable-next-line
  },[]);
  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null)

const updateNote = (currentNote) => {
  ref.current.click();
  console.log(currentNote)
  setnote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  
}


  return (
    <>
      <AddNote showAlert={showAlert} />

      <Button ref={ref} variant="primary d-none" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        note = {note}
        setnote= {setnote}
        show={modalShow}
        onHide={() => setModalShow(false)}
        showAlert={showAlert}
      />
   
      <div className="container row my-5">
        <h1>Your Notes</h1>
        {notes.map((item) => {
          return <NoteItem key={item._id} updateNote={updateNote} note={item} showAlert={showAlert}/>;
        })}
      </div>
    </>
  );
};

export default Note;
