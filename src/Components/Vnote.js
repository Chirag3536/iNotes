// Note.js
import React, { useState } from "react";
import Modal from "react-modal";
import NoteItem from "./NoteItem";
import noteContext from "../Context/notes/noteContext";

Modal.setAppElement("#root");

const Note = ({ title, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={openModal}>View</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Note Modal"
      >
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Note;
