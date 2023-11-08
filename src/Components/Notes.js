import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const {showAlert} = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote , getNoteById} = context;
  const[note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  const ref = useRef(null);
  const viewRef = useRef(null);
  const refClose = useRef(null);
  
  const handleclick = (e)=>{
    console.log("updating....", note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Changes saved successfully", "success");
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
  };

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleViewNote = (currentNote) => {
    viewRef.current.click();
    getNoteById(currentNote._id)
      .then((data) => {
        setDescription(data.description);
        setTitle(data.title);
        // console.log(data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Addnote showAlert = {showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="mb-3 textWt">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      onChange={onChange}
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3 textWt">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      value={note.edescription}
                    />
                  </div>
                  <div className="mb-3 textWt">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled = {note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-outline-success" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* For viewing the specific note */}
      <button type="button" ref={viewRef} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {description}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container mx-2">
            {notes.length===0 && 'Please add your notes to view.........'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} getNoteById = {getNoteById} note={note} showAlert = {showAlert} handleViewNote={handleViewNote}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
