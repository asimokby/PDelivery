import React from "react";
import "./Form.css";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.fullUrl = "http://localhost:5000";
    this.state = {
      usernameOrEmail: "",
      password: "",
      exists: false,
      loginFailed: false,
      token: "",
      username: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  validateUser() {
    axios.post(this.fullUrl + "/validateUser", this.state).then((Response) =>
      this.setState(
        {
          exists: Response.data["exists"],
          token: Response.data["token"],
          username: Response.data["username"],
        },
        function () {
          this.props.userLogged(
            this.state.exists,
            this.state.token,
            this.state.username
          );
          if (!this.state.exists) this.setState({ loginFailed: true });
          if (this.state.exists) this.props.history.push("/");
        }
      )
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    // accessing submitted data of an (uncontrolled form: that's why im using 'rel')
    this.setState(
      {
        usernameOrEmail: this.usernameOrEmail.value,
        password: this.password.value,
      },
      function () {
        this.usernameOrEmail.value = "";
        this.password.value = "";
        this.validateUser();
      }
    );
  }

  render() {
    // console.log(this.state);

    return (
      <div className="wrapper_login">
        <div className="login-container">
          <section className="login" id="login">
            <header>
              <h2>Welcome Back! </h2>
              <h4>Login</h4>
            </header>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="login-input"
                placeholder="Username or email"
                required
                autoFocus
                ref={(el) => (this.usernameOrEmail = el)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                required
                ref={(el) => (this.password = el)}
              />
              {this.state.loginFailed ? (
                <p style={{ color: "red" }}>
                  Login failed wrong user credentials
                </p>
              ) : (
                ""
              )}
              <div className="submit-container">
                <button type="submit" className="login-button">
                  SIGN IN
                </button>
              </div>
            </form>
          </section>
        </div>
        <svg viewBox="0 0 1440 319">
          <path
            fill="#3ac569"
            fillOpacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }
}

export default Register;
