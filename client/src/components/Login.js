import React, { useState } from "react";
import axios from "axios";
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [account, setaccount] = useState({
    username: "",
    password: "",
  });
  const Changehandler = (event) => {
    setaccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };
  const Submitform = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", account)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        props.history.push("/BubblePage");
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/");
      });
  };

  return (
    <div>
      <form className="form" onSubmit={Submitform}>
        <label className="text" htmlFor="username">
          username{" "}
        </label>
        <input
          className="input"
          name="username"
          type="text"
          onChange={Changehandler}
          id="username"
        />
        <label className="text" htmlFor="password">
          password{" "}
        </label>
        <input
          className="input"
          name="password"
          type="password"
          onChange={Changehandler}
          id="password"
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
