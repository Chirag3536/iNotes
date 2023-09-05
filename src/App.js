import { useState } from "react";
import "./App.css";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import NoteState from "./Context/notes/NoteState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      message: message,
      type: type
    });

    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert} /> } />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="/signup" element={<Signup  showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
