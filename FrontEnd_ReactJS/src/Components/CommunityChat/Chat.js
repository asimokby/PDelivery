import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./chat.css";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.endPoint = "http://127.0.0.1:8000/";
    this.socket = socketIOClient(this.endPoint);
    this.state = {
      message: "",
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    if (this.props.username) {
      //avoid the first rendering when the user name is undefined
      this.socket.on("message", (data) => {
        this.appendMessage(
          "left",
          data["data"],
          data["name"],
        `http://localhost:5000/getProfilePic/${data["name"]}`
        );
      });
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleMessage();
    }
  };

  handleInputText(event) {
    this.setState({ message: event.target.value });
  }

  appendMessage(side, text, username, image) {
    const msgHTML = `
            <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${image})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                <a class="links" href=/accounts/${username}> 
                <div class="msg-info-name">${username}</div>
                </a>
                </div>
                <div class="msg-text">${text}</div>
            </div>
            </div>
        `;
    const msgerChat = document.querySelector(".msger-chat");
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }

  handleMessage() {
    if (this.state.message) {
      this.appendMessage(
        "right",
        this.state.message,
        this.props.username,
        `http://localhost:5000/getProfilePic/${this.props.username}`
      );
      this.setState({ message: "" });
      this.socket.send({ data: this.state.message, name: this.props.username });
    }
  }
  render() {
    if (!this.props.username) return <div></div>;
    return (
      <div className="chatWindow">
        <div className="msger">
          <header className="msger-header">
            <div className="msger-header-title">
              <i className="fas fa-comment-alt"></i> PDelivery Community Chat
            </div>
            <div className="msger-header-options">
              <span>
                <i className="fas fa-cog"></i>
              </span>
            </div>
          </header>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: this.state.html }}
          ></div>
          <main className="msger-chat" id="chat-window">
            <div className="msg left-msg">
              <div
                className="msg-img"
                style={{
                  backgroundImage:
                    "url(https://image.flaticon.com/icons/svg/327/327779.svg)",
                }}
              ></div>

              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">PDelivery's Bot</div>
                  <div className="msg-info-time"></div>
                </div>

                <div className="msg-text">Hey, I am not real!</div>
              </div>
            </div>

            <div className="msg right-msg"></div>
          </main>

          <div className="msger-inputarea" id="msgInputArea">
            <input
              onKeyPress={this.onKeyPress}
              onChange={this.handleInputText}
              id="msgInput"
              type="text"
              value={this.state.message}
              className="msger-input"
              placeholder="Enter your message..."
            />
            <button
              onClick={this.handleMessage}
              id="send-button"
              className="msger-send-btn"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
