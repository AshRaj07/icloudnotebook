import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = ({showAlert}) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
    console.log(json);
    if (json.success) {
      localStorage.setItem("token",json.token)
      showAlert("Logged in successfully.","success")
      history.push("/");
    } else {
      showAlert("Invalid Credentials !","danger")
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <h1 className="display-1">Login to use iNoteBook</h1>
    <form onSubmit={onSubmit}>
      
      <div className="mt-5 container">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={credentials.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="mt-3 container">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10 ">
          <input
            type="password"
            className="form-control"
            name="password"
            id="inputPassword"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <button type="submit" className="btn btn-outline-success mb-3">
          Login
        </button>
      </div>
    </form>
    </>
  );
};

export default Login;
