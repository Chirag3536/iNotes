import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , updateNote, handleViewNote} = props;

    const capetalize = (word)=>{
      if(word.charAt(0) === word.charAt(0).toUpperCase()) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  
  return (

    <div className="col-md-3 my-3 mb-5 ">

      <div className="card border-success mb-3 card-height">
        <div className="card-header bg-transparent border-success"><i class="fa-solid fa-tag"></i> {capetalize(note.tag)}</div>
          <div className="card-body">
            <h5 className="card-title">{capetalize(note.title)}</h5>
            <p className="card-text description-container">{note.description.length > 50 ? capetalize(note.description.substr(0, 50))+'....' : capetalize(note.description)+'.'}</p>
            <div className="button-container">
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
              <i className="fa-solid fa-eye mx-2 " onClick={()=>{handleViewNote(note)}}></i>
            </div>
          </div>
      </div>
    </div>
  );
};

export default NoteItem;
