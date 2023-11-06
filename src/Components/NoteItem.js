import React, { useContext, useEffect, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import ViewModal from "./ViewModal";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , updateNote, getNoteById} = props;

    // Define a state variable to store the description
    const [description, setDescription] = useState("");

    const handleViewNote = (id) => {
      getNoteById(id) // Fetch the note details
        .then((data) => {
          setDescription(data.description);
          console.log(description);
          // Open the modal if needed
          // You can control the modal visibility here if required
        })
        .catch((error) => {
          console.error(error);
          // Handle any error if necessary
        });
    };
  

  return (
    <div className="col-md-3 my-3 mb-5">

      <div className="card border-warning mb-3">
        <div className="card-header"><i class="fa-solid fa-tag"></i> {note.tag}</div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description.length > 200 ? note.description.substr(0, 200)+'....' : note.description + '....'}</p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
            <i className="fa-solid fa-eye mx-2 " data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{handleViewNote(note._id)}}></i>
          </div>
      </div>
      <h1>{description}</h1>
      {/* <ViewModal description = {description}/> */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {/* {note.title} */}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {description}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NoteItem;


