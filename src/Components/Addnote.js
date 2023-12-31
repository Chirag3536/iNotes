import React, { useState, useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const Addnote = (props) => {

  const context = useContext(noteContext);
  const { addNote } = context;

  const[note, setNote] = useState({title: "", description: "", tag: ""})
  
  const handleclick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    // addNote(note);
    props.showAlert("Note created successfully", "success");
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  const textAreaStyle = {
    height :'200px'
  }

  return (
    <div >
      <h1>Add a new Note</h1>
      <div className="container my-3 textWt">
        <form>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              style={textAreaStyle}
            ></textarea>
          </div>

          {/* <div className="form-floating mb-3">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label for="floatingTextarea">Comments</label>
          </div> */}
          <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length <5} type="submit" className="btn btn-outline-success" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
