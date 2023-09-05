import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: "",});
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, cpassword} = credentials;

    if(password === cpassword){
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            props.showAlert("User created", "success");
            navigate("/login");
            setInterval(()=>{
              props.showAlert("Now login into your account", "info");
            }, 1500)
        }
        else{
          props.showAlert("User already exists", "danger");
        }
    }
    else{
      props.showAlert("Password does not match", "warning");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            minLength={5}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            required
            minLength={5}
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
