import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 1,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      this.socket.send('Hello from the client side nah its funny')
    }
    this.socket.addEventListener('message', event => {
      // this.setState({messages: this.state.messages.concat({
        // text: event.data
        console.log(event.data);
      // })});
    });
  }

  onNewMessage(content) {
    if (content.length < 1 || content.length > 250) {

    } else {
      const newMessage = {id: Math.random()*100000, username: this.state.currentUser.name, content};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={ this.state.currentUser.name} onKeyPress={this.handleKeyPress} onNewMessage={this.onNewMessage}/>
        </div>
      );
  }
}
export default App;
