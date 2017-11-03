import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      type: 'postMessage',
      status: '',
      usersOnline: 0
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', event => {
      const newData = JSON.parse(event.data);
      if (newData.type === 'postMessage') {
        const data = this.state.messages.concat(newData);
        this.setState({messages: data});
      } else {
        this.setState({
          usersOnline: newData.userCount,
          status: newData.content
          })
      }
    });
  }

  onNewName(username) {
      if (username != this.state.currentUser.name) {
        const content = `${this.state.currentUser.name} has changed their name to ${username}`;
        this.setState({currentUser: {name: username}});
        const newMessage = {type: 'postNotification', content};
        this.socket.send(JSON.stringify(newMessage));
      }
  }

  onNewMessage(content, username) {
    if (content.length < 1 || content.length > 250) {
      return;
    }
      const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content};
      this.socket.send(JSON.stringify(newMessage));
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="sillyNumber">Users Online: {this.state.usersOnline}</span>
          </nav>
          <MessageList messages={this.state.messages} status={this.state.status}/>
          <ChatBar currentUser={ this.state.currentUser.name} onNewName={this.onNewName} onNewMessage={this.onNewMessage}/>
        </div>
      );
  }
}
export default App;
