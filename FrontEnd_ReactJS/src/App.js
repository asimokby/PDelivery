import React from "react";
import "./App.css";
import Navbar from "./Components/homepg/Navbar";
import MainContent from "./Components/homepg/MainContent";
import Search from "./Components/SearchPg/Search";
import LoginForm from "./Components/SignIn/LoginForm";
import SignUpForm from "./Components/SignUp/SignupPage";
import MainProfile from "./Components/profileComponents/MainProfile";
import CommunityChat from './Components/CommunityChat/Chat'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3ac569",
    },

    secondary: {
      main: "#ffffff",
    },
  },
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.fullUrl = "http://localhost:5000";
    this.state = {
      authenticated: false,
      username: '',
      token: '',
    };
    this.userLogged = this.userLogged.bind(this);
    this.userSignedOut = this.userSignedOut.bind(this);
    this.validateToken = this.validateToken.bind(this)
  }

  userLogged(loggedIn, token, username) {
    this.setState({ authenticated: loggedIn, token: token, username: username }, () => {
      localStorage.setItem('loginToken', this.state.token)
      localStorage.setItem('username', this.state.username)
    });
  }

  componentDidMount() {
    this.validateToken()
  }

  validateToken() {
    if (localStorage.getItem('username') == '') return;
    this.setState({ authenticated: true, token: localStorage.getItem('loginToken'), username: localStorage.getItem('username') }, () => {
      axios.post(this.fullUrl + "/validateToken", this.state).then((Response) => {
        this.setState({ authenticated: Response.data['valid'] })
      })
    })
  }

  userSignedOut() {
    this.setState({ authenticated: false, token: '', username: '' }, () => {
      localStorage.setItem('loginToken', this.state.token)
      localStorage.setItem('username', this.state.username)
    });


  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar
              isAuthenticated={this.state.authenticated}
              username={this.state.username}
              userSignedOut={this.userSignedOut}
            />
            <Switch>
              <Route exact path="/" component={MainContent} />
              <Route path="/Search" render={(props) => (<Search {...props} session={this.state} />)} />
              <Route
                exact
                path="/accounts/:username"
                render={(props) => (
                  <MainProfile {...props} username={this.state.username} session={this.state}/>
                )}
              />
              <Route
                exact
                path="/CommunityChat"
                render={(props) => (
                  <CommunityChat {...props} username={this.state.username} />
                )}
              />
              <Route
                exact
                path="/Login"
                render={(props) => (
                  <LoginForm {...props} userLogged={this.userLogged} />
                )}
              />
              <Route
                exact
                path="/SignUp"
                render={(props) => <SignUpForm {...props} />}
              />
              {/* <Route  path='/SignUp' component={SignUpForm}/> */}
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
export default App;
