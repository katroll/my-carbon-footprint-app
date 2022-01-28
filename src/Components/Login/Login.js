import { Link, useHistory } from "react-router-dom";
import NewAccountForm from "./NewAccountForm";
import GrayColor from "./GrayColor";
import { useState } from "react";
import "./Login.css";

function Login({ setUser, setLoggedIn }) {
  const [hideNewForm, setHideNewForm] = useState(true);
  const history = useHistory();
  const [failedLogin, setFailedLogin] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    fetch("https://vast-bastion-53494.herokuapp.com/users")
      .then((r) => r.json())
      .then((userData) => {
        const loginUser = userData.find(
          (username) =>
            username.username.toLowerCase() === event.target[0].value &&
            username.password === event.target[1].value
        );
        if (loginUser) {
          setUser(loginUser);
          setLoggedIn(true);
          setFailedLogin(false);
          history.push("/");
        } else {
          setUser(userData[0]);
          setLoggedIn(false);
          setFailedLogin(true);
        }
      });
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="App-header">
        <div className="login-page">
          <h1>Login Page</h1>
          {failedLogin ? (
            <h5 className="failed-login-notification">
              Invalid Username or Password
            </h5>
          ) : null}
          <div className="login-container">
            <form
              action=""
              className="login-form-container"
              onSubmit={(e) => loginHandler(e)}
            >
              <input type="text" name="username" placeholder="Username" />
              <input type="password" name="passsword" placeholder="Password" />
              <input type="submit" name="submit" value="Login" />
            </form>
            <button onClick={() => setHideNewForm(false)}>
              Register new account
            </button>
            <Link to={"/"}>
              <button>Go back</button>
            </Link>
          </div>
        </div>
        <NewAccountForm hideNewForm={hideNewForm} />
        <GrayColor setHideNewForm={setHideNewForm} hideNewForm={hideNewForm} />
      </div>
    </>
  );
}

export default Login;
