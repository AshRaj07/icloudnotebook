import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = (props) => {
  const { editNote } = useContext(noteContext);

  const { note, setnote,showAlert } = props;

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    showAlert("Note Updated Successfully","success")
    props.onHide();
  };
  



  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Your Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  name="etitle"
                  onChange={onChange}
                  value={note.etitle}
                  required
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
                  name="etag"
                  onChange={onChange}
                  value={note.etag}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="note-text-area" className="form-label">
                Note Textarea
              </label>
              <textarea
                name="edescription"
                className="form-control"
                id="note-text-area"
                rows="8"
                onChange={onChange}
                value={note.edescription}
                required
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={handleClick} >Update Note</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyVerticallyCenteredModal;
