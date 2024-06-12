import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    // console.log(JSON.stringify(json));
    if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Successfully logged in !!", "success");
        navigate('/');
    }
    else{
        props.showAlert("Invalid user credentials", "warning");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 textWt">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3 textWt">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-outline-success btn-group-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
