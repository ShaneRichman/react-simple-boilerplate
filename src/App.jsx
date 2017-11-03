import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // this.socket.onopen = (event) => {
    //   this.socket.send('Hello from the client side nah its funny')
    // }
    this.socket.addEventListener('message', event => {
      const allMessages = (event.data);
      // console.log("list all messages", allMessages);
      this.setState({messages: this.state.messages.concat(JSON.parse(allMessages))});
    });
  }

  onNewMessage(content, username) {
    if (content.length < 1 || content.length > 250) return;
      if (username === ''){
        username = 'Anonymous';
      }
      const newMessage = {username, content};
      const messages = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={ this.state.currentUser.name} onNewMessage={this.onNewMessage}/>
        </div>
      );
  }
}
export default App;
