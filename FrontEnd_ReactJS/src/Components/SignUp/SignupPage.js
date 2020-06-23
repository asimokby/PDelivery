import React from "react";
import "./SignupForm.css";
import axios from "axios";
import CountryChooser from "../SearchPg/Countrychooser";
import DatePicker from "../SearchPg/DatePicker";
import "../../../node_modules/react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.fullUrl = "http://localhost:5000";
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      registered: "",
      emailAvailable: true,
      emailValid: true,
      usernameAvailable: true,
      country: "",
      birthday: Date(),
      phone: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.getBirthday = this.getBirthday.bind(this);
  }
  getCountry(chosen) {
    this.setState({ country: chosen });
  }
  getBirthday(chosen) {
    this.setState({ birthday: chosen });
  }
  registerUser() {
    axios.post(this.fullUrl + "/registerUser", this.state).then((Response) =>
      this.setState(
        {
          registered: Response.data["registered"],
          emailAvailable: Response.data["emailAvailable"],
          usernameAvailable: Response.data["usernameAvailable"],
          emailValid: Response.data["emailValid"],
        },
        () => {
          if (this.state.registered) this.props.history.push("/Login");
          // else {
          // this.setState({ emailAvailable: false });
          // }
        }
      )
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        // accessing submitted data of an (uncontrolled form: that's why im using 'rel')
        // & updating the state
        name: this.name.value,
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
      },
      function () {
        this.registerUser();
      }
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="wrapper_SignUp">
        <svg className="curved-div" viewBox="0 0 1440 319">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="SignUp-container">
          <section className="SignUp" id="SignUp">
            <header>
              <h2>Welcome! </h2>
              <h4>SignUp</h4>
            </header>
            <form className="SignUp-form" onSubmit={this.handleSubmit}>
              <input
                id="Name"
                type="text"
                className="SignUp-input"
                placeholder="Name"
                required
                autoFocus
                ref={(el) => (this.name = el)}
              />
              <input
                id="Username"
                type="text"
                className="SignUp-input"
                placeholder="Username"
                required
                // autoFocus
                ref={(el) => (this.username = el)}
              />
              <input
                type="text"
                className="SignUp-input"
                placeholder="Email"
                required
                // autoFocus
                ref={(el) => (this.email = el)}
              />
              <input
                type="password"
                className="SignUp-input"
                placeholder="Password"
                required
                ref={(el) => (this.password = el)}
              />
              <div style={{ display: "flex" }}>
                <DatePicker chosenDate={this.getBirthday} label={"Birthday"} />
              </div>
              <CountryChooser from={false} toCountry={this.getCountry} />

              <PhoneInput
                style={{
                  width: "100%",
                  height: 30,
                }}
                international
                defaultCountry="TR"
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={(phone) => this.setState({ phone })}
              />

              {!this.state.usernameAvailable ? (
                <p style={{ color: "red" }}>
                  The entered username is taken. Please choose another one.
                </p>
              ) : (
                ""
              )}
              {!this.state.emailValid ? (
                <p style={{ color: "red" }}>
                  The entered email is not valid. Write it carefully.
                </p>
              ) : (
                ""
              )}
              {!this.state.emailAvailable ? (
                <p style={{ color: "red" }}>
                  The entered email is taken. Try again with another one.
                </p>
              ) : (
                ""
              )}
              <div className="submit-container">
                <button type="submit" className="SignUp-button">
                  SIGN UP
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default Register;
