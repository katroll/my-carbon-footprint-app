import "./Login.css";
import logo from "../../images/treeLogo.png";

const NewAccountForm = ({ hideNewForm }) => {
  return (
    <div className={hideNewForm ? "hidden" : "new-account-form-container"}>
      <div>
        <img src={logo} alt="logo" />
        <h2>Register a new account!</h2>
      </div>
      <div className="register-form-container">
        <form action="" className="register-form">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="first_name" placeholder="First Name" />
          <input type="text" name="last_name" placeholder="Last Name" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input type="submit" name="submit" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default NewAccountForm;
