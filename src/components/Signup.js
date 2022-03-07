import React, { useState } from "react";
import { useHistory } from "react-router";

const Signup = ({showAlert}) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://icloudnotebook-backend.herokuapp.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password:
          credentials.password === credentials.confirmPassword
            ? credentials.password
            : alert("Password is not same"),
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      showAlert("Account created successfully","success")
      history.push("/");
    } else {
      showAlert("Invalid Credentials !","danger");

    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
         <h1 className="display-1">Create Account to use iNoteBook</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
          name ="name"
            type="text"
            className="form-control"
            id="name"
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            minLength={8}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            minLength={8}
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
